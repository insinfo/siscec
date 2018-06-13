<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="Gerencia Controles" content="">
    <title>Gerencia Controles</title>

    <!-- DEPENDENCIAS DE TERCEIROS -->
    <!-- Jquery -->
    <script src="vendor/jquery/1.12.4/jquery.min.js"></script>
    <!-- Materialize -->
    <script src="vendor/materialize/0.100.1/js/materialize.js"></script>
    <link rel="stylesheet" href="vendor/materialize/0.100.1/css/materialize.css">
    <link rel="stylesheet" href="vendor/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Animated Modal -->
    <link rel="stylesheet" href="vendor/animatedModal/1.0/animate.min.css">
    <script src="vendor/animatedModal/1.0/animatedModal.js"></script>
    <!-- Treeview -->
    <script src="vendor/jonmiles-bootstrap-treeview/1.2.0/bootstrap-treeview.min.js"></script>
    <link rel="stylesheet" href="vendor/jonmiles-bootstrap-treeview/1.2.0/bootstrap-treeview.min.css">
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

    <!-- JS LÓGICA DE NEGÓCIO -->
    <script src="utils/customModal.js"></script>
    <script src="utils/customLoading.js"></script>
    <script src="utils/RESTClient.js"></script>
    <script src="utils/utils.js"></script>
    <script src="utils/modalAPI.js"></script>

    <script src="viewModel/ConstantsModel.js"></script>
    <script src="viewModel/ListaControlesViewModel.js"></script>
</head>
<body>
<!-- inicio template de item da lista de controles -->
<template id="controleListItemTemplate">
    <li class="controleListItem" style="clear: both;">
        <div class="card customCard customTable borderAberto">
            <table>
                <tr>
                    <td class="controleTd1">Nº Controle:</td>
                    <td class="controleTd2 listItemNumeroControle"></td>
                    <td class="controleTd3 ">Status:</td>
                    <td class="controleTd4 listItemStatusContrato"></td>
                </tr>
                <tr>
                    <td>Setor:</td>
                    <td class="listItemSetorControle"></td>
                    <td>Número:</td>
                    <td class="listItemNumeroContrato"></td>
                </tr>
                <tr>
                    <td>Modalidade:</td>
                    <td class="listItemModalidade"></td>
                    <td>Dias:</td>
                    <td class="listItemDias"></td>
                </tr>
                <tr>
                    <td>Empresa:</td>
                    <td class="listItemEmpresa"></td>
                    <td>Valor:</td>
                    <td class="listItemValor"></td>
                </tr>
                <tr>
                    <td>Objeto:</td>
                    <td class="listItemObjeto">

                    </td>
                    <td class="listItemBotaoAditivo" colspan="2">
                        <button class="waves-effect waves-light btn-flat btnSolicitaAditivo  pink lighten-5 pink-text text-darken-1">
                            <i class="material-icons left pink-text text-darken-1">note_add</i>
                            Informar Aditivo
                        </button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="fixed-action-btn cardActionBtn">
            <a class="btnEditarControle btn-floating btn-large purple darken-4 tooltipped" data-position="left"
               data-delay="50" data-tooltip="Editar">
                <i class="large material-icons">
                    mode_edit
                </i>
            </a>

        </div>
    </li>
</template>
<!-- fim template de item da lista de controles -->

