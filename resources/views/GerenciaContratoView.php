<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="Gerencia Pessoas" content="">
    <title>Gerencia Contrato</title>

    <!-- DEPENDENCIAS DE TERCEIROS-->
    <!-- Jquery -->
    <script src="vendor/jquery/3.2.1/jquery.min.js"></script>
    <!-- Materialize -->
    <script src="vendor/materialize/0.100.1/js/materialize.js"></script>
    <link rel="stylesheet" href="vendor/materialize/0.100.1/css/materialize.css">

    <!-- DataTables -->
    <script type="application/javascript" src="vendor/dataTables/1.10.16/datatables.js"></script>
    <script type="application/javascript" src="vendor/dataTables/1.10.16/material-design-dataTables.js"></script>

    <!-- jQuery Masked Input  -->
    <script src="vendor/jquery.mask/1.14.11/jquery.mask.js"></script>

    <!-- Moment.js 2.19.1 (https://momentjs.com/) -->
    <script src="vendor/moment/2.19.1/moment.js"></script>
    <script src="vendor/moment/2.19.1/locale/pt-br.js"></script>

    <!-- ESTILO CUSTOMIZADO -->
    <link rel="stylesheet" type="text/css" href="css/loading.css"/>
    <link rel="stylesheet" type="text/css" href="css/customModal.css"/>
    <link rel="stylesheet" type="text/css" href="css/estiloPmro.css"/>

    <!-- JS CUSTOMIZADO -->
    <script type="application/javascript" src="utils/customModal.js"></script>
    <script type="application/javascript" src="utils/customLoading.js"></script>
    <script type="application/javascript" src="utils/RESTClient.js"></script>
    <script type="application/javascript" src="utils/utils.js"></script>

    <script type="application/javascript" src="viewModel/ConstantsModel.js"></script>
    <script type="application/javascript" src="viewModel/GerenciaContratoViewModel.js"></script>

</head>
<body>
<div class="container-fluid containerInsideIframe">

    <ul class="collapsible customCard" data-collapsible="accordion">
        <li>
            <div class="collapsible-header ">
                <i class="material-icons">insert_drive_file</i>
                Cadastrar Contrato
            </div>
            <div class="collapsible-body no-padding">
                <br>
                <!-- DADOS CONTRATO -->
                <div class="customCard">
                    <!-- FORMULARIO CADASTRO CONTRATO -->
                    <div class="row">
                        <div class="input-field col s12 m2">
                            <input type="text" name="inputNumeroControle" id="inputNumeroControle" placeholder="Selecione" required readonly>
                            <label>Número Controle</label>
                        </div>
                        <div class="input-field col s12 m2">
                            <input type="text" name="inputNumeroProcesso" id="inputNumeroProcesso" required>
                            <label>Número Processo</label>
                        </div>
                        <div class="input-field col s12 m2">
                            <input type="text" name="inputAnoProcesso" id="inputAnoProcesso">
                            <label>Ano Processo</label>
                        </div>
                        <div class="input-field col s12 m2">
                            <input type="text" name="inputNumeroContrato" id="inputNumeroContrato">
                            <label>Número Contrato</label>
                        </div>
                        <div class="input-field col s12 m2">
                            <input type="text" name="inputAnoContrato" id="inputAnoContrato">
                            <label>Ano Contrato</label>
                        </div>
                        <div class="input-field col s12 m2">
                            <input type="text" name="inputDataInicio" id="inputDataInicio">
                            <label>Data Início</label>
                        </div>
                        <div class="input-field col s12 m2">
                            <input type="text" name="inputDataFim" id="inputDataFim">
                            <label>Data Fim</label>
                        </div>
                        <div class="input-field col s12 m2">
                            <input type="text" name="inputValor" id="inputValor">
                            <label>Valor</label>
                        </div>
                        <div class="input-field col s12 m2">
                            <select name="selectTipoContrato" id="selectTipoContrato" disabled>
                                <option value="0" selected>Contrato</option>
                                <option value="1">Aditivo</option>
                            </select>
                            <label>Tipo de Contrato</label>
                        </div>
                        <div class="input-field col s12 m2">
                            <select name="selectTipoAditivo" id="selectTipoAditivo">
                                <option value="" selected disabled>Selecione</option>
                                <option value="0">Prazo</option>
                                <option value="1">Valor</option>
                                <option value="2">Prazo e Valor</option>
                            </select>
                            <label>Tipo Aditivo</label>
                        </div>
                        <div class="input-field col s12 m2">
                            <select name="selectSituacaoContrato" id="selectSituacaoContrato">
                                <option value="" selected disabled>Selecione</option>
                                <option value="0">Aberto</option>
                                <option value="1">Andamento</option>
                                <option value="2">Anulado</option>
                                <option value="3">Concluído</option>
                                <option value="4">Paralisado</option>
                                <option value="5">Rescindido</option>
                            </select>
                            <label>Situação do Contrato</label>
                        </div>
                        <div class="input-field col s12 m2">
                            <input type="text" name="inputPrazoAditivar" id="inputPrazoAditivar" maxlength="3">
                            <label>Prazo Aditivo (dias)</label>
                        </div>
                        <div class="input-field col s12 m2">
                            <input type="text" name="inputDataFimAditivar" id="inputDataFimAditivar" disabled>
                            <label>Data Fim para Aditivar</label>
                        </div>
                    </div>
                    <!-- BOTÃO SALVAR FISCAL -->
                    <div class="row">
                        <div class="col s12 m2 offset-m5">
                            <button class="waves-effect waves-light btn btnMax purple lighten-1" name="btnSalvarContrato"
                                    id="btnSalvarContrato">
                                Cadastrar
                            </button>
                        </div>
                    </div>
                    <!-- FIM BOTÃO SALVAR FISCAL -->
                </div><!-- FIM CONTAINER -->
            </div>
        </li>
        <li>
            <div class="collapsible-header active">
                <i class="material-icons">format_list_numbered</i>
                Lista de Contratos
            </div>
            <div class="collapsible-body no-padding">
                <!-- LISTA CONTRATO -->
                <div class="row">
                    <div class="col s12">
                        <div class="material-table">
                            <div class="table-header">

                                <div class="actions">
                                    <a id="btnAddPessoaFisica" href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">person_add</i></a>
                                    <a id="btnUpdateContrato" href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">refresh</i></a>
                                    <a id="btnDeleteContrato" href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">delete</i></a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i></a>
                                </div>
                            </div>
                            <table id="tableExibeContratos" class="striped">
                                <thead>
                                <tr>
                                    <th>
                                        <div class="dataTableCheckBox">
                                            <input id="listaContratoSelectAll" value="1" type="checkbox">
                                            <label for="listaContratoSelectAll"></label>
                                        </div>
                                    </th>
                                    <th>Nº Processo</th>
                                    <th>Nº Contrato</th>
                                    <th>Data Início</th>
                                    <th>Data Fim</th>
                                    <th>Tipo</th>
                                    <th>Status</th>
                                    <th>Valor</th>
                                    <th>Empenhado</th>
                                    <th>Pago</th>
                                    <th>Saldo</th>
                                    <th>Solicitação</th>
                                </tr>
                                </thead>

                            </table>
                        </div>
                    </div>
                </div>
                <!-- FIM LISTA CONTRATO -->
            </div>
        </li>
    </ul>
</div>

<!-- MODAL LISTA CONTROLES -->
<div id="modalControle" class="customModal">
    <div class="customModalContent ">
        <div class="customModalHeader">
            <span class="customModalCloseBtn"><i class="material-icons">cancel</i></span>
            <h6>Selecione</h6>
        </div>
        <div class="customModalSection">
            <div class="container-fluid">
                <!-- DataTables Controles -->
                <div class="row">
                    <div class="col s12">
                        <div class="material-table">
                            <div class="table-header">
                                <div class="actions">
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i>
                                    </a>
                                </div>
                            </div>
                            <table id="tableListaControle">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Setor</th>
                                    <th>Empresa</th>
                                    <th>Modalidade</th>
                                    <th>Valor Previsto</th>
                                    <th>Objeto</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- CUSTOM LOADING -->
<div id="loading" class="loadingOuter">
    <div class="loadingInner">
        <img class="loadingImage" src="img/loading2.gif">
        <br>
        <span class="loadingText">Carregando...</span>
    </div>
</div>

</body>
</html>