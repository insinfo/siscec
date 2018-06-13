<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 01/02/2018
 * Time: 15:29
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
use App\FonteRecurso;
use App\Pessoa;
use App\Utils\StatusCode;
use App\Utils\StatusMessage;

class FonteRecursoController
{
    //lista fontes de recurso
    public function getAll(Request $request)
    {
        try
        {
            $draw = $request['draw'];
            $start = $request['start'];
            $length = $request['length'];
            $search = '%' . $request['search']['value'] . '%';

            $query = FonteRecurso::query();
            $query->where(function ($query) use ($search)
            {
                $query->orWhere(FonteRecurso::KEY_ID, 'ILIKE', $search);
                $query->orWhere(FonteRecurso::CODIGO, 'ILIKE', $search);
                $query->orWhere(FonteRecurso::DESCRICAO, 'ILIKE', $search);

            })->orderBy(FonteRecurso::KEY_ID,'desc')
            ;

            $recordsTotal = $query->count();
            $result['draw'] = $draw;
            $result['recordsTotal'] = $recordsTotal;
            $result['recordsFiltered'] = $recordsTotal;
            //$result['sql'] = $query->toSql();
            $data = $query->take($length)->skip($start)->get();
            $result['data'] = $data;
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO,'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], 400);
        }
        return response()->json($result, StatusCode::SUCCESS);
    }
}