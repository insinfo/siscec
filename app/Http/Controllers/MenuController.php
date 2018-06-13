<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 31/01/2018
 * Time: 11:05
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use \Exception;


use App\Utils\Utils;
use App\Exceptions\Messages;
use App\Menu;
use App\Utils\StatusMessage;
use App\Utils\StatusCode;
use App\DAL\MenuDAL;

class MenuController
{
    public function getAll(Request $request)
    {
        try
        {
            $draw = $request['draw'];
            $start = $request['start'];
            $length = $request['length'];
            $search = '%' . $request['search'] . '%';

            $query = Menu::query();
            $query->where(function ($query) use ($search)
            {
                $query->orWhere(Menu::LABEL, 'ILIKE', $search);
                $query->orWhere(Menu::ROTA, 'ILIKE', $search);

            })->orderBy('id')
            ;

            //$result['sql']= $query->toSql();
            $recordsTotal = $query->count();
            $result['draw'] = $draw;
            $result['recordsTotal'] = $recordsTotal;
            $result['recordsFiltered'] = $recordsTotal;

            if (isset($start))
            {
                $data = $query->take($length)->skip($start)->get();
            }
            else
            {
                $data = $query->get();
            }

            $result['data'] = $data;
        }
        catch (Exception $e)
        {
            return response()->json(['message' => Messages::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], 400);
        }
        return response()->json($result, 200);
    }

    public function save(Request $request, $id = null)
    {
        try
        {
            DB::transaction(function () use ($request, &$idFiscal, $id)
            {
                if ($id == null)
                {
                    $menu = Menu::create($request->all());
                }
                else
                {
                    $menu = Menu::find($id);
                    $menu->update($request->all());
                }
            });
        }
        catch (Exception $e)
        {
            return response()->json(['mensagem' => Messages::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'linha' => $e->getLine(), 'arquivo' => $e->getFile()], 400);
        }
        return response()->json(['mensagem' => Messages::MENSAGEM_DE_SUCESSO_PADRAO], 200);
    }

    public function delete(Request $request)
    {
        try
        {
            $ids = $request['ids'];
            $idsCount = count($ids);
            $itensDeletadosCount = 0;
            foreach ($ids as $id)
            {
                $result = Menu::find($id);
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
                return response()->json(['message' => 'Todos os itens foram deletados com sucesso']);
            }
            else if ($itensDeletadosCount > 0)
            {
                return response()->json(['message' => 'Nem todos os itens foram deletados com sucesso']);
            }
            else
            {
                return response()->json(['message' => 'Nenhum dos itens foram deletados']);
            }
        }
        catch (Exception $e)
        {
            return response()->json(['message' => Messages::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], 400);
        }
    }

    public function getHierarchy(Request $request)
    {
        try
        {
            $token = $request['jwt'];
            $idSistema = 3;
            $menuDAL = new MenuDAL();
            $result = $menuDAL->getHierarchyChildren(null, $idSistema, $token->idPerfil);
            //$result[0]['test'] = $token;
            return response()->json($result, StatusCode::SUCCESS);

        }
        catch (Exception $e)
        {
            return response()->json(['message' => Messages::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
    }
}