<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="Gerencia Pessoas" content="">
    <title>Gerencia Fiscal</title>

    <!-- DEPENDENCIAS DE TERCEIROS-->
    <!-- Jquery -->
    <script src="vendor/jquery/3.2.1/jquery.min.js"></script>
    <!-- Materialize -->
    <script src="vendor/materialize/0.100.1/js/materialize.js"></script>
    <link rel="stylesheet" href="vendor/materialize/0.100.1/css/materialize.css">

    <!-- Animate Modal -->
    <link rel="stylesheet" href="vendor/animatedModal/1.0/animate.min.css">
    <script src="vendor/animatedModal/1.0/animatedModal.js"></script>
    <!-- DataTables -->
    <script type="application/javascript" src="vendor/dataTables/1.10.16/datatables.js"></script>
    <script type="application/javascript" src="vendor/dataTables/1.10.16/material-design-dataTables.js"></script>

    <!-- mCustomScrollbar -->
    <link rel="stylesheet" href="vendor/mCustomScrollbar/3.1.5/jquery.mCustomScrollbar.css">
    <script src="vendor/mCustomScrollbar/3.1.5/jquery.mCustomScrollbar.js"></script>

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
    <script src="viewModel/GerenciaFiscalViewModel.js"></script>
</head>
<body>
<div class="container-fluid">

    <ul class="collapsible customCard" data-collapsible="accordion">
        <!-- CADASTRO DE USUÁRIO -->
        <li>
            <div class="collapsible-header">
                <i class="material-icons">insert_drive_file</i>
                Cadastro de Fiscal
            </div>
            <div class="collapsible-body no-padding">
                <br>
                <!-- DADOS USUARIO -->
                <div class="row">
                    <div class="col s12">
                        <h5 class="customH5"></h5>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m3 l3 xl2">
                        <input type="text" name="inputIdControle" maxlength="20" id="inputIdControle" required>
                        <label>Nº Controle</label>
                    </div>
                    <div class="input-field col s12 m9 l6 xl4">
                        <input type="text" name="inputNomeFiscal" maxlength="50" id="inputNomeFiscal"
                               placeholder="Selecione"
                               required>
                        <label>Nome</label>
                    </div>
                    <div class="input-field col s12 m3 l3 xl2">
                        <input type="text" name="inputMatricula" maxlength="50" id="inputMatricula" required>
                        <label>Matrícula</label>
                    </div>
                    <div class="input-field col s12 m3 l3 xl1">
                        <input type="text" name="inputNumeroPortaria" maxlength="50" id="inputNumeroPortaria"
                               required>
                        <label>Nº Portaria</label>
                    </div>
                    <div class="input-field col s12 m3 l3 xl1">
                        <input type="text" name="inputAnoPortaria" maxlength="50" id="inputAnoPortaria" required>
                        <label>Ano Portaria</label>
                    </div>
                    <div class="input-field col s12 m3 l3 xl2">
                        <input type="text" name="inputDataPortaria" maxlength="50" id="inputDataPortaria" required>
                        <label>Data Portaria</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 m4"></div>
                    <div class="input-field col s12 m4">
                        <a href="#" class="btn waves-effect waves-light col s12 purple lighten-1" id="btnSalvarFiscal">Cadastrar</a>
                    </div>
                </div>
            </div>
        </li>
        <!-- USUÁRIOS SISCEC -->
        <li>
            <div class="collapsible-header active">
                <i class="material-icons">supervisor_account</i>
                Fiscais
            </div>
            <div class="collapsible-body no-padding">
                <br>
                <div class="row">
                    <div class="col s12">
                        <div class="material-table">
                            <div class="table-header">
                                <div class="actions">
                                    <a id="btnAddFiscal" href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">person_add</i></a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i>
                                    </a>
                                </div>
                            </div>
                            <table id="tableUsuarioSistema">
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
            </div>
        </li>
        <!-- CADASTRO DE CONTRATOS -->
    </ul>

</div>

<!-- MODAL PESSOA FÍSICA -->
<div id="modalPessoaFisica" class="customModal">
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

</body>
</html>