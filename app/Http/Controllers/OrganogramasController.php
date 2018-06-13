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

use PmroPadraoLib\Controller\OrganogramaController;
use App\Utils\Utils;
use App\Exceptions\Messages;

use App\Utils\StatusCode;
use App\Utils\StatusMessage;

class OrganogramasController
{

    public function getHierarquia(Request $request)
    {
        try
        {
            $setores = OrganogramaController::getHierarquia(null);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json($setores, StatusCode::SUCCESS);
    }

    public function getAllSecretarias(Request $request)
    {
        try
        {
            $setores = OrganogramaController::getAllSecretarias(null);
        }
        catch (Exception $e)
        {
            return response()->json(['message' => StatusMessage::MENSAGEM_ERRO_PADRAO, 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], StatusCode::BAD_REQUEST);
        }
        return response()->json($setores, StatusCode::SUCCESS);
    }
}