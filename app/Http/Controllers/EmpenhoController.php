<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 01/02/2018
 * Time: 14:18
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

use \Exception;
use \NumberFormatter;
use \DateTime;

use App\Utils\Log;
use App\Utils\Utils;
use App\Constants;
use App\Empenho;
use App\Utils\StatusCode;
use App\Utils\StatusMessage;
use App\ViewEmpenho;

class EmpenhoController extends Controller
{
    /**************** EMPENHOS ******************/
    //lista fontes de recurso
    public function getAll(Request $request)
    {
        try
        {
            $token = $request['jwt'];
            $draw = $request['draw'];
            $start = $request['start'];
            $length = $request['length'];
            $search = '%' . $request['search']['value'] . '%';
            $idContrato = $request['idContrato'];

            $query = ViewEmpenho::query();
            //filtra por idContrato se existir
            if ($idContrato)
            {
                $query->where(ViewEmpenho::ID_CONTRATO, '=', $idContrato);
            }

            //controle de acesso
            if ($token->idPerfil == Constants::PERFIL_VISUALIZADOR ||
                $token->idPerfil == Constants::PERFIL_USUARIO)
            {
                $query->where(ViewEmpenho::ID_ORGANOGRAMA, '=', $token->idOrganograma);
            }

            $query->where(function ($query) use ($search)
            {
                $query->orWhere(ViewEmpenho::ANO, 'ILIKE', $search);
                $query->orWhere(ViewEmpenho::NUMERO, 'ILIKE', $search);
                $query->orWhere(ViewEmpenho::DATA, 'ILIKE', $search);
                $query->orWhere(ViewEmpenho::CANCELADO, 'ILIKE', $search);
                $query->orWhere(ViewEmpenho::JUSTIFICATIVA, 'ILIKE', $search);
                $query->orWhere(ViewEmpenho::VALOR, 'ILIKE', $search);

            })->with('recurso')->with('contrato')->orderBy('id', 'desc')
            ;

            $recordsTotal = $query->count();
            $result['draw'] = $draw;
            $result['recordsTotal'] = $recordsTotal;
            $result['recordsFiltered'] = $recordsTotal;
            // $result['sql'] = $query->toSql();
            $data = $query->take($length)->skip($start)->get();

            foreach ($data as $item)
            {
                $item['data'] = Utils::SQLDateToBrasilDate($item['data']);
                $item['contrato']['dataInicio'] = Utils::SQLDateToBrasilDate($item['contrato']['dataInicio']);
                $item['contrato']['dataFim'] = Utils::SQLDateToBrasilDate($item['contrato']['dataFim']);
            }

            $result['data'] = $data;
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json($result, StatusCode::SUCCESS);
    }

    //cria ou atualiza empenho
    public function save(Request $request, $id = null)
    {
        $idEmpenho = 0;
        try
        {
            DB::transaction(function () use ($request, &$idEmpenho, $id)
            {
                if ($id == null)
                {
                    $empenho = Empenho::create($request->all());
                    $idEmpenho = $empenho->id;
                }
                else
                {
                    $empenho = Empenho::find($id);
                    $empenho->update($request->all());
                    $idEmpenho = $empenho->id;
                }
            });
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json(['message' => StatusMessage::MENSAGEM_DE_SUCESSO_PADRAO, 'idEmpenho' => $idEmpenho], StatusCode::SUCCESS);
    }

    //deleta empenhos
    public function delete(Request $request)
    {
        try
        {
            $ids = $request['ids'];
            $idsCount = count($ids);
            $itensDeletadosCount = 0;
            foreach ($ids as $id)
            {
                $result = Empenho::find($id);
                if ($result)
                {
                    if ($result->delete())
                    {
                        $itensDeletadosCount++;
                    }
                }
            }
            if ($itensDeletadosCount == $idsCount)
            {
                return response()->json(['message' => StatusMessage::TODOS_ITENS_DELETADOS]);
            }
            else if ($itensDeletadosCount > 0)
            {
                return response()->json(['message' => StatusMessage::NEM_TODOS_ITENS_DELETADOS]);
            }
            else
            {
                return response()->json(['message' => StatusMessage::NENHUM_ITEM_DELETADO]);
            }
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
    }
}