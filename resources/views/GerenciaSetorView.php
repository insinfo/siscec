<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="Gerencia Pessoas" content="">
    <title>Gerencia Setor</title>

    <!-- DEPENDENCIAS DE TERCEIROS-->
    <!-- Jquery -->
    <script src="vendor/jquery/3.2.1/jquery.min.js"></script>
    <!-- Materialize -->
    <script src="vendor/materialize/0.100.1/js/materialize.js"></script>
    <link rel="stylesheet" href="vendor/materialize/0.100.1/css/materialize.css">
    <link rel="stylesheet" href="vendor/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- Animate Modal -->
    <link rel="stylesheet" href="vendor/animatedModal/1.0/animate.min.css">
    <script src="vendor/animatedModal/1.0/animatedModal.js"></script>
    <!-- Treeview -->
    <script src="vendor/jonmiles-bootstrap-treeview/1.2.0/bootstrap-treeview.min.js"></script>
    <link rel="stylesheet" href="vendor/jonmiles-bootstrap-treeview/1.2.0/bootstrap-treeview.min.css">
    <!-- DataTables -->
    <script type="application/javascript" src="vendor/dataTables/1.10.16/datatables.js"></script>
    <script type="application/javascript" src="vendor/dataTables/1.10.16/material-design-dataTables.js"></script>

    <!-- mCustomScrollbar -->
    <link rel="stylesheet" href="vendor/mCustomScrollbar/3.1.5/jquery.mCustomScrollbar.css">
    <script src="vendor/mCustomScrollbar/3.1.5/jquery.mCustomScrollbar.js"></script>

    <!-- jQuery Masked Input Plugin Josh Bush (digitalbush.com) -->
    <script src="vendor/jquery.maskedinput/1.4.1/jquery.maskedinput.js"></script>

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
    <script src="viewModel/CadastraControleViewModel.js"></script>
