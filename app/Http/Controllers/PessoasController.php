<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 30/01/2018
 * Time: 17:19
 */

namespace App\Http\Controllers;

require_once '../../pmroPadrao/src/start.php';

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use \Exception;

use PmroPadraoLib\Controller\PessoaController;
use App\Utils\Utils;
use App\Exceptions\Messages;
use App\Utils\StatusCode;
use App\Utils\StatusMessage;

class PessoasController
{
    public function getAll(Request $request)
    {
        try
        {
            $result = PessoaController::getAll($request);
            //$pessoas = ;
            /*foreach ($result['data'] as &$item){
                $item['dataNascimento'] = Utils::SQLDateToBrasilDate(  $item['dataNascimento'] );
                $item['dataEmissao'] = Utils::SQLDateToBrasilDate(  $item['dataEmissao'] );
            }*/
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);

        }

        return response()->json($result, StatusCode::SUCCESS);
    }

    public function save(Request $request)
    {
        try
        {
            $formData = $request->all();
            PessoaController::save($formData);

        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }

        return response()->json(['message' => StatusMessage::MENSAGEM_DE_SUCESSO_PADRAO], StatusCode::SUCCESS);
    }

    public function update(Request $request)
    {
        try
        {
            $formData = $request->all();
            PessoaController::update($formData);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => Messages::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }

        return response()->json(['message' => Messages::MENSAGEM_DE_SUCESSO_PADRAO], StatusCode::SUCCESS);
    }

    public function get(Request $request, $id = null, $tipoPessoa = null)
    {
        try
        {
            $formData['id'] = $id;
            $formData['tipo'] = $tipoPessoa;
            $result = PessoaController::get($formData);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => Messages::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }

        return response()->json($result, StatusCode::SUCCESS);
    }

}