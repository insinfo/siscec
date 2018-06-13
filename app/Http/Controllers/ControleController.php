<?php

namespace App\Http\Controllers;

use App\Utils\StatusCode;
use App\Utils\StatusMessage;

use App\Medicao;
use App\Utils\Utils;
use App\Controle;
use App\ViewControle;
use App\OrganogramaHistorico;
use App\Constants;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

use \Exception;
use \NumberFormatter;
use \DateTime;

use App\Utils\Log;

class ControleController extends Controller
{
    //lista controles
    public function getAll(Request $request)
    {
        try
        {
            $token = $request['jwt'];
            $query = Controle::query();

            $filtroContratos = '';
            if ($request['status'] == '' || $request['status'] == null || $request['status'] == '0')
            {
                $filtroContratos = ' OR "contratoSituacao" isnull ';
            }

            $search = is_array($request['search']) ? '%' . $request['search']['value'] . '%' : '%' . $request['search'] . '%';
            $idOrganograma = "%" . $request['idOrganograma'] . "%";
            $modalidade = "%" . $request['modalidade'] . "%";
            $status = "%" . $request['status'] . "%";
            $start = $request['start'];
            $length = $request['length'];
            $draw = $request['draw'];
            $order = $request['order'];

            $query->selectRaw(' DISTINCT on (id) * ')
                ->from(ViewControle::TABLE_NAME)
                ->where(function ($query) use ($request, $search, $token, $idOrganograma, $modalidade)
                {
                    //controle de acesso
                    if (
                        $token->idPerfil == Constants::PERFIL_VISUALIZADOR ||
                        $token->idPerfil == Constants::PERFIL_USUARIO
                    )
                    {
                        $query->where(ViewControle::ID_ORGANOGRAMA, '=', $token->idOrganograma);
                    }
                    else
                    {
                        $query->where(ViewControle::ID_ORGANOGRAMA, 'ILIKE', $idOrganograma);
                    }

                    $query->where(Controle::MODALIDADE, 'ILIKE', $modalidade);

                })->whereRaw("(\"contratoSituacao\" ILIKE  '$status' $filtroContratos )")
                ->where(function ($query) use ($request, $search)
                {
                    $query->orWhere(Controle::OBJETO, 'ILIKE', $search);
                    $query->orWhere("numeroControle", 'ILIKE', $search);
                    $query->orWhere("setorNome", 'ILIKE', $search);
                    $query->orWhere("pessoaNome", 'ILIKE', $search);

                })->with(array('contratos' => function ($query)
                {

                    $query->select('*')->orderBy('situacao', 'asc')->orderBy('id', 'desc');

                }))->with('empresa')
            ;

            //Pega o total de registros filtrado
            $recordsTotal = $query->count(DB::raw('DISTINCT (id)'));

            if($order)
            {
                $query->orderBy(Controle::KEY_ID,  $order);
            }
            else
            {
                $query->orderBy(Controle::KEY_ID, 'DESC');
            }

            $result['draw'] = $draw;
            $result['recordsTotal'] = $recordsTotal;
            $result['recordsFiltered'] = $recordsTotal;
            $result['data'] = $query->take($length)->skip($start)->get();

        }
        catch (Exception $e)
        {
            return response()->json(['mensagem' => StatusMessage::MENSAGEM_ERRO_PADRAO,'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile(), 'code' => $e->getCode()], StatusCode::BAD_REQUEST);
        }
        return response()->json($result,StatusCode::SUCCESS);
    }
    //salva um controle
    public function save(Request $request, $id = null)
    {
        $idControle = 0;
        try
        {
            $request['dataCadastro'] = Utils::GetDateNow();
            DB::transaction(function () use ($request, &$idControle, $id)
            {
                if ($id == null)
                {
                    $controle = Controle::create($request->all());
                    $contratos = $request->get('contratos');
                    if ($contratos)
                    {
                        $controle->contratos()->createMany($contratos);
                    }
                    $idControle = $controle->id;
                }
                else
                {
                    $controle = Controle::find($id);
                    $controle->update($request->all());

                    $contratosInput = $request->get('contratos');
                    if ($contratosInput)
                    {
                        foreach ($contratosInput as $contrato)
                        {
                            //unset($contrato['empenho']);
                            $controle->contratos()->update($contrato);
                        }
                    }

                    $idControle = $controle->id;
                }
            });
        }
        catch (Exception $e)
        {
            return response()->json(['mensagem' => StatusMessage::MENSAGEM_ERRO_PADRAO,'exception' => $e->getMessage(), 'linha' => $e->getLine(), 'arquivo' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json(['mensagem' => StatusMessage::MENSAGEM_DE_SUCESSO_PADRAO, 'idControle' => $idControle], StatusCode::SUCCESS);
    }
    //deleta um controle
    public function delete(Request $request)
    {
        try
        {
            $ids = $request['ids'];
            $idsCount = count($ids);
            $itensDeletadosCount = 0;
            foreach ($ids as $id)
            {
                $result = Controle::find($id);
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
    //obtem um controle
    public function get($id)
    {
        try
        {
            if (!is_numeric($id))
            {
                throw new Exception(StatusMessage::PARAMETRO_ID_NAO_E_VALIDO, StatusCode::BAD_REQUEST);
            }
            $controle = Controle::find($id);
            if ($controle == null)
            {
                throw new Exception('Não existe', 400);
            }
            $idOrganograma = $controle->idOrganograma;
            $dataCadastro = $controle->dataCadastro;
            $result['data'] = $controle;
            //$result['data']['contratos'] = $controle->contratos()->get();
            //pega a empresa relacionada
            $result['data']['empresa'] = $controle->empresa()->first();
            //pega o setor relacionado
            $query = Controle::query();
            $query->selectRaw('"' . OrganogramaHistorico::TABLE_NAME . '".* ')
                ->from(OrganogramaHistorico::TABLE_NAME)
                ->whereRaw('"' . OrganogramaHistorico::TABLE_NAME . '"."' . OrganogramaHistorico::DATA_INICIO . '"=' . '(SELECT max("' . OrganogramaHistorico::TABLE_NAME . '"."' . OrganogramaHistorico::DATA_INICIO . '" )
                            FROM "' . OrganogramaHistorico::TABLE_NAME . '" 
                            WHERE \'' . $idOrganograma . '\' = "' . OrganogramaHistorico::TABLE_NAME . '"."' . OrganogramaHistorico::KEY_ID . '" 
                            AND "' . OrganogramaHistorico::TABLE_NAME . '"."' . OrganogramaHistorico::DATA_INICIO . '" <= \'' . $dataCadastro . '\')' . ' AND "' . OrganogramaHistorico::TABLE_NAME . '"."' . OrganogramaHistorico::KEY_ID . '"=\'' . $idOrganograma . '\' ')
            ;

            $result['data']['setor'] = $query->first();
        }
        catch (Exception $e)
        {
            return response()->json(['mensagem' => StatusMessage::MENSAGEM_ERRO_PADRAO,'exception' => $e->getMessage(), 'linha' => $e->getLine(), 'arquivo' => $e->getFile()], StatusCode::BAD_REQUEST);
        }

        return response()->json($result, StatusCode::SUCCESS);
    }
    //obtem um número em serie unico para o controle
    public function getSerialId(Request $request)
    {
        try
        {
            return response()->json(['serial' => Utils::getserial()], StatusCode::SUCCESS);
        }
        catch (Exception $e)
        {
            return response()->json(['mensagem' => StatusMessage::MENSAGEM_ERRO_PADRAO,'exception' => $e->getMessage(), 'linha' => $e->getLine(), 'arquivo' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
    }

    /**************** TESTE ******************/
    public function getErroTeste(Request $request)
    {
        try
        {
            $query = Medicao::query();
            $query->where(function ($query)
            {
                $query->where(Medicao::ID_CONTRATO, 'fdgd=', 'gdf');

            })->orderBy(Medicao::DATA_FIM, 'DESC')
            ;
            $result = $query->first();
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json($result, StatusCode::SUCCESS);
    }
}