<div class="container-fluid containerInsideIframe">
    <!-- Filtros da Lista de controles-->
    <div class="row card customCard">
        <div class="col s12 m3">
            <div class="input-field">
                <i class="material-icons inputSufix clearInput" >clear</i>
                <input type="text" placeholder="Selecione" id="inputSetorFiltro" name="inputSetorFiltro"
                       data-content="">
                <label>Setor</label>
            </div>
        </div>
        <div class="col s12 m2">
            <div class="input-field">
                <select id="selecModalidadeFiltro">
                    <option selected value="">Modalidade</option>
                    <option value="0">Serviço Contínuo</option>
                    <option value="1">Tecnológico</option>
                    <option value="2">Outros</option>
                </select>
            </div>
        </div>
        <div class="col s12 m2">
            <div class="input-field">
                <select id="selectStatusFiltro">
                    <option selected value="">Status do Contrato</option>
                    <option value="0">Aberto</option>
                    <option value="1">Andamento</option>
                    <option value="2">Anulado</option>
                    <option value="3">Concluido</option>
                    <option value="4">Paralizado</option>
                    <option value="5">Rescindido</option>
                </select>
            </div>
        </div>
        <div class="col s12 m2">
            <div class="input-field">
                <select id="selectOrderFiltro">
                    <option selected value="DESC">Recentes</option>
                    <option value="ASC">Antigos</option>
                </select>
            </div>
        </div>
        <div class="col s12 m2">
            <div class="input-field">
                <i class="material-icons inputSufix" id="btnSearchFiltro">search</i>
                <input type="text" id="inputSearchFiltro">
                <label>Buscar</label>
            </div>
        </div>
        <div class="col s12 m1 marginTop10">
            <div class="input-field inline" style="width: 60px;">
                <button id="btnShowGrid" class="material-icons btn-flat no-padding btnAtivo tooltipped"
                        data-position="bottom"
                        data-delay="50" data-tooltip="Exibir como Grade">grid_on
                </button>
                <button id="btnShowList" class="material-icons btn-flat no-padding btnInativo tooltipped"
                        data-position="bottom"
                        data-delay="50" data-tooltip="Exibir como Lista">format_align_justify
                </button>
            </div>
        </div>
    </div>
    <!-- Fim dos Filtros da Lista -->

    <div id="tabGrid">
        <ul>
        </ul>
    </div>

    <div id="tabList" class="hideTab">
        <div class="card customCard material-table">
            <div class="table-header">
                <span class="table-title"></span>
                <div class="actions">

                    <a id="btnDeleteControle" href="#" class="waves-effect btn-flat nopadding">
                        <i class="material-icons">delete</i>
                    </a>
                </div>
            </div>
            <table id="tableListaControle" class="centered">
                <thead>
                <tr>
                    <th>
                        <div class="dataTableCheckBox">
                            <input id="btnDataTableControleSelectAll" value="1" type="checkbox">
                            <label for="btnDataTableControleSelectAll"></label>
                        </div>
                    </th>
                    <th>Nº Controle</th>
                    <th>Setor</th>
                    <th>Empresa</th>
                    <th>Modalidade</th>
                    <th>Valor</th>
                    <th>Objeto</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div class="dataTableCheckBox">
                            <input id="listaControleSelectAll" value="1" type="checkbox">
                            <label for="listaControleSelectAll"></label>
                        </div>
                    </td>
                    <td>Secretaria Municipal de Educação</td>
                    <td>Prefeitura de Rio das Ostras</td>
                    <td>Serviço Contínuo</td>
                    <td>R$ 50.000.000,00</td>
                    <td>slfgsd flj lg shdfgshd fkg hsd</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- paginação -->
    <div class="row" align="center">
        <ul class="pagination col s12 m12" id="paginationListaControles">
            <!--<li class="active"><a href="#">1</a></li>
            <li class="waves-effect">
                <a href="#"><i class="material-icons">chevron_right</i></a>
            </li>-->
        </ul>
    </div>

</div>

