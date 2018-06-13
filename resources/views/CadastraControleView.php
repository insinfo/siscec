<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="Gerencia Pessoas" content="">
    <title>Cadastra Controle</title>

    <!-- DEPENDENCIAS DE TERCEIROS -->
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

    <script src="viewModel/ConstantsModel.js"></script>
    <script src="viewModel/CadastraControleViewModel.js"></script>
</head>
<body>
<div class="container-fluid containerInsideIframe">

    <ul class="collapsible customCard" data-collapsible="accordion">
        <!-- CADASTRO DE CONTROLE -->
        <li>
            <div class="collapsible-header active">
                <i class="material-icons">insert_drive_file</i>
                Cadastro de Controle
            </div>
            <div class="collapsible-body no-padding">
                <br>
                <!-- FORMULARIO CADASTRA CONTROLE -->
                <div class="row">
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputNumeroControle" id="inputNumeroControle"
                               value="0001" disabled>
                        <label>Nº Controle</label>
                    </div>
                    <div class="input-field col s12 m6">
                        <input type="text" name="inputSetor" id="inputSetor" placeholder="Selecione"
                               required>
                        <label for="inputSetor">Secretaria / Setor</label>
                    </div>
                    <div class="input-field col s12 m3">
                        <select name="selectModalidade" id="selectModalidade">
                            <option value="" selected disabled>Selecione</option>
                            <option value="0">Serviço Contínuo</option>
                            <option value="1">Tecnológico</option>
                            <option value="2">Outros</option>
                        </select>
                        <label>Modalidade</label>
                    </div>
                    <div class="input-field col s12 m8">
                        <input type="text" name="inputEmpresa" id="inputEmpresa"
                               placeholder="Selecione"
                        >
                        <label>Empresa</label>
                    </div>
                    <div class="input-field col s12 m3">
                        <input type="text" name="inputPrevisaoGasto" id="inputPrevisaoGasto"
                               required>
                        <label>Previsão de Gasto</label>
                    </div>
                    <div class="col s12 m12">
                        <label class="labelTextArea">Objeto</label>
                        <textarea class="customTextArea" id="textAreaObjeto" name="textAreaObjeto"></textarea>
                    </div>
                </div>
                <!-- BOTÃO SALVAR CONTROLE -->
                <div class="row">
                    <div class="col s12 m2 offset-m5">
                        <button class="waves-effect waves-light btn btnMax purple lighten-1" name="btnSalvarControle"
                                id="btnSalvarControle">
                            Cadastrar Controle
                        </button>
                    </div>
                </div>
                <!-- FIM BOTÃO SALVAR CONTROLE -->
            </div>
        </li>
        <!-- CADASTRO DE FISCAL -->
        <li>
            <div class="collapsible-header">
                <i class="material-icons">supervisor_account</i>
                Cadastro de Fiscal
            </div>
            <div class="collapsible-body no-padding">
                <br>
                <!-- FORMULARIO CADASTRA FISCAL -->
                <div class="row">
                    <div class="input-field col s12 m4">
                        <input type="text" name="inputNomeFiscal" id="inputNomeFiscal" placeholder="Selecione" required>
                        <label>Nome</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputMatricula" id="inputMatricula" required>
                        <label>Matrícula</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputNumeroPortaria" id="inputNumeroPortaria" required>
                        <label>Nº Portaria</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputAnoPortaria" id="inputAnoPortaria" required>
                        <label>Ano Portaria</label>
                    </div>
                    <div class="input-field col s12 m2">
                        <input type="text" name="inputDataPortaria" id="inputDataPortaria" required>
                        <label>Data Portaria</label>
                    </div>
                </div>
                <!-- BOTÃO SALVAR FISCAL -->
                <div class="row">
                    <div class="col s12 m2 offset-m5">
                        <button class="waves-effect waves-light btn btnMax purple lighten-1" name="btnSalvarFiscal"
                                id="btnSalvarFiscal">
                            Cadastrar Fiscal
                        </button>
                    </div>
                </div>
                <!-- FIM BOTÃO SALVAR FISCAL -->
                <!-- LISTA FISCAL -->
                <div class="row">
                    <div class="col s12">
                        <div class="material-table">
                            <div class="table-header">
                                <h5 class="customH5">Fiscais</h5>
                                <div class="actions">
                                    <a id="btnUpdateListaFiscal" href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">refresh</i>
                                    </a>
                                    <a id="btnDeleteListaFiscal" href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">delete</i>
                                    </a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i>
                                    </a>
                                </div>
                            </div>
                            <table id="tableListaFiscais">
                                <thead>
                                <tr>
                                    <th>
                                        <div class="dataTableCheckBox">
                                            <input id="checkboxListaFiscalSelectAll" value="1" type="checkbox">
                                            <label for="checkboxListaFiscalSelectAll"></label>
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
        <!-- CADASTRO DE CONTRATOS -->
        <li>
            <div class="collapsible-header">
                <i class="fa fa-file-text" style="font-size: 1.3em;"></i>
                Cadastro de Contrato
            </div>
            <div class="collapsible-body no-padding">
                <br>
                <!-- FORMULARIO CADASTRA CONTRATO -->
                <div class="row">
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
                            Cadastrar Contrato
                        </button>
                    </div>
                </div>
                <!-- FIM BOTÃO SALVAR FISCAL -->
                <div class="row">
                    <div class="col s12">
                        <div class="material-table">
                            <div class="table-header">
                                <h5 class="customH5">Contratos</h5>
                                <div class="actions">
                                    <a href="#" class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">person_add</i>
                                    </a>
                                    <a id="btnUpdateListaContrato" href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">refresh</i>
                                    </a>
                                    <a id="btnDeleteListaContrato" href="#"
                                       class="waves-effect btn-flat nopadding">
                                        <i class="material-icons">delete</i>
                                    </a>
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i>
                                    </a>
                                </div>
                            </div>
                            <table id="tableListaContrato" class="highlight">
                                <thead>
                                <tr>
                                    <th>
                                        <div class="dataTableCheckBox">
                                            <input id="checkboxListaContratoSelectAll" value="1" type="checkbox">
                                            <label for="checkboxListaContratoSelectAll"></label>
                                        </div>
                                    </th>
                                    <th>Nº Processo</th>
                                    <th>Nº Contrato</th>
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
                        <input size="55%" class="" type="text" id="inputModalBuscaSetor">
                        <label class="center-align">Digite nome ou sigla para buscar</label>
                    </div>
                    <div class="input-field col ">

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
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i>
                                    </a>
                                </div>
                            </div>
                            <table id="tablePessoaJuridica" class="responsive-table">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nome Fantasia</th>
                                    <th>Razão Social</th>
                                    <th>CNPJ</th>
                                    <th>Inscrição Estadual</th>
                                    <th>E-mail</th>
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
                                    <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                                        <i class="material-icons">search</i>
                                    </a>
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