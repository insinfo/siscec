<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="Gerencia Medições" content="">
    <title>Gerencia Medições</title>

    <!-- DEPENDENCIAS DE TERCEIROS -->
    <!-- Jquery -->
    <script src="vendor/jquery/3.2.1/jquery.min.js"></script>

    <!-- Materialize -->
    <script src="vendor/materialize/0.100.1/js/materialize.js"></script>
    <link rel="stylesheet" href="vendor/materialize/0.100.1/css/materialize.css">
    <link rel="stylesheet" href="vendor/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="vendor/limitless/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">

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
    <link rel="stylesheet" type="text/css" href="css/modernDataTable.css"/>

    <!-- JS CUSTOMIZADO -->
    <script src="utils/customModal.js"></script>
    <script src="utils/customLoading.js"></script>
    <script src="utils/RESTClient.js"></script>
    <script src="utils/utils.js"></script>
    <!--<script type="text/javascript" src="js/utils/ModernDataTable.js"></script>-->
    <script type="text/javascript" src="/cdn/utils/ModernDataTable.js"></script>

    <script src="viewModel/ConstantsModel.js"></script>
    <script src="viewModel/GerenciaMedicaoViewModel.js"></script>
</head>
<body>

<div class="container-fluid containerInsideIframe">
    <ul class="collapsible customCard" data-collapsible="accordion">
        <li>
            <div class="collapsible-header active">
                <i class="material-icons">local_atm</i>
                Medição
            </div>
            <div class="collapsible-body no-padding">
                <br>
                <!-- FORMULARIO EDITAR MEDIÇÃO -->
                <div class="row">
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputIdContratoMedicao" maxlength="50" id="inputIdContratoMedicao"
                               placeholder="Selecione" required tabindex="">
                        <label>Nº Contrato</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputDataInicioMedicao" maxlength="50" id="inputDataInicioMedicao"
                               required tabindex="">
                        <label>Data Inicio</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputDataFimMedicao" maxlength="50" id="inputDataFimMedicao"
                               required tabindex="">
                        <label>Data Fim</label>
                    </div>
                    <div class="col s12 m1 " style="margin-top: 1.4rem;">
                        <input type="checkbox" id="checkboxIsPagoMedicao" name="checkboxIsPagoMedicao" disabled
                               tabindex="">
                        <label for="checkboxIsPagoMedicao">Pago</label>
                    </div>
                    <div class="input-field col s12 m3 no-padding">
                        <a class="waves-effect waves-light btn purple lighten-1" name="btnAddFormParcela"
                           id="btnAddFormParcela" tabindex="">
                            <i class="material-icons left">add</i>
                            Ad. parcela
                        </a>
                    </div>

                </div>

                <!-- LISTA PARCELA -->
                <div class="row">
                    <div class="col s12">
                        <div class="modernDataTable ">
                            <table id="tableListaParcela">
                                <thead>
                                <tr>
                                    <th>Empenho</th>
                                    <th>Valor</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- FIM LISTA PARCELAS -->

                <div class="row">
                    <div class="input-field col s12 m2 offset-l5 no-padding">
                        <a class="waves-effect waves-light btn btnMax purple lighten-1" name="btnSalvarMedicao"
                           id="btnSalvarMedicao">
                            Salvar
                        </a>
                    </div>
                </div>

            </div>
        </li>
        <li>
            <div class="collapsible-header ">
                <i class="fa fa-file-text" style="font-size: 1.3em;"></i>
                Lista Medições
            </div>
            <div class="collapsible-body no-padding">
                <br>
                <div class="row">
                    <div class="col s12">
                        <div class="modernDataTable ">
                            <table id="tableListaMedicao" class="centered">
                                <thead>
                                <tr>
                                    <th>Nº Contrato</th>
                                    <th>Data Início</th>
                                    <th>Data Fim</th>
                                    <th>Pago</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div>

<!-- MODAL CONTRATO -->
<div id="modalContrato" class="customModal">
    <div class="customModalContent ">
        <div class="customModalHeader">
            <span class="customModalCloseBtn"><i class="material-icons">cancel</i></span>
            <h6>Selecione o Contrato</h6>
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

<!-- MODAL EMPENHO -->
<div id="modalEmpenho" class="customModal">
    <div class="customModalContent ">
        <div class="customModalHeader">
            <span class="customModalCloseBtn"><i class="material-icons">cancel</i></span>
            <h6>Selecione</h6>
        </div>
        <div class="customModalSection">
            <div class="container-fluid">

                <!-- LISTA EMPENHO -->
                <div class="row">
                    <div class="col s12">
                        <div class="material-table">
                            <div class="table-header">
                                <h5 class="customH5"></h5>
                                <div class="actions">

                                    <a id="btnUpdateListaEmpenho" href="#" class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">refresh</i>
                                    </a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i>
                                    </a>
                                </div>
                            </div>
                            <table id="tableListaEmpenho" class="highlight centered">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Contrato</th>
                                    <th>Número</th>
                                    <th>Ano</th>
                                    <th>Data</th>
                                    <th>Recurso</th>
                                    <th>Cancelado</th>
                                    <th>Valor</th>
                                    <th>Pago</th>
                                    <th>Saldo</th>
                                    <th>Justificativa</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th>1</th>
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