<!-- MODAL EDITAR -->
<div id="gerenciaControleModal" class="animatedModalContainer">
    <div class="modal-content">
        <!--modal content -->
        <div class="container-fluid">
            <ul class="collapsible customCard" data-collapsible="accordion">
                <li>
                    <div class="collapsible-header active">
                        <i class="material-icons">insert_drive_file</i>
                        Editar Controle
                    </div>
                    <div class="collapsible-body no-padding">
                        <br>
                        <!-- FORMULARIO EDITAR CONTROLE -->
                        <div class="row">
                            <div class="input-field col s12 m3">
                                <input type="text" name="inputEditNumeroControle" id="inputEditNumeroControle"
                                       value="00" readonly disabled>
                                <label>Nº Controle</label>
                            </div>
                            <div class="input-field col s12 m6">
                                <input type="text" name="inputEditSetor" id="inputEditSetor"
                                       placeholder="Selecione" required readonly>
                                <label>Secretaria / Setor</label>
                            </div>
                            <div class="input-field col s12 m3">
                                <select name="selectEditModalidade" id="selectEditModalidade" required>
                                    <option value="" selected disabled>Selecione</option>
                                    <option value="0">Serviço Contínuo</option>
                                    <option value="1">Tecnológico</option>
                                    <option value="2">Outros</option>
                                </select>
                                <label>Modalidade</label>
                            </div>
                            <div class="input-field col s12 m9">
                                <input type="text" name="inputEditEmpresa" maxlength="50" id="inputEditEmpresa"
                                       placeholder="Selecione"
                                       required readonly>
                                <label>Empresa</label>
                            </div>
                            <div class="input-field col s12 m3">
                                <input type="text" name="inputEditPrevisaoGasto" maxlength="50" id="inputEditPrevisaoGasto"
                                >
                                <label>Previsão de Gasto</label>
                            </div>
                            <div class="col s12 m12">
                                <label for="textAreaObjeto" class="labelTextArea">Objeto</label>
                                <textarea class="customTextArea" id="textAreaEditObjeto" name="textAreaEditObjeto"></textarea>
                            </div>
                        </div>
                        <!-- BOTÃO SALVAR CONTROLE -->
                        <div class="row">
                            <div class="col s12 m2 offset-m5">
                                <button class="waves-effect waves-light btn btnMax purple lighten-1"
                                        name="btnSalvarEditControle"
                                        id="btnSalvarEditControle">
                                    Salvar
                                </button>
                            </div>
                        </div>
                        <!-- FIM BOTÃO SALVAR CONTROLE -->
                    </div>
                </li>
                <li>
                    <div class="collapsible-header">
                        <i class="material-icons">supervisor_account</i>
                        Editar Fiscais
                    </div>
                    <div class="collapsible-body no-padding">
                        <br>
                        <!-- FORMULARIO EDITAR FISCAL -->
                        <div class="row">
                            <div class="input-field col s12 m4">
                                <input type="text" name="inputEditNomeFiscal" maxlength="50" id="inputEditNomeFiscal"
                                       placeholder="Selecione"
                                       required>
                                <label>Nome</label>
                            </div>
                            <div class="input-field col s12 m2">
                                <input type="text" name="inputEditMatricula" maxlength="50" id="inputEditMatricula" required>
                                <label>Matrícula</label>
                            </div>
                            <div class="input-field col s12 m2">
                                <input type="text" name="inputEditNumeroPortaria" maxlength="50" id="inputEditNumeroPortaria"
                                       required>
                                <label>Nº Portaria</label>
                            </div>
                            <div class="input-field col s12 m2">
                                <input type="text" name="inputEditAnoPortaria" maxlength="50" id="inputEditAnoPortaria"
                                       required>
                                <label>Ano Portaria</label>
                            </div>
                            <div class="input-field col s12 m2">
                                <input type="text" name="inputEditDataPortaria" maxlength="50" id="inputEditDataPortaria"
                                       required>
                                <label>Data Portaria</label>
                            </div>
                        </div>
                        <!-- BOTÃO SALVAR FISCAL -->
                        <div class="row">
                            <div class="col s12 m2 offset-m5">
                                <button class="waves-effect waves-light btn btnMax purple lighten-1" name="salvar"
                                        id="btnSalvarFiscal">
                                    Salvar
                                </button>
                            </div>
                        </div>
                        <!-- FIM BOTÃO SALVAR FISCAL -->
                        <!-- LISTA FISCAL -->
                        <div class="row">
                            <div class="col s12">
                                <div class="material-table">
                                    <div class="table-header">
                                        <h5 class="customH5">Lista de Fiscais</h5>
                                        <div class="actions">
                                            <a id="btnAddNewFiscal" href="#"
                                               class="waves-effect btn-flat nopadding">
                                                <i class="material-icons">person_add</i></a>
                                            <a id="btnUpdateListFiscalToEdit" href="#"
                                               class="waves-effect btn-flat nopadding">
                                                <i class="material-icons">refresh</i></a>
                                            <a id="btnDeleteFiscal" href="#"
                                               class="waves-effect btn-flat nopadding">
                                                <i class="material-icons">delete</i></a>
                                            <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                                <i class="material-icons">search</i></a>
                                        </div>
                                    </div>
                                    <table id="tableFiscalToEdit" class="striped">
                                        <thead>
                                        <tr>
                                            <th>
                                                <div class="dataTableCheckBox">
                                                    <input id="pessoaFisicaSelectAll" value="1" type="checkbox">
                                                    <label for="pessoaFisicaSelectAll"></label>
                                                </div>
                                            </th>
                                            <th>Nome</th>
                                            <th>Matrícula</th>
                                            <th>Nº Portaria</th>
                                            <th>Ano Portaria</th>
                                            <th>Data Portaria</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- FIM LISTA FISCAL -->
                    </div>
                </li>
                <li>
                    <div class="collapsible-header">
                        <i class="fa fa-file-text" style="font-size: 1.3em;"></i>
                        Editar Contrato
                    </div>
                    <div class="collapsible-body no-padding">
                        <br>
                        <!-- FORMULARIO CADASTRA CONTRATO -->
                        <div class="row">
                            <div class="input-field col s12 m2">
                                <input type="text" name="inputNumeroProcessoContrato" id="inputNumeroProcessoContrato" required>
                                <label>Nº Processo</label>
                            </div>
                            <div class="input-field col s12 m2">
                                <input type="text" name="inputAnoProcessoContrato" id="inputAnoProcessoContrato">
                                <label>Ano Processo</label>
                            </div>
                            <div class="input-field col s12 m2">
                                <input type="text" name="inputNumeroContrato" id="inputNumeroContrato">
                                <label>Nº Contrato</label>
                            </div>
                            <div class="input-field col s12 m2">
                                <input type="text" name="inputAnoContrato" id="inputAnoContrato">
                                <label>Ano Contrato</label>
                            </div>
                            <div class="input-field col s12 m2">
                                <input type="text" name="inputDataInicioContrato" id="inputDataInicioContrato">
                                <label>Data Início</label>
                            </div>
                            <div class="input-field col s12 m2">
                                <input type="text" name="inputDataFimContrato" id="inputDataFimContrato">
                                <label>Data Fim</label>
                            </div>
                            <div class="input-field col s12 m2">
                                <input type="text" name="inputValorContrato" id="inputValorContrato">
                                <label>Valor</label>
                            </div>
                            <div class="input-field col s12 m2">
                                <select name="selectTipoContrato" id="selectTipoContrato">
                                    <option value="0" selected>Contrato</option>
                                    <option value="1">Aditivo</option>
                                </select>
                                <label>Tipo de Contrato</label>
                            </div>
                            <div class="input-field col s12 m2">
                                <select name="selectTipoAditivoContrato" id="selectTipoAditivoContrato">
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
                                <input type="text" name="inputPrazoAditivarContrato" id="inputPrazoAditivarContrato" maxlength="10">
                                <label>Prazo Aditivo (dias)</label>
                            </div>
                            <div class="input-field col s12 m2">
                                <input type="text" name="inputDataFimAditivarContrato" id="inputDataFimAditivarContrato" disabled>
                                <label>Data Fim para Aditivar</label>
                            </div>
                        </div>

                        <!-- BOTÃO SALVAR CONTRATO -->
                        <div class="row">
                            <div class="col s12 m2 offset-m5">
                                <button class="waves-effect waves-light btn btnMax purple lighten-1" name="salvar"
                                        id="btnSalvarContrato">
                                    Salvar
                                </button>
                            </div>
                        </div>

                        <!-- FIM BOTÃO SALVAR CONTRATO -->
                        <div class="row">
                            <div class="col s12">
                                <div class="material-table">
                                    <div class="table-header">
                                        <span class="table-title">Lista de Contratos</span>
                                        <div class="actions">
                                            <a id="btnAddNewContrato" href="#"
                                               class="waves-effect btn-flat nopadding">
                                                <i class="material-icons">person_add</i></a>
                                            <a id="btnUpdateTableContratoToEdit" href="#"
                                               class="waves-effect btn-flat nopadding">
                                                <i class="material-icons">refresh</i></a>
                                            <a id="btnDeleteContrato" href="#"
                                               class="waves-effect btn-flat nopadding">
                                                <i class="material-icons">delete</i></a>
                                            <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                                <i class="material-icons">search</i></a>
                                        </div>
                                    </div>
                                    <table id="tableContratoToEdit" class="striped">
                                        <thead>
                                        <tr>
                                            <th>
                                                <div class="dataTableCheckBox">
                                                    <input id="tableContratoToEditSelectAll" value="1" type="checkbox">
                                                    <label for="tableContratoToEditSelectAll"></label>
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
                    </div>
                </li>
            </ul>
            <!-- INICIO BOTOES FLUTUANTES -->
            <div style="width: 100%; height: 110px;">
                <div class="fixed-action-btn">
                    <a class="btn-floating btn-large red darken-4 animatedModalCloseBtn">
                        <i class="large waves-effect waves-light material-icons">close</i>
                    </a>
                </div>
            </div>
            <!-- FIM BOTOES FLUTUANTES -->

        </div><!-- FIM CONTAINER -->
        <!-- fim modal content -->
    </div>