</head>
<body>
<div class="container-fluid containerInsideIframe">

    <ul class="collapsible customCard" data-collapsible="accordion">
        <li>
            <div class="collapsible-header">
                <i class="material-icons">insert_drive_file</i>
                Cadastro Setor
            </div>
            <div class="collapsible-body no-padding">
                <br>
                <!-- FORMULARIO CADASTRA CONTROLE -->
                <div class="row">
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputSiglaSetor" maxlength="20" id="inputSiglaSetor" required>
                        <label>Sigla</label>
                    </div>
                    <div class="input-field col s12 m8">
                        <input type="text" name="inputNomeSetor" maxlength="50" id="inputNomeSetor" required>
                        <label>Nome</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputDataInicio" maxlength="50" id="inputDataInicio" required>
                        <label>Data Início</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="checkbox" id="eOficial" name="eOficial" checked><label for="eOficial">É
                            Oficial?</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="checkbox" id="ativo" name="ativo" checked><label for="ativo">Ativo</label>
                    </div>
                    <div class="input-field col s12 m8">
                        <input type="text" name="inputSetor" maxlength="50" id="inputSetor" placeholder="Selecione">
                        <label for="inputSetor">Setor Pai</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputNumeroLei" maxlength="50" id="inputNumeroLei">
                        <label>Número Lei</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputDataLei" maxlength="50" id="inputDataLei">
                        <label>Ano Lei</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputNumeroDiario" maxlength="50" id="inputNumeroDiario">
                        <label>Número do Diário</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputDataDiario" maxlength="50" id="inputDataDiario">
                        <label>Data do Diário</label>
                    </div>
                    <div class="input-field col s12 m4">
                        <select name="selectModalidade" id="selectModalidade">
                            <option value="" selected disabled>Selecione</option>
                            <option value="amarelo" data-icon="img/cores/cor-amarelo.png" class="left circle">Amarelo
                            </option>
                            <option value="azul" data-icon="img/cores/cor-azul.png" class="left circle">Azul</option>
                            <option value="azul" data-icon="img/cores/cor-cinza.png" class="left circle">Cinza</option>
                            <option value="laranja" data-icon="img/cores/cor-laranja.png" class="left circle">Laranja
                            </option>
                            <option value="verde" data-icon="img/cores/cor-verde.png" class="left circle">Verde</option>
                            <option value="vermelho" data-icon="img/cores/cor-vermelho.png" class="left circle">
                                Vermelho
                            </option>
                            <option value="preto" data-icon="img/cores/cor-preto.png" class="left circle">Preto</option>
                            <option value="roxo" data-icon="img/cores/cor-rosa.png" class="left circle">Rosa</option>
                            <option value="roxo" data-icon="img/cores/cor-roxo.png" class="left circle">Roxo</option>
                        </select>
                        <label for="selectModalidade">Cor da Secretaria</label>
                    </div>
                </div>
                <!-- BOTÃO SALVAR CONTROLE -->
                <div class="row">
                    <div class="col s12 m2 offset-m5">
                        <button class="waves-effect waves-light btn btnMax purple lighten-1" name="btnSalvarSetor"
                                id="btnSalvarSetor">
                            Cadastrar Setor
                        </button>
                    </div>
                </div>
                <!-- FIM BOTÃO SALVAR CONTROLE -->
            </div>
        </li>
        <li>
            <div class="collapsible-header active">
                <i class="material-icons">supervisor_account</i>
                Lista Setor
            </div>
            <div class="collapsible-body no-padding">
                <!-- FIM BOTÃO SALVAR FISCAL -->
                <!-- LISTA FISCAL -->
                <div class="row">
                    <div class="col s12">
                        <div class="material-table">
                            <div class="table-header">
                                <h5 class="customH5"></h5>
                                <div class="actions">
                                    <a id="btnAddPessoaFisica" href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">person_add</i></a>
                                    <a id="btnUpdatePessoaFisica" href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">refresh</i></a>
                                    <a id="btnDeletePessoaFisica" href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">delete</i></a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i></a>
                                </div>
                            </div>
                            <table id="tablePessoaFisica" class="striped">
                                <thead>
                                <tr>
                                    <th>Cor</th>
                                    <th>Sigla</th>
                                    <th>Nome</th>
                                    <th>Data Início</th>
                                    <th>Lei</th>
                                    <th>Diário</th>
                                    <th>Oficial</th>
                                    <th>Ativo</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th><span class="setorCorAzul"></span></th>
                                    <th>COTINF</th>
                                    <th>Coordenadoria de Tecnologia da Informação</th>
                                    <th>02/01/2017</th>
                                    <th>007/2017</th>
                                    <th>001/2017</th>
                                    <th>
                                        <div class="dataTableCheckBox">
                                            <input id="checkOficial" value="1" type="checkbox" checked disabled>
                                            <label for="checkOficial"></label>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="dataTableCheckBox">
                                            <input id="checkAtivo" value="1" type="checkbox" checked disabled>
                                            <label for="checkAtivo"></label>
                                        </div>
                                    </th>
                                </tr>
                                <tr>
                                    <th><span class="setorCorLaranja"></span></th>
                                    <th>SUBTUR</th>
                                    <th>Subsecretaria Municipal de Turismo</th>
                                    <th>02/01/2011</th>
                                    <th>002/2011</th>
                                    <th>001/2011</th>
                                    <th>
                                        <div class="dataTableCheckBox">
                                            <input id="checkOficial" value="1" type="checkbox" checked disabled>
                                            <label for="checkOficial"></label>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="dataTableCheckBox">
                                            <input id="checkAtivo" value="1" type="checkbox" checked disabled>
                                            <label for="checkAtivo"></label>
                                        </div>
                                    </th>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- FIM LISTA FISCAL -->
            </div>
        </li>

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
                        <input size="55%" class="" type="text" id="inputBuscaSetor">
                        <label class="center-align">Digite nome ou sigla para buscar</label>
                    </div>
                    <div class="input-field col ">
                        <a href="cadastraSetor" class="btn-floating waves-effect waves-light tooltipped"
                           data-position="right" data-delay="50" data-tooltip="Cadastrar Novo Setor">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i>
                            <!--<i class="material-icons" style="font-size: 3rem;">control_point</i>-->
                        </a>
                    </div>
                </div>
                <div id="treeViewSetores"></div>
            </div>
        </div>
    </div>
</div>

<!-- MODAL EMPRESA -->
<div id="modalEmpresa" class="customModal">
    <div class="customModalContent ">
        <div class="customModalHeader">
            <span class="customModalCloseBtn"><i class="material-icons">cancel</i></span>
            <h6>Selecione a Empresa</h6>
        </div>
        <div class="customModalSection">
            <div class="container-fluid">
                <!-- DataTables Empresas -->
                <div class="row">
                    <div class="col s12">
                        <div class="material-table">
                            <div class="table-header">

                                <div class="actions">
                                    <a id="btnAddPessoaJuridica" href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">person_add</i></a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i></a>
                                </div>
                            </div>
                            <table id="tablePessoaJuridica" class="striped">
                                <thead>
                                <tr>
                                    <th>Nome Fantasia</th>
                                    <th>Razão Social</th>
                                    <th>CNPJ</th>
                                    <th>Inscrição Estadual</th>
                                    <th>Data de Inclusão</th>
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
                                    <a id="btnAddPessoaFisica" href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">person_add</i></a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i></a>
                                </div>
                            </div>
                            <table id="tablePessoaJuridica" class="striped">
                                <thead>
                                <tr>
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