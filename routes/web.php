<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::any('/', function ()
{
    return view('MainView');
});
Route::any('/mainView', function ()
{
    return view('MainView');
});

Route::get('/listaControles', function ()
{
    return view('ListaControlesView');
});

Route::get('/exibirControle', function ()
{
    return view('ExibirControleView');
});

Route::get('/cadastraControle', function ()
{
    return view('CadastraControleView');
});

Route::get('/gerenciaContrato', function ()
{
    return view('GerenciaContratoView');
});

Route::get('/gerenciaSetor', function ()
{
    return view('GerenciaSetorView');
});

Route::get('/gerenciaUsuario', function ()
{
    return view('GerenciaUsuarioView');
});

Route::get('/gerenciaPessoa', function ()
{
    return view('GerenciaPessoaView');
});

Route::get('/dashboard', function ()
{
    return view('DashboardView');
});
Route::get('/gerenciaEmpenho', function ()
{
    return view('GerenciaEmpenhoView');
});
Route::get('/gerenciaFiscal', function ()
{
    return view('GerenciaFiscalView');
});

Route::get('/gerenciaMedicao', function ()
{
    return view('GerenciaMedicaoView');
});
Route::get('/gerenciaPermissao', function ()
{
    return view('GerenciaPermissaoView');
});

Route::get('/gerenciaPagamento', function ()
{
    return view('GerenciaPagamentoView');
});

//ROTAS DE TESTE
Route::get('/modal', function ()
{
    return view('Modal');
});
Route::get('/modal2', function ()
{
    return view('ModalV2');
});


