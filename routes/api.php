<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request)
{
    return $request->user();
})
;*/

/*Route::match(['options','put','delete','post','get'], '/route', function () {
    // This will work with the middleware shown in the accepted answer
})->middleware('cors');*/

/*Route::options('/route', function(){
    return http_response_code(200);
});*/

//Route::post('auth', array('middleware' => 'cors', 'uses' => 'AuthController@authenticate'));

//ROTA DE TESTE ALEX
Route::get('/modalErro', 'ControleController@getErroTeste');

//ROTA DE AUTENTICAÇÃO
Route::post('/auth', 'AuthController@authenticate');
Route::post('/auth/check', 'AuthController@checkToken');

//ROTAS PROTEGIDAS
Route::group(['middleware' => ['App\Http\Middleware\Autenticacao','LogMiddleware']], function () {

    //GERA UM NUMERO EM SERIE
    Route::get('/serial', 'ControleController@getSerialId');

    /**************** CONTROLE ******************/
    //SALVA OU ATUALIZA UM CONTROLE
    Route::put('/controles/{id?}', 'ControleController@save');
    //LISTA CONTROLES
    Route::post('/controles', 'ControleController@getAll');
    //DELETA CONTROLE
    Route::delete('/controles', 'ControleController@delete');
    //OBTEM CONTROLE
    Route::get('/controles/{id}', 'ControleController@get');

    /**************** FISCAL ******************/
    //SALVA OU ATUALIZA UM FISCAL
    Route::put('/fiscais/{id?}', 'FiscalController@save');
    //LISTA FISCAIS
    Route::post('/fiscais', 'FiscalController@getAll');
    //DELETA FISCAIS
    Route::delete('/fiscais', 'FiscalController@delete');

    /**************** CONTRATO ******************/
    //SALVA OU ATUALIZA UM CONTRATO
    Route::put('/contratos/{id?}', 'ContratoController@save');
    //OBTEM CONTRATOS
    Route::post('/contratos', 'ContratoController@getAll');
    //DELETA CONTRATOS
    Route::delete('/contratos', 'ContratoController@delete');

    /**************** FONTE RECURSO ******************/
    //OBTEM FONTES DE RECURSOS
    Route::post('/recursos', 'FonteRecursoController@getAll');

    /**************** EMPENHOS ******************/
    //OBTEM EMPENHOS
    Route::post('/empenhos', 'EmpenhoController@getAll');
    //SALVA OU ATUALIZA UM EMPENHO
    Route::put('/empenhos/{id?}', 'EmpenhoController@save');
    //DELETA EMPENHOS
    Route::delete('/empenhos', 'EmpenhoController@delete');

    /**************** MEDIÇÕES ******************/
    //SALVA OU ATUALIZA UMA MEDIÇÃO
    Route::put('/medicoes/{id?}', 'MedicoesController@save');
    //OBTEM A ULTIMA MEDICAO DE UM CONTRATO
    Route::get('/medicoes/contrato/{id}', 'MedicoesController@getLastByContrato');
    //OBTEM MEDIÇOES
    Route::post('/medicoes', 'MedicoesController@getAll');
    //LISTA MEDIÇÕES PAGAS
    Route::post('/medicoes/pagas', 'MedicoesController@getPagas');
    //LISTA MEDIÇÕES ABERTAS
    Route::post('/medicoes/abertas', 'MedicoesController@getAbertas');
    //DELETA MEDIÇOES
    Route::delete('/medicoes', 'MedicoesController@delete');
    //QUITAR MEDIÇÂO
    Route::post('/medicoes/quitar', 'MedicoesController@quitar');

    /**************** PARCELAS ******************/
    //OBTEM PARCELAS
    Route::post('/parcelas', 'ParcelaController@getAll');
    //DELETA PARCELAS
    Route::delete('/parcelas', 'ParcelaController@delete');

    /**************** USUARIOS ******************/
    //SALVA OU ATUALIZA UM USUARIO
    Route::put('/usuarios/{id?}', 'UsuarioController@save');
    //LISTA USUARIOS
    Route::post('/usuarios', 'UsuarioController@getAll');
    //LISTA USUARIOS LDAP
    Route::post('/usuarios/ldap', 'UsuarioController@getAllLdap');
    //DELETA USUARIOS
    Route::delete('/usuarios', 'UsuarioController@delete');

    /**************** SETORES ******************/
    //LISTA TODOS SETORES
    Route::get('/setores', 'OrganogramasController@getHierarquia');
    Route::get('/secretarias', 'OrganogramasController@getAllSecretarias');

    /**************** PESSOA  ******************/
    //LISTA TODAS PESSOAS
    Route::post('/pessoas/datatable', 'PessoasController@getAll');
    //CADASTRA UMA PESSOA
    Route::put('/pessoas', 'PessoasController@save');
    //ATUALIZA UMA PESSOA
    Route::put('/pessoas/{id?}', 'PessoasController@update');
    //OBTEM UMA PESSOA
    Route::get('/pessoas/{id}/{tipoPessoa}', 'PessoasController@get');

    /**************** MENU  ******************/
    Route::get('/menu/hierarquia', 'MenuController@getHierarchy');
    Route::get('/menu', 'MenuController@getAll');

});