</div>

<!-- MODAL EXIBIR -->
<div id="exibirControleModal" class="animatedModalContainer">
    <!--modal content -->
    <div class="modal-content">
        <div class="container-fluid">
            <ul class="collapsible customCard customCardPadding" data-collapsible="expandable">
                <li>
                    <div class="collapsible-header customAcordeon active">
                        <i class="material-icons">insert_drive_file</i>
                        Controle de Execução Contratual
                    </div>
                    <div class="collapsible-body" style="padding:25px  20px 5px 20px">
                        <div class="row">
                            <div class="col s12 m2 negrito ">Nº Controle</div>
                            <div class="col s12 m4" id="outputNumeroControle">06.10.2017.19.29.59.0001</div>
                            <div class="col s12 m1 negrito">Setor</div>
                            <div class="col s12 m5" id="outputSetor">SEMAD - Secretaria Minicipal de Administração</div>
                        </div>
                        <div class="row">
                            <div class="col s12 m2 negrito">Modalidade</div>
                            <div class="col s12 m4" id="outputModalidade">Serviço Contínuo</div>
                            <div class="col s12 m2 negrito">Previsão de Gasto</div>
                            <div class="col s12 m4" id="outputPrevisaoGasto">R$ 1.000.000,00</div>
                        </div>
                        <div class="row">
                            <div class="col s12 m2 negrito">Empresa</div>
                            <div class="col s12 m10" id="outputEmpresa">Coca Cola Refrigerantes Indústria e Comércio de Bebidas Ltda.</div>
                        </div>
                        <div class="row">
                            <div class="col s12 m2 negrito">Objeto</div>
                            <div class="col s12 m10" id="outputObjeto">
                                <p>
                                    Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de
                                    impressos, e vem sendo utilizado desde o século XVI, quando um impressor
                                    desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de
                                    modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao
                                    salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se
                                    popularizou na década de 60, quando a Letraset lançou decalques contendo passagens
                                    de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de
                                    editoração eletrônica como Aldus PageMaker.
                                </p>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header customAcordeon active">
                        <i class="fa fa-file-text" style="font-size: 1.3em;"></i>
                        Contratos deste controle
                    </div>
                    <div class="collapsible-body no-padding">
                        <div>
                            <div>
                                <div class="material-table">
                                    <div class="table-header">
                                        <div class="actions">
                                            <a href="#" class="waves-effect btn-flat nopadding dataTablesBtnRefresh">
                                                <i class="material-icons">refresh</i>
                                            </a>
                                            <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                                <i class="material-icons">search</i>
                                            </a>
                                        </div>
                                    </div>
                                    <table id="tableExibeContratos" class="centered mousePointer">
                                        <thead>
                                        <tr>
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
                                        <tbody>
                                        <tr>
                                            <th>9999/2017</th>
                                            <th>9999/2017</th>
                                            <th>01/09/2007</th>
                                            <th>20/11/2010</th>
                                            <th>Contrato</th>
                                            <th>Andamento</th>
                                            <th>R$ 1.000.000,00</th>
                                            <th>R$ 500.000,00</th>
                                            <th>R$ 200.000,00</th>
                                            <th><input type="checkbox" id="saldo" checked><label for="saldo"></label>
                                            </th>
                                            <th><input type="checkbox" id="saldo" checked><label for="saldo"></label>
                                            </th>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header customAcordeon active">
                        <i class="fa fa-calculator" aria-hidden="true" style="font-size: 1.3em;"></i>
                        Medições
                    </div>
                    <div class="collapsible-body no-padding">
                        <div class="row" style="margin-bottom: 0px">
                            <div class="col s12 m6">
                                <div class="material-table">
                                    <div class="table-header customTableHeader">
                                        <span class="table-title">Pagos</span>
                                        <div class="actions">

                                        </div>
                                    </div>
                                    <table id="tableMedicoesPagas" class=" centered">
                                        <thead>
                                        <tr>
                                            <th>Data Início</th>
                                            <th>Data Fim</th>
                                            <th>Valor</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div class="col s12 m6">
                                <div class="material-table">
                                    <div class="table-header">
                                        <span class="table-title">Em Aberto</span>
                                        <div class="actions">
                                        </div>
                                    </div>
                                    <table id="tableMedicoesAbertas" class=" centered">
                                        <thead>
                                        <tr>
                                            <th>Data Início</th>
                                            <th>Data Fim</th>
                                            <th>Valor</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header customAcordeon active">
                        <i class="material-icons">supervisor_account</i>
                        Fiscais
                    </div>
                    <div class="collapsible-body no-padding">
                        <div>
                            <div>
                                <div class="material-table">
                                    <div class="table-header">
                                        <div class="actions">

                                        </div>
                                    </div>
                                    <table id="tableExibeFiscais" class=" centered">
                                        <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Matrícula</th>
                                            <th>Nº Portaria</th>
                                            <th>Ano Portaria</th>
                                            <th>Data Portaria</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- FIM LISTA FISCAL -->
                    </div>
                </li>
            </ul>
            <br>
            <!-- INICIO BOTOES FLUTUANTES -->
            <div style="width: 100%; height: 110px;">
                <div class="fixed-action-btn">
                    <a class="btn-floating btn-large red darken-4 animatedModalCloseBtn">
                        <i class="large waves-effect waves-light material-icons">close</i>
                    </a>
                </div>
            </div>
            <!-- FIM BOTOES FLUTUANTES -->
        </div><!-- FIM CONTAINER -->
    </div> <!-- fim modal content -->
