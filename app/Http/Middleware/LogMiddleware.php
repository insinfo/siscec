<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 19/03/2018
 * Time: 12:37
 */

namespace App\Http\Middleware;

use Closure;
use \Illuminate\Http\Request;
use \Firebase\JWT\ExpiredException;
use App\Utils\JWTWrapper;
use \Exception;
use App\Utils\Utils;
use App\Token;
use App\JLog;


class LogMiddleware
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
        try {

            $ipClientVisibleByServer = $request->ip();
            $userAgent = $request->header('User-Agent');
            $origin = $request->header('Origin');
            //$host = $request->getHttpHost()//$request->getSchemeAndHttpHost();
            $host = $request->header('Host');
            $tok = $request->bearerToken();
            $method = $request->method();
            $route = $request->path();
            $tokenInfo = new Token();

            //$request->server('HTTP_USER_AGENT');
            //$request->header('Host')
            //$request->header('Origin')
            //$userAgent = $request->header('User-Agent');

            if ($method == 'PUT' || $method == 'DELETE') {
                if ($tok) {

                    $jwt = JWTWrapper::decode($tok);
                    $tokenInfo->fillFromJwt($jwt);
                }
                JLog::write(
                    $route,
                    $method,
                    $tokenInfo->getIdSistema(),
                    $tokenInfo->getIdPessoa(),
                    $tokenInfo->getIdOrganograma(),
                    $tokenInfo->getIdPerfil(),
                    $tokenInfo->getLoginName(),
                    $tokenInfo->getIpClientPublic(),
                    $tokenInfo->getIpClientPrivate(),
                    $ipClientVisibleByServer,
                    'rota interceptada pelo LogMiddleware no siscec',
                    'info',
                    json_encode($request->all()),
                    '{}',
                    $userAgent,
                    $request->getHttpHost()
                );
            }
        } catch (Exception $e) {

        }

        return $next($request);
    }

    public function getUserAgent($request)
    {
        $user_agent = $request->header('User-Agent');
        $bname = 'Unknown';
        $platform = 'Unknown';

        //First get the platform?
        if (preg_match('/linux/i', $user_agent)) {
            $platform = 'linux';
        } elseif (preg_match('/macintosh|mac os x/i', $user_agent)) {
            $platform = 'mac';
        } elseif (preg_match('/windows|win32/i', $user_agent)) {
            $platform = 'windows';
        }


        // Next get the name of the useragent yes seperately and for good reason
        if (preg_match('/MSIE/i', $user_agent) && !preg_match('/Opera/i', $user_agent)) {
            $bname = 'Internet Explorer';
            $ub = "MSIE";
        } elseif (preg_match('/Firefox/i', $user_agent)) {
            $bname = 'Mozilla Firefox';
            $ub = "Firefox";
        } elseif (preg_match('/Chrome/i', $user_agent)) {
            $bname = 'Google Chrome';
            $ub = "Chrome";
        } elseif (preg_match('/Safari/i', $user_agent)) {
            $bname = 'Apple Safari';
            $ub = "Safari";
        } elseif (preg_match('/Opera/i', $user_agent)) {
            $bname = 'Opera';
            $ub = "Opera";
        } elseif (preg_match('/Netscape/i', $user_agent)) {
            $bname = 'Netscape';
            $ub = "Netscape";
        }

        return $bname;
    }

}