<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 07/12/2017
 * Time: 11:27
 */

namespace App\Http\Controllers;

use App\Pessoa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use Tymon\JWTAuth;

use \Firebase\JWT\ExpiredException;
use \Exception;

use App\Usuario;
use App\Utils\LdapAuth;
use App\Utils\JWTWrapper;
use App\JLog;

class AuthController extends Controller
{
    public function authenticate(Request $request)
    {
        try
        {
            // obter somente username and senha da requisição
            //$credentials = $request->only('userName', 'password');
            $loginName = $request['userName'];
            $password = $request['password'];
            $ipPrivado = $request['ipPrivado'];
            $ipPublico = $request['ipPublico'];
            $ipClientVisibleByServer = $request->ip();
            $userAgent = $request->header('User-Agent');
            $origin = $request->header('Origin');
            $method = $request->method();
            $route = $request->path();
            //$host = $request->getHttpHost()//$request->getSchemeAndHttpHost();
            $host = $request->header('Host');
            //$expirationSec = 32400; //9 horas
            $expirationSec = 32400; //32400 segundo = 9 horas

            JLog::write(
                $route,
                $method,
                3,
                null,
                null,
                null,
                $loginName,
                $ipPublico,
                $ipPrivado,
                $ipClientVisibleByServer,
                'pre login no siscec',
                'login',
                '{}',
                '{}',
                $userAgent,
                $host
            );

            $ldapAuth = new LdapAuth();
            $ldapAuth->setHost('ldap://192.168.133.10');
            $ldapAuth->setDomain('DC=dcro,DC=gov');
            $ldapAuth->setUserDomain('@dcro.gov');

            if ($ldapAuth->authenticate($loginName, $password))
            {
                $usuario = Usuario::where(Usuario::LOGIN, $loginName)->first()->toArray();

                if ($usuario)
                {
                    $pessoa = Pessoa::where(Pessoa::KEY_ID,$usuario[Usuario::ID_PESSOA])->first()->toArray();

                    // autenticacao valida, gerar token
                    $jwt = JWTWrapper::encode(['expirationSec' => $expirationSec,
                        'domain' => 'jubarte.riodasostras.rj.gov.br',
                        'userdata' => [
                            'idSistema' => 3,
                            'idPessoa' => $usuario[Usuario::ID_PESSOA],
                            'idOrganograma' => $usuario[Usuario::ID_ORGANOGRAMA],
                            'loginName' => $loginName,
                            'idPerfil' => $usuario[Usuario::PERFIL],
                            'pws' => '',
                            'ipClientPrivate' => $ipPrivado,
                            'ipClientPublic' =>  $ipPublico,
                            'ipClientVisibleByServer' => $ipClientVisibleByServer,
                            'host' => $host,
                            'origin' =>  $origin,
                            'userAgent' => $userAgent
                        ]
                        ]);
                    return response()->json([
                        'login' => 'true',
                        'token_type' => 'bearer',
                        'expires_in' => $expirationSec,
                        'access_token' => $jwt,
                        'full_name' => $pessoa[Pessoa::NOME],
                        'idPerfil' => $usuario[Usuario::PERFIL],
                        'idOrganograma' => $usuario[Usuario::ID_ORGANOGRAMA]
                    ], 200);
                }
            }
        }
        catch (Exception $e)
        {
            return response()->json(['message' => 'Credencial Invalida', 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], 401);
        }
        return response()->json(['message' => 'Credencial Invalida'], 401);
    }

    public function checkToken(Request $request)
    {
        try
        {
            $token = $request['access_token'];
            if ($token)
            {
                JWTWrapper::decode($token);
                return response()->json(['login' => true,'message' => 'Acesso Autorizado!'], 200);
            }
        }
        catch (ExpiredException $e)
        {   //token espirou
            return response()->json(['message' => 'Acesso não Autorizado !','exception'=>$e->getMessage()], 401);
        }
        catch (Exception $e)
        {   //nao foi possivel decodificar o token jwt
            return response()->json(['message' => 'Acesso não Autorizado !','exception'=>$e->getMessage(),'line'=>$e->getLine(),'file'=>$e->getFile()], 401);
        }
        //nao foi possivel extrair token do header Authorization
        return response()->json(['message' => 'Acesso não Autorizado !'], 401);
    }

}