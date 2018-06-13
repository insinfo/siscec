<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 01/02/2018
 * Time: 14:13
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
use App\Contrato;
use App\ViewContrato;
use App\Utils\StatusCode;
use App\Utils\StatusMessage;


class ContratoController extends Controller
{
    //lista contratos
    public function getAll(Request $request)
    {
        try
        {
            $token = $request['jwt'];
            $idControle = $request['idControle'];
            $draw = $request['draw'];
            $start = $request['start'];
            $length = $request['length'];
            $search = '%' . $request['search']['value'] . '%';
            $situacao = $request['situacao'];

            $query = ViewContrato::query();

            //filtra por idControle se existir
            if ($idControle)
            {
                $query->where(ViewContrato::ID_CONTROLE, '=', intval($idControle));
            }

            //filtra por situacao se existir
            if (is_numeric($situacao))
            {
                $query->where(ViewContrato::SITUACAO, '=', $situacao);
            }

            //controle de acesso
            if (
                $token->idPerfil == Constants::PERFIL_VISUALIZADOR ||
                $token->idPerfil == Constants::PERFIL_USUARIO
            )
            {
                $query->where(ViewContrato::ID_ORGANOGRAMA, '=', $token->idOrganograma);
            }

            $query->where(function ($query) use ($search)
            {
                $query->orWhere(ViewContrato::NUMERO_PROCESSO, 'ILIKE', $search);
                $query->orWhere(ViewContrato::ANO_PROCESSO, 'ILIKE', $search);
                $query->orWhere(ViewContrato::NUMERO_CONTRATO, 'ILIKE', $search);
                $query->orWhere(ViewContrato::ANO_CONTRATO, 'ILIKE', $search);
                $query->orWhere(ViewContrato::DATA_INICIO, 'ILIKE', $search);
                $query->orWhere(ViewContrato::DATA_FIM, 'ILIKE', $search);
            });

            //
            $recordsTotal = $query->count();
            $result['draw'] = $draw;
            $result['recordsTotal'] = $recordsTotal;
            $result['recordsFiltered'] = $recordsTotal;
            $data = $query->take($length)->skip($start)
                ->orderBy('id', 'desc')->get();
            //$result['sql'] = $query->toSql();
            $result['data'] = $data;
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO,'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json($result, StatusCode::SUCCESS);
    }

    //cria ou atualiza contrato
    public function save(Request $request, $id = null)
    {
        $idContrato = 0;
        try
        {
            if ($id == null)
            {
                $idControle = $request['idControle'];

                $existContratoAberto = Contrato::where(Contrato::ID_CONTROLE, '=', $idControle)->where(function ($query)
                {
                    $query->orWhere(Contrato::SITUACAO, '=', Constants::CONTRATO_STATUS_ABERTO);
                    $query->orWhere(Contrato::SITUACAO, '=', Constants::CONTRATO_STATUS_ANDAMENTO);
                })->first()
                ;
                $existContrato = Contrato::where(Contrato::ID_CONTROLE, '=', $idControle)->first();

                //checa se existem algum contrato aberto
                //se positivo não cria outro contrato
                if ($existContratoAberto)
                {
                    throw new Exception(StatusMessage::NAO_E_POSIVEL_CADASTRAR_NOVO_CONTRATO);
                }

                else if ($existContrato && $request['tipoContrato'] == Constants::CONTRATO)
                {
                    throw new Exception(StatusMessage::SO_PODE_UM_CONTRATO_DO_TIPO_CONTRATO);
                }
                else
                {
                    DB::transaction(function () use ($request, $idContrato, $id)
                    {
                        $contrato = Contrato::create($request->all());
                        $idContrato = $contrato->id;
                    });
                }
            }
            else
            {
                DB::transaction(function () use ($request, $idContrato, $id)
                {
                    $contrato = Contrato::find($id);
                    $contrato->update($request->all());
                    $idContrato = $contrato->id;
                });
            }

        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }

        return response()->json(['message' => StatusMessage::MENSAGEM_DE_SUCESSO_PADRAO, 'idContrato' => $idContrato], StatusCode::SUCCESS);
    }

    //deleta contrato
    public function delete(Request $request)
    {
        try
        {
            $ids = $request['ids'];
            $idsCount = count($ids);
            $itensDeletadosCount = 0;
            foreach ($ids as $id)
            {
                $result = Contrato::find($id);
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
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO,'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
    }
}