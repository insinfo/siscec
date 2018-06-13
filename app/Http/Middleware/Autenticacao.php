<?php

namespace App\Http\Middleware;

use Closure;
use \Illuminate\Http\Request;
use \Firebase\JWT\ExpiredException;
use App\Utils\JWTWrapper;
use \Exception;
use App\Utils\Utils;
use App\Token;

class Autenticacao
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try
        {
            //$authorization = $request->header('Authorization');
            // list($token) = sscanf($authorization, 'Bearer %s');
            $token = $request->bearerToken();

            if ($token)
            {
                $jwt = JWTWrapper::decode($token);
                $tokenInfo = new Token();
                $tokenInfo->fillFromJwt($jwt);
                $request['jwt'] = $tokenInfo;
            }
            else
            {
                // nao foi possivel extrair token do header Authorization
                return response()->json(['message' => 'Acesso não Autorizado!', 'exception' => 'Header sem Token'], 401);
            }
        }
        catch (ExpiredException $e)
        {  //  token espirou
            return response()->json(['message' => 'Acesso não Autorizado!', 'exception' => $e->getMessage()], 401);
        }
        catch (Exception $e)
        {  // nao foi possivel decodificar o token jwt
            return response()->json(['message' => 'Acesso não Autorizado!', 'exception' => $e->getMessage(), 'line' => $e->getLine(), 'file' => $e->getFile()], 401);
        }
        return $next($request);
    }
}
