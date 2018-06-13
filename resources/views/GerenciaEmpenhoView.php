<!DOCTYPE html>
<html lang="pt-br">
<head>
    <title>Gerencia Empenho</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- DEPENDENCIAS DE TERCEIROS -->
    <!-- Jquery -->
    <script src="vendor/jquery/3.2.1/jquery.min.js"></script>

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

    <!-- JS CUSTOMIZADO -->
    <script src="utils/customModal.js"></script>
    <script src="utils/customLoading.js"></script>
    <script src="utils/RESTClient.js"></script>
    <script src="utils/utils.js"></script>
    <script src="viewModel/ConstantsModel.js"></script>
    <script src="viewModel/GerenciaEmpenhoViewModel.js"></script>

</head>
<body>

<div class="container-fluid containerInsideIframe">
    <ul class="collapsible customCard" data-collapsible="accordion">
        <li>
            <div class="collapsible-header ">
                <i class="material-icons">insert_drive_file</i>
                Empenho
            </div>
            <div class="collapsible-body no-padding">
                <br>
                <!-- FORMULARIO CADASTRA EMPENHO -->
                <div class="row">
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputIdContrato" maxlength="20" id="inputIdContrato"
                               placeholder="Selecione" required readonly>
                        <label>Nº Contrato</label>
                    </div>
                    <div class="input-field col s12 m4">
                        <input type="text" name="inputIdFonteRecurso" maxlength="80" id="inputIdFonteRecurso"
                               placeholder="Selecione" required readonly>
                        <label>Fonte do Recurso</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputNumero" maxlength="20" id="inputNumero" required>
                        <label>Número</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputAno" maxlength="4" id="inputAno" required>
                        <label>Ano</label>
                    </div>
                    <div class="input-field col s12 m3">
                        <input type="text" name="inputData" maxlength="20" id="inputData" required>
                        <label>Data</label>
                    </div>
                    <div class="input-field col s12 m3">
                        <input type="text" name="inputValor" maxlength="80" id="inputValor" required>
                        <label>Valor</label>
                    </div>
                    <div class="col s12 m2 " style="margin-top: 1.4rem;">
                        <input type="checkbox" id="checkboxIsCancelado" name="checkboxIsCancelado">
                        <label for="checkboxIsCancelado">Cancelado</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 m12">
                        <label class="labelTextArea">Justificativa</label>
                        <textarea class="customTextArea" id="inputJustificativa" name="inputJustificativa"></textarea>
                    </div>
                </div>
                <!-- BOTÃO SALVAR -->
                <div class="row">
                    <!--<div class="col s12 m2 ">
                        <button class="waves-effect waves-light btn btnMax purple lighten-1" name="btnSalvarEmpenho"
                                id="btnResetForm">
                            Limpar
                        </button>
                    </div>-->
                    <div class="col s12 m2 ">
                        <button class="waves-effect waves-light btn btnMax purple lighten-1" name="btnSalvarEmpenho"
                                id="btnSalvarEmpenho">
                            Salvar
                        </button>
                    </div>
                </div>
                <!-- FIM BOTÃO -->
            </div>
        </li>
        <li>
            <div class="collapsible-header active">
                <i class="material-icons">supervisor_account</i>
                Lista Empenho
            </div>
            <div class="collapsible-body no-padding">
                <!-- LISTA EMPENHO -->
                <div class="row">
                    <div class="col s12">
                        <div class="material-table">
                            <div class="table-header">
                                <h5 class="customH5"></h5>
                                <div class="actions">
                                    <a id="btnAddEmpenho" href="#" class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">note_add</i>
                                    </a>
                                    <a id="btnUpdateListaEmpenho" href="#" class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">refresh</i>
                                    </a>
                                    <a id="btnDeleteEmpenhos" href="#" class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">delete</i>
                                    </a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i>
                                    </a>
                                </div>
                            </div>
                            <table id="tableListaEmpenho" class="highlight">
                                <thead>
                                <tr>
                                    <th>
                                        <div class="dataTableCheckBox">
                                            <input id="checkboxListaEmpenhoSelectAll" value="1" type="checkbox">
                                            <label for="checkboxListaEmpenhoSelectAll"></label>
                                        </div>
                                    </th>
                                    <th>Contrato</th>
                                    <th>Número</th>
                                    <th>Ano</th>
                                    <th>Data</th>
                                    <th>Valor</th>
                                    <th>Recurso</th>
                                    <th>Cancelado</th>
                                    <th>Pago</th>
                                    <th>Saldo</th>
                                    <th>Justificativa</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th>01</th>
                                    <th>202</th>
                                    <th>404</th>
                                    <th>2017</th>
                                    <th>14/09/2017</th>
                                    <th>R$ 4.000,00</th>
                                    <th>Royalties</th>
                                    <th>sim</th>
                                    <th>Royalties é uma palavra em inglês que<br>
                                        significa regalia ou privilégio.<br>
                                        Consiste em uma quantia que é paga por<br>
                                        alguém ao proprietário pelo direito de usar,<br>
                                        explorar ou comercializar um produto, obra, terreno,<br>
                                        etc. Esta palavra é o plural de royalty, que significa<br>
                                        realeza.<br>
                                    </th>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- FIM LISTA EMPENHO -->
            </div>
        </li>
    </ul>
</div>

<!-- MODAL CONTRATO -->
<div id="modalContrato" class="customModal">
    <div class="customModalContent ">
        <div class="customModalHeader">
            <span class="customModalCloseBtn"><i class="material-icons">cancel</i></span>
            <h6>Selecione</h6>
        </div>
        <div class="customModalSection">
            <div class="container-fluid">
                <!-- DataTables  -->
                <div class="row">
                    <div class="col s12">
                        <div class="material-table">
                            <div class="table-header">
                                <span class="table-title"></span>
                                <div class="actions">
                                    <div style="display: inline-block">
                                        <select id="selectFiltroStatusContrato">
                                            <option value="0" selected>Aberto</option>
                                            <option value="1">Andamento</option>
                                            <option value="2">Anulado</option>
                                            <option value="3">Concluído</option>
                                            <option value="4">Paralisado</option>
                                            <option value="5">Rescindido</option>
                                        </select>
                                        <label for="selectFiltroStatusContrato"></label>
                                    </div>
                                    <a href="#" class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">refresh</i>
                                    </a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i>
                                    </a>
                                </div>
                            </div>
                            <table id="tableListaContrato" class="highlight">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nº Contrato</th>
                                    <th>Nº Processo</th>
                                    <th>Data Início</th>
                                    <th>Data Fim</th>
                                    <th>Tipo</th>
                                    <th>Status</th>
                                    <th>Valor</th>
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

<!-- MODAL FONTE RECURSO -->
<div id="modalFonteRecurso" class="customModal">
    <div class="customModalContent ">
        <div class="customModalHeader">
            <span class="customModalCloseBtn"><i class="material-icons">cancel</i></span>
            <h6>Selecione</h6>
        </div>
        <div class="customModalSection">
            <div class="container-fluid">
                <!-- DataTables  -->
                <div class="row">
                    <div class="col s12">
                        <div class="material-table">
                            <div class="table-header">
                                <span class="table-title"></span>
                                <div class="actions">
                                    <a href="#" class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">refresh</i>
                                    </a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i>
                                    </a>
                                </div>
                            </div>
                            <table id="tableListaFonteRecurso" class="highlight">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Codigo</th>
                                    <th>Sigla</th>
                                    <th>Descrição</th>
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