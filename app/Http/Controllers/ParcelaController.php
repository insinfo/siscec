<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 01/02/2018
 * Time: 15:35
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
use App\Parcela;
use App\Pessoa;
use App\Utils\StatusCode;
use App\Utils\StatusMessage;

class ParcelaController
{
    //lista parcelas implementado para o ModernDataTable
    public function getAll(Request $request)
    {
        try
        {
            $draw = $request['draw'];
            $start = $request['start'];
            $length = $request['length'];
            $search = '%' . $request['search'] . '%';
            $idMedicao = $request['idMedicao'];

            $query = Parcela::query();
            $query->where(Parcela::ID_MEDICAO, '=', $idMedicao)
                ->where(function ($query) use ($search)
            {
                $query->orWhere(Parcela::KEY_ID, 'ILIKE', $search);
                $query->orWhere(Parcela::VALOR, 'ILIKE', $search);
                $query->orWhere(Parcela::ID_EMPENHO, 'ILIKE', $search);

            })->with('empenho')
                ->orderBy(Parcela::KEY_ID, 'asc')
            ;

            $recordsTotal = $query->count();
            $result['draw'] = $draw;
            $result['recordsTotal'] = $recordsTotal;
            $result['recordsFiltered'] = $recordsTotal;
            // $result['sql'] = $query->toSql();
            $data = $query->take($length)->skip($start)->get();
            $result['data'] = $data;
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json($result, StatusCode::SUCCESS);
    }

    //deleta parcela
    public function delete(Request $request)
    {
        try
        {
            $ids = $request['ids'];
            $idsCount = count($ids);
            $itensDeletadosCount = 0;
            foreach ($ids as $id)
            {
                $parcela = Parcela::find($id);
                if ($parcela)
                {
                    if ($parcela->delete())
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