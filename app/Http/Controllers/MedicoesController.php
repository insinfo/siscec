<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 01/02/2018
 * Time: 14:50
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
use App\Medicao;
use App\Pessoa;
use App\ViewMedicao;
use App\Contrato;
use App\Parcela;
use App\Utils\StatusCode;
use App\Utils\StatusMessage;

class MedicoesController
{
    //lista medicões implementado para o ModernDataTable
    public function getAll(Request $request)
    {
        /* {order: "DESC", pago: "true", organograma: "1"} */
        try
        {
            //evita exiber noticia Notice: Undefined offset
            //error_reporting(E_ALL ^ E_NOTICE ^ E_STRICT ^ E_DEPRECATED);
            $params = $request->all();
            $token = $request['jwt'];
            $draw = $params['draw'] ?  $params['length'] : null;
            $start = $params['start'] ? $params['length'] : null;
            $length = $params['length'] ? $params['length'] : null;
            $search = $params['search'] ? '%' . $params['search'] . '%' : null;

            $idContrato = isset($params['idContrato']) ? $params['idContrato'] : null;
            $order = isset($params['order']) ? $params['order'] : null;
            $pago = isset($params['pago']) ? $params['pago'] : null;
            $organograma = isset($params['organograma']) ? $params['organograma'] : null;

            $query = ViewMedicao::query();
            //controle de acesso
            if (
                $token->idPerfil == Constants::PERFIL_VISUALIZADOR ||
                $token->idPerfil == Constants::PERFIL_USUARIO)
            {
                $query->where(ViewMedicao::ID_ORGANOGRAMA, '=', $token->idOrganograma);
            }
            $query->where(function ($query) use ($search)
            {
                $query->orWhere(ViewMedicao::DATA_INICIO, 'ILIKE', $search);
                $query->orWhere(ViewMedicao::DATA_FIM, 'ILIKE', $search);
                $query->orWhere(ViewMedicao::OBJETO, 'ILIKE', $search);
                $query->orWhere(ViewMedicao::ORGANOGRAMA_SIGLA, 'ILIKE', $search);

            })->with('parcelas')
                ->with('contrato');

            if($pago != null){
                $query->where(ViewMedicao::PAGO,'=',$pago);
            }

            if($organograma != null){
                $query->where(ViewMedicao::ID_ORGANOGRAMA,'=',$organograma);
            }

            if($idContrato != null){
                $query->where(ViewMedicao::ID_CONTRATO,'=',$idContrato);
            }

            if($order){
                $query
                    ->orderBy(ViewMedicao::TABLE_NAME . '.' . ViewMedicao::KEY_ID, $order);
            }else{
                $query
                    ->orderBy(ViewMedicao::TABLE_NAME . '.' . ViewMedicao::KEY_ID, 'desc');
            }

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

    //cria ou atualiza medicao
    public function save(Request $request, $id = null)
    {
        try
        {
            DB::transaction(function () use ($request, $id)
            {
                if ($id == null)
                {
                    $medicao = Medicao::create($request->all());

                    $parcelas = $request->get('parcelas');
                    if ($parcelas)
                    {
                        $medicao->parcelas()->createMany($parcelas);
                    }
                }
                else
                {
                    $medicao = Medicao::find($id);
                    $medicao->update($request->all());

                    $parcelasInput = $request->get('parcelas');
                    if ($parcelasInput)
                    {
                        foreach ($parcelasInput as &$item)
                        {
                            unset($item['empenho']);
                            //filtra os dados de acordo com o Model Parcela
                            if (isset($item[Parcela::KEY_ID]))
                            {
                                $parcela = Utils::filterArrayByArray($item, Parcela::TABLE_FIELDS);
                                Parcela::find($item[Parcela::KEY_ID])->update($parcela);
                            }
                            else
                            {
                                $item[Parcela::ID_MEDICAO] = $id;
                                Parcela::create($parcela);
                            }
                        }
                    }

                }
            });
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_DE_SUCESSO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }

        return response()->json(['message' => StatusMessage::MENSAGEM_DE_SUCESSO_PADRAO, 'idMedicao' => $id], StatusCode::SUCCESS);
    }

    //deleta medição
    public function delete(Request $request)
    {
        try
        {
            $ids = $request['ids'];
            $idsCount = count($ids);
            $itensDeletadosCount = 0;
            foreach ($ids as $id)
            {
                $medicoes = Medicao::find($id);
                if ($medicoes)
                {
                    $medicoes->parcelas()->delete();

                    if ($medicoes->delete())
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

    //obtem a ultima Medição de um contrato
    public function getLastByContrato(Request $request, $id)
    {
        try
        {
            $query = Medicao::query();
            $query->where(function ($query) use ($id)
            {
                $query->where(Medicao::ID_CONTRATO, '=', $id);

            })->orderBy(Medicao::DATA_FIM, 'DESC')
            ;

            $result = $query->first();
            // $result['sql'] = $query->toSql();
            //$result['data'] = $data;
            //$result['dataInicio'] = Utils::SQLDateToBrasilDate($result['dataInicio']);
            // $result['dataFim'] = Utils::SQLDateToBrasilDate($result['dataFim']);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json($result, StatusCode::SUCCESS);
    }

    //lista medições pagas
    public function getPagas(Request $request)
    {
        try
        {
            $params = $request->all();
            $draw = $params['draw'];
            $offset = $params['start'];
            $limit = $params['length'];
            $search = is_array($params['search']) ? '%' . $params['search']['value'] . '%' : '%' . $params['search'] . '%';

            $idContrato = isset($params['idContrato']) ? $params['idContrato'] : null;
            $idControle = isset($params['idControle']) ? $params['idControle'] : null;
            $open = isset($params['onlyOpen']) ? $params['onlyOpen'] : false;

            if($idControle == null && $idContrato == null){
                throw new  Exception("Parametro idControle ou idContrato é obrigatorio");
            }

            if ($idContrato != null)
            {
                $contrato = Contrato::find($idContrato);
            }

            if ($idControle != null)
            {
                $query = Contrato::where(Contrato::ID_CONTROLE, '=', $idControle);
                if($open == true) {
                    $query->where(Contrato::SITUACAO, '=', Constants::CONTRATO_STATUS_ABERTO);
                }
                $query->orderBy(Contrato::KEY_ID, 'desc');
                $contrato = $query->first();
                $idContrato = $contrato['id'];
            }

            $query = Medicao::query();

            $query->where(Medicao::ID_CONTRATO, '=', $idContrato)
                ->where(Medicao::PAGO, '=', true);
            $query->with('parcelas')->with('contrato')
                ->orderBy(Medicao::KEY_ID, 'asc');

            //$recordsTotal = $query->count();

            $medicoes = $query->get();
            $totalRecords = count($medicoes);

            //processa as mediçoes colocando as cores
            if (count($medicoes) != 0)
            {
                $valorContrato = Utils::brasilRealToFloat($contrato[Contrato::VALOR]);
                //Duração do contrato em dias
                $diasDoContrato = Utils::daysBetweenDates($contrato[Medicao::DATA_INICIO], $contrato[Medicao::DATA_FIM]);;
                //Valor do contrato Diário
                $valContratoDiario = $valorContrato / $diasDoContrato;
                //0.1 igual a 10%
                $porcentagem = 0.1;
                //Valor Diário + 10%
                $valContratoDiarioPlusPorcent = $valContratoDiario + ($valContratoDiario * $porcentagem);
                //dias das mediçoes acumulados
                $medicaoDiasAcumulados = 0;
                $medicaoValorAcumulado = 0;

                foreach ($medicoes as $medicao)
                {
                    $valorMedicao = 0;
                    foreach ($medicao['parcelas'] as $parcela)
                    {
                        $valorMedicao += Utils::brasilRealToFloat($parcela[Parcela::VALOR]);
                    }
                    $medicao['valor'] = $valorMedicao;
                    $dias = Utils::daysBetweenDates($medicao[Medicao::DATA_INICIO], $medicao[Medicao::DATA_FIM]) + 1;
                    $medicaoDiasAcumulados += $dias;
                    $medicao['diasAcumulados'] = $medicaoDiasAcumulados;
                    $medicaoValorAcumulado += $valorMedicao;
                    $medicao['valorAcumulado'] = $medicaoValorAcumulado;
                    $medicaoMedia = $medicaoValorAcumulado / $medicaoDiasAcumulados;

                    $medicao['media'] = $medicaoMedia;
                    $medicao['valorContratoDia'] = $valContratoDiario;
                    if ($medicaoMedia <= $valContratoDiario)
                    {
                        $medicao['cor'] = 'verde';
                    }
                    else if ($medicaoMedia <= $valContratoDiarioPlusPorcent)
                    {
                        $medicao['cor'] = 'amarelo';
                    }
                    else
                    {
                        $medicao['cor'] = 'vermelho';
                    }
                }
            }

            //executa a paginação
            $medicoesPaginada = [];
            $totalRecords = count($medicoes);
            for ($i = $offset; $i < $limit + $offset; $i++)
            {
                if ($i == $totalRecords)
                {
                    break;
                }
                array_push($medicoesPaginada, $medicoes[$i]);
            }

            $result['draw'] = $draw;
            $result['recordsTotal'] = $totalRecords;
            $result['recordsFiltered'] = $totalRecords;
            $result['data'] = $medicoesPaginada;
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json($result, StatusCode::SUCCESS);
    }

    //lista medições abertas
    public function getAbertas(Request $request)
    {
        try
        {
            $params = $request->all();
            $draw = $params['draw'];
            $offset = $params['start'];
            $limit = $params['length'];
            $search = is_array($params['search']) ? '%' . $params['search']['value'] . '%' : '%' . $params['search'] . '%';

            $idContrato = isset($params['idContrato']) ? $params['idContrato'] : null;
            $idControle = isset($params['idControle']) ? $params['idControle'] : null;
            $open = isset($params['onlyOpen']) ? $params['onlyOpen'] : false;

            if($idControle == null && $idContrato == null){
                throw new  Exception("Parametro idControle ou idContrato é obrigatorio");
            }

            if ($idControle != null)
            {
                $query = Contrato::where(Contrato::ID_CONTROLE, '=', $idControle);
                if($open == true) {
                    $query->where(Contrato::SITUACAO, '=', Constants::CONTRATO_STATUS_ABERTO);
                }
                $query->orderBy(Contrato::KEY_ID, 'desc');
                $contrato = $query->first();
                $idContrato = $contrato['id'];
            }


            $query = Medicao::query();
            $query->selectRaw('DISTINCT "Medicoes".*, sum("' . Parcela::TABLE_NAME . '".' . Parcela::VALOR . ') as valor')
                ->where(Medicao::ID_CONTRATO, '=', $idContrato)
                ->leftJoin(Parcela::TABLE_NAME, Parcela::TABLE_NAME . '.' . Parcela::ID_MEDICAO, '=', Medicao::TABLE_NAME . '.' . Medicao::KEY_ID)
                ->where(Medicao::PAGO, '=', false)
                ->groupBy('Medicoes.id', 'Medicoes.idContrato', 'Medicoes.dataInicio', 'Medicoes.dataFim', 'Medicoes.pago')
                ->orderBy('Medicoes.id', 'asc');

            $totalRecords = count($query->get());
            $medicoes = $query->take($limit)->skip($offset)->get();

            $result['draw'] = $draw;
            $result['recordsTotal'] = $totalRecords;
            $result['recordsFiltered'] = $totalRecords;
            $result['data'] = $medicoes;
        }
        catch (Exception $e)
        {
            return response()
                ->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()
            ->json($result, StatusCode::SUCCESS);
    }

    public function quitar(Request $request)
    {
        try
        {
            $token = $request['jwt'];
            $idOrganograma = $token->idOrganograma;
            if(Constants::ID_ORGANOGRAMA_SEMFAZ != $idOrganograma)
            {
                return response()->json(['message' => StatusMessage::ACESSO_NAO_AUTORIZADO], StatusCode::FORBIDDEN);

            }

            $idMedicao = $request['idMedicao'];
            $pago = $request['pago'];
            $query = Medicao::query();
            $query->where(Medicao::KEY_ID, '=', $idMedicao);
            $query->update([Medicao::PAGO => $pago]);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json(['message' => StatusMessage::MENSAGEM_DE_SUCESSO_PADRAO], StatusCode::SUCCESS);
    }
}