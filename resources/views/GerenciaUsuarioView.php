<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="Gerencia Usuário" content="">
    <title>Gerencia Usuário</title>

    <!-- DEPENDENCIAS DE TERCEIROS-->
    <!-- Jquery -->
    <script src="vendor/jquery/3.2.1/jquery.min.js"></script>

    <!-- Materialize -->
    <script src="vendor/materialize/0.100.1/js/materialize.js"></script>
    <link rel="stylesheet" href="vendor/materialize/0.100.1/css/materialize.css">
    <link rel="stylesheet" href="vendor/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- Treeview -->
    <script src="vendor/jonmiles-bootstrap-treeview/1.2.0/bootstrap-treeview.min.js"></script>
    <link rel="stylesheet" href="vendor/jonmiles-bootstrap-treeview/1.2.0/bootstrap-treeview.min.css">

    <!-- DataTables -->
    <script type="application/javascript" src="vendor/dataTables/1.10.16/datatables.js"></script>
    <script type="application/javascript" src="vendor/dataTables/1.10.16/material-design-dataTables.js"></script>

    <script type="application/javascript" src="vendor/moment/2.19.1/moment.js"></script>

    <!-- ESTILO DOS UTILITARIOS -->
    <link rel="stylesheet" type="text/css" href="css/loading.css"/>
    <link rel="stylesheet" type="text/css" href="css/customModal.css"/>
    <link rel="stylesheet" type="text/css" href="css/estiloPmro.css"/>

    <!-- CLASSES UTILITARIAS -->
    <script src="utils/customModal.js"></script>
    <script src="utils/customLoading.js"></script>
    <script src="utils/RESTClient.js"></script>
    <script src="utils/utils.js"></script>

    <!-- VIEWMODEL -->
    <script src="viewModel/ConstantsModel.js"></script>
    <script src="viewModel/GerenciaUsuarioViewModel.js"></script>
</head>
<body>
<div class="container-fluid containerInsideIframe">

    <ul class="collapsible customCard" data-collapsible="accordion">
        <!-- CADASTRO DE USUÁRIO -->
        <li>
            <div class="collapsible-header active">
                <i class="material-icons">insert_drive_file</i>
                Cadastro de Usuário
            </div>
            <div class="collapsible-body no-padding">
                <br>
                <div>
                    <!-- DADOS USUARIO -->
                    <div class="row ">

                        <div class="input-field col s12 m4">
                            <input  id="inputNome" name="inputNome" type="text" placeholder="Selecione">
                            <label>Nome Completo</label>
                        </div>

                        <div class="input-field col s12 m4">
                            <input type="text" id="inputLogin" name="inputLogin" placeholder="Selecione">
                            <label>Login</label>
                        </div>

                        <div class="input-field col s12 m4">
                            <input type="text" id="inputOrganograma" name="inputOrganograma" placeholder="Selecione">
                            <label>Organograma</label>
                        </div>

                        <div class="input-field col s12 m4">
                            <select id="selectPerfil" name="selectPerfil">
                                <option value="" disabled selected>Selecione</option>
                                <option value="0">Usuário</option>
                                <option value="1">Usuário de Supervisão</option>
                                <option value="2">Administrador</option>
                                <option value="3">Usuário de Visualização</option>
                            </select>
                            <label class="center-align">Perfil</label>
                        </div>

                        <div class="customInputField col s12 m2">
                            <input type="checkbox" id="checkboxAtivo" name="checkboxAtivo" checked/>
                            <label for="checkboxAtivo">Ativo</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 m12 ">
                            <a href="#"  class="btn waves-effect waves-light purple lighten-1" id="btnSalvarUsuario" >Salvar</a>
                        </div>
                    </div>

                </div><!-- CONTAINER -->
            </div>
        </li>
        <!-- USUÁRIOS SISCEC -->
        <li>
            <div class="collapsible-header ">
                <i class="material-icons">supervisor_account</i>
                Usuários SISCEC
            </div>
            <div class="collapsible-body no-padding">
                <br>
                <div class="row">
                    <div class="col s12">
                        <div class="material-table">
                            <div class="table-header">
                                <div class="actions">
                                    <a id="btnAddUsuarioSistema" href="#" class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">person_add</i>
                                    </a>
                                    <a id="btnDeleteUsuarioSistema" href="#" class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">delete</i>
                                    </a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i>
                                    </a>
                                </div>
                            </div>
                            <table id="tableUsuarioSistema">
                                <thead>
                                <tr>
                                    <th>
                                        <div class="dataTableCheckBox">
                                            <input id="tableUsuarioSistemaSelectAll" value="1" type="checkbox">
                                            <label for="tableUsuarioSistemaSelectAll"></label>
                                        </div>
                                    </th>
                                    <th>Nome</th>
                                    <th>Login</th>
                                    <th>Setor</th>
                                    <th>Perfil</th>
                                    <th>Status</th>
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
                                    <a  href="#"
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

<!-- MODAL LOGIN -->
<div id="modalLDAP" class="customModal">
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
                                    <a  href="#"
                                        class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">person_add</i></a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i></a>
                                </div>
                            </div>
                            <table id="tableUsuarioLDAP">
                                <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Login</th>
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