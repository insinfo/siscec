<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 01/02/2018
 * Time: 15:07
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
use App\Usuario;
use App\Pessoa;
use App\OrganogramaHistorico;
use App\Parcela;
use App\Utils\StatusCode;
use App\Utils\StatusMessage;

use App\Utils\LdapAuth;

class UsuarioController
{
    //lista usuarios
    public function getAll(Request $request)
    {
        try
        {
            $draw = $request['draw'];
            $start = $request['start'];
            $length = $request['length'];

            if (is_array($request['search']))
            {
                $search = '%' . $request['search']['value'] . '%';
            }
            else
            {
                $search = '%' . $request['search'] . '%';
            }

            $query = Usuario::query();
            $query->selectRaw('DISTINCT "' . Usuario::TABLE_NAME . '".*')
                ->leftJoin(Pessoa::TABLE_NAME, Pessoa::TABLE_NAME . '.' . Pessoa::KEY_ID, '=', Usuario::TABLE_NAME . '.' . Usuario::ID_PESSOA)
                ->leftJoin(OrganogramaHistorico::TABLE_NAME, OrganogramaHistorico::TABLE_NAME . '.' . OrganogramaHistorico::KEY_ID, '=', Usuario::TABLE_NAME . '.' . Usuario::ID_ORGANOGRAMA)
                ->where(function ($query) use ($search)
            {
                $query->orWhere(Usuario::TABLE_NAME . '.' . Usuario::LOGIN, 'ILIKE', $search);
                $query->orWhere(Usuario::TABLE_NAME . '.' . Usuario::PERFIL, 'ILIKE', $search);
                $query->orWhere(Pessoa::TABLE_NAME . '.' . Pessoa::NOME, 'ILIKE', $search);
                $query->orWhere(OrganogramaHistorico::TABLE_NAME . '.' . OrganogramaHistorico::SIGLA, 'ILIKE', $search);

            })->with('pessoa')->with('setor')
                ->orderBy(Usuario::TABLE_NAME . '.' . Usuario::KEY_ID, 'ASC')
            ;

            $recordsTotal = $query->count();
            $result['draw'] = $draw;
            $result['recordsTotal'] = $recordsTotal;
            $result['recordsFiltered'] = $recordsTotal;

            $data = $query->take($length)->skip($start)->get();
            //$result['sql'] = $query->toSql();
            $result['data'] = $data;
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json($result, StatusCode::SUCCESS);
    }

    public function getAllLdap(Request $request)
    {
        try
        {
            $admUser = 'ZGVzZW52b2x2aW1lbnRv';
            $admPass = 'b3N0cmFz';
            $user = 'isaque.neves';//base64_decode($admUser);
            $pass = 'Ins257257';///base64_decode($admPass);

            $draw = $request['draw'];
            $length = $request['length'];
            $search = is_array($request['search']) ? $request['search']['value'] : $request['search'];
            $start = $request['start'];

            $ldapAuth = new LdapAuth();
            $ldapAuth->setHost('ldap://192.168.133.10');
            $ldapAuth->setDomain('DC=dcro,DC=gov');
            $ldapAuth->setUserDomain('@dcro.gov');
            $ldapAuth->authenticate($user, $pass);

            $result = array();
            $result['draw'] = $draw;
            $result['recordsTotal'] = '';
            $result['recordsFiltered'] = '';
            $result['data'] = array();

            if ($search == '' || $search == null)
            {
                $recordsTotal = $ldapAuth->countRegisteredUsers();
                $result['recordsTotal'] = $recordsTotal;
                $result['recordsFiltered'] = $recordsTotal;
                $result['data'] = $ldapAuth->getAllUserByLimit($start, $length);
            }
            else
            {
                $r = $ldapAuth->findUserByName($search,10);
                $recordsTotal = count($r);
                $result['recordsTotal'] = $recordsTotal;
                $result['recordsFiltered'] = $recordsTotal;
                $result['data'] = $r;
            }

        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json($result, StatusCode::SUCCESS);
    }

    //cria ou atualiza medicao
    public function save(Request $request, $id = null)
    {
        $idUsuario = 0;
        try
        {
            DB::transaction(function () use ($request, &$idUsuario, $id)
            {
                if ($id == null)
                {
                    $usuario = Usuario::create($request->all());
                    $idUsuario = $usuario->id;
                }
                else
                {
                    $usuario = Usuario::find($id);
                    $usuario->update($request->all());
                    $idUsuario = $usuario->id;
                }
            });
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json(['message' => StatusMessage::MENSAGEM_DE_SUCESSO_PADRAO, 'idMedicao' => $idUsuario], StatusCode::SUCCESS);
    }

    //deleta usuario
    public function delete(Request $request)
    {
        try
        {
            $ids = $request['ids'];
            $idsCount = count($ids);
            $itensDeletadosCount = 0;
            foreach ($ids as $id)
            {
                $usuario = Usuario::find($id);
                if ($usuario)
                {
                    if ($usuario->delete())
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