</div>

<!-- MODAL SETOR -->
<div id="modalSetor" class="customModal">
    <div class="customModalContent customModalSmall">
        <div class="customModalHeader">
            <span class="customModalCloseBtn"><i class="material-icons">cancel</i></span>
            <h6>Selecione o Setor</h6>
        </div>
        <div class="customModalSection">
            <div class="container-fluid">
                <div class="row">
                    <div class="input-field col ">
                        <input size="55%" class="" type="text" id="inputModalBuscaSetor">
                        <label class="center-align">Digite nome ou sigla para buscar</label>
                    </div>
                </div>
                <div id="treeViewModalBuscaSetor"></div>
            </div>
        </div>
    </div>
</div>

<!-- MODAL EMPRESA -->
<div id="modalEmpresa" class="customModal">
    <div class="customModalContent ">
        <div class="customModalHeader">
            <span class="customModalCloseBtn"><i class="material-icons">cancel</i></span>
            <h6>Selecione</h6>
        </div>
        <div class="customModalSection">
            <div class="container-fluid">
                <!-- DataTables Empresas -->
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
                            <table id="tablePessoaJuridica" class="responsive-table">
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- MODAL PESSOA FÍSICA -->
<div id="modalPessoaFisica" class="customModal">
    <div class="customModalContent ">
        <div class="customModalHeader">
            <span class="customModalCloseBtn"><i class="material-icons">cancel</i></span>
            <h6>Selecione a Pessoa</h6>
        </div>
        <div class="customModalSection">
            <div class="container-fluid">
                <!-- DataTables Empresas -->
                <div class="row">
                    <div class="col s12">
                        <div class="material-table">
                            <div class="table-header">
                                <div class="actions">
                                    <a href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">person_add</i></a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i></a>
                                </div>
                            </div>
                            <table id="tablePessoaFisica">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome</th>
                                    <th>Nascimento</th>
                                    <th>Sexo</th>
                                    <th>CPF</th>
                                    <th>RG</th>
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

<!-- MODAL SOLICITAR ADITIVO -->
<div id="modalSolicitarAditivo" class="customModal">
    <div class="customModalContent customModalSmall">
        <div class="customModalHeader">
            <span class="customModalCloseBtn"><i class="material-icons">cancel</i></span>
            <h6>Solicitar Aditivo</h6>
        </div>
        <div class="customModalSection">
            <div class="container-fluid">
                <div class="row">
                    <div class="noteInfo">
                        <p>Solicitações de aditivos só devem ser registradas no sistema após
                            rebimento do processo aberto no protocolo geral da prefeitura.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col">
                        <input size="55%" class="" type="text" id="inputDataSolicitacaoAditivo">
                        <label class="center-align">Data Solicitação</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 m12">
                        <label for="textAreaJustificaSolicitaAd" class="labelTextArea">Justificativa</label>
                        <textarea class="customTextArea" id="textAreaJustificaSolicitaAd" name="textAreaEditObjeto"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 m2 offset-m5">
                        <button id="btnSalvaSolicitacaoAditivo" class="btn purple darken-4 waves-effect">Solicitar</button>
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