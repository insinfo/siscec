<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 01/02/2018
 * Time: 14:07
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
use App\Fiscal;
use App\Pessoa;
use App\Utils\StatusCode;
use App\Utils\StatusMessage;

class FiscalController extends Controller
{
    //lista fiscais
    public function getAll(Request $request)
    {
        try
        {
            $idControle = $request['idControle'];
            $draw = $request['draw'];
            $start = $request['start'];
            $length = $request['length'];
            $search = '%' . $request['search']['value'] . '%';

            $query = Fiscal::query();
            //$query = Fiscal::select(Fiscal::TABLE_NAME.'.*')
            $query->select(Fiscal::TABLE_NAME . '.*');

            if ($idControle)
            {
                $query->where(Fiscal::ID_CONTROLE, '=', $idControle);
            }

            $query->join(Pessoa::TABLE_NAME, Pessoa::TABLE_NAME . '.' . Pessoa::KEY_ID, '=', Fiscal::ID_PESSOA)
                ->where(function ($query) use ($search)
            {
                $query->orWhere(Fiscal::MATRICULA, 'ILIKE', $search);
                $query->orWhere(Fiscal::NUMERO_PORTARIA, 'ILIKE', $search);
                $query->orWhere(Fiscal::ANO_PORTARIA, 'ILIKE', $search);
                $query->orWhere(Fiscal::ANO_PORTARIA, 'ILIKE', $search);
                $query->orWhere(Pessoa::NOME, 'ILIKE', $search);
            })
                ->with('pessoa')
                ->orderBy('id')
            ;

            //$result['sql']= $query->toSql();
            $recordsTotal = $query->count();
            $result['draw'] = $draw;
            $result['recordsTotal'] = $recordsTotal;
            $result['recordsFiltered'] = $recordsTotal;

            $data = $query->take($length)->skip($start)->get();

            foreach ($data as $item)
            {
                $item['dataPortaria'] = Utils::SQLDateToBrasilDate($item['dataPortaria']);
            }
            $result['data'] = $data;
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json($result, StatusCode::SUCCESS);
    }

    //cria ou atualiza fiscal
    public function save(Request $request, $id = null)
    {
        $idFiscal = 0;
        try
        {
            DB::transaction(function () use ($request, &$idFiscal, $id)
            {
                if ($id == null)
                {
                    $fiscal = Fiscal::create($request->all());
                    $idFiscal = $fiscal->id;
                }
                else
                {
                    $fiscal = Fiscal::find($id);
                    $fiscal->update($request->all());
                    $idFiscal = $fiscal->id;
                }
            });
        }
        catch (Exception $e)
        {
            return response()->json(['mensagem' => StatusMessage::MENSAGEM_ERRO_PADRAO,'exception' => $e->getMessage(), 'linha' => $e->getLine(), 'arquivo' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json(['mensagem' => StatusMessage::MENSAGEM_DE_SUCESSO_PADRAO, 'idFiscal' => $idFiscal], StatusCode::SUCCESS);
    }

    //deleta fiscal
    public function delete(Request $request)
    {
        try
        {
            $ids = $request['ids'];
            $idsCount = count($ids);
            $itensDeletadosCount = 0;
            foreach ($ids as $id)
            {
                $result = Fiscal::find($id);
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