<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="Gerencia Pessoas" content="">
    <title>Gerencia Pessoas</title>

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
    <script src="viewModel/GerenciaPessoaViewModel.js"></script>
</head>
<body>
<div class="container-fluid containerInsideIframe">
    <!-- TAB CONTROL PESSOA FISICA/JURIDICA -->
    <div class="row">
        <div class="col s12">
            <ul class="tabs ">
                <li class="tab col s3 ">
                    <a class="active" href="#tabPessoaFisica">Pessoa Física</a>
                </li>
                <li class="tab col s3">
                    <a href="#tabPessoaJuridica">Pessoa Jurídica</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="row" id="tabPessoaFisica">
        <div class="col s12">
            <div class="card material-table">
                <div class="table-header">
                    <span class="table-title">Pessoas Física</span>
                    <div class="actions">
                        <a id="btnAddPessoaFisica" href="#"
                           class="waves-effect btn-flat nopadding">
                            <i class="material-icons">person_add</i>
                        </a>
                        <a id="btnUpdatePessoaFisica" href="#"
                           class="waves-effect btn-flat nopadding">
                            <i class="material-icons">refresh</i>
                        </a>
                        <a id="btnDeletePessoaFisica" href="#"
                           class="waves-effect btn-flat nopadding">
                            <i class="material-icons">delete</i>
                        </a>
                        <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                            <i class="material-icons">search</i>
                        </a>
                    </div>
                </div>
                <table id="tablePessoaFisica" class="striped">
                    <thead>
                    <tr>
                        <th>
                            <div class="dataTableCheckBox">
                                <input id="pessoaFisicaSelectAll" value="1" type="checkbox">
                                <label for="pessoaFisicaSelectAll"></label>
                            </div>
                        </th>
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

    <div class="row" id="tabPessoaJuridica">
        <div class="col s12">
            <div class="card material-table">
                <div class="table-header">
                    <span class="table-title">Pessoas Jurídica</span>
                    <div class="actions">
                        <a id="btnAddPessoaJuridica" href="#"
                           class="waves-effect btn-flat nopadding">
                            <i class="material-icons">person_add</i></a>
                        <a id="btnUpdatePessoaJuridica" href="#"
                           class="waves-effect btn-flat nopadding">
                            <i class="material-icons">refresh</i></a>
                        <a id="btnDeletePessoaJuridica" href="#"
                           class="waves-effect btn-flat nopadding">
                            <i class="material-icons">delete</i></a>
                        <a href="#" class="search-toggle waves-effect btn-flat nopadding">
                            <i class="material-icons">search</i>
                        </a>
                    </div>
                </div>
                <table id="tablePessoaJuridica" class="striped">
                    <thead>
                    <tr>
                        <th>
                            <div class="dataTableCheckBox">
                                <input class="dataTableCheckBox" id="pessoaJuridicaSelectAll" value="1" type="checkbox">
                                <label for="pessoaJuridicaSelectAll"></label>
                            </div>
                        </th>
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
<!--modal gerencia pessoa -->
<div id="gerenciaPessoaModal" class="animatedModalContainer">

    <div class="modal-content">
        <!--modal content -->
        <div class="container-fluid">

            <!-- TAB CONTROL PESSOA FISICA/JURIDICA MODAL-->
            <div class="row">
                <div class="col s12 m6 no-padding">
                    <ul class="tabs ">
                        <li class="tab col s12 m6">
                            <a  href="#tabPessoaFisicaModal" name="btnTabPessoaFisica">Pessoa Física</a>
                        </li>
                        <li class="tab col s12 m6">
                            <a href="#tabPessoaJuridicaModal" name="btnTabPessoaJuridica">Pessoa Jurídica</a>
                        </li>
                    </ul>
                </div>
                <div class="col s12 m6 no-padding">
                    <ul class="tabs removeIndicator">
                        <li class="tab col s12 m6">
                            <a href="#" class="animatedModalCloseBtn">Voltar</a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- DADOS PESSOA -->
            <div class="card customCard">

                <div class="row">
                    <input type="hidden" name="tipoPessoa" value="Fisica" id="tipoPessoa">
                    <input type="hidden" name="idPessoa" value="" id="idPessoa">

                    <div class="input-field col s12 m4">
                        <input type="text" name="nomePessoa" maxlength="50" id="nomePessoa" required>
                        <label for="nomePessoa">Nome</label>

                    </div>
                    <div class="input-field col s12 m4">
                        <input type="email" name="emailPrincipal" maxlength="50" id="emailPrincipal" required>
                        <label>Email Principal</label>

                    </div>
                    <div class="input-field col s12 m4">
                        <input type="text" name="emailAdicional" maxlength="50" id="emailAdicional">
                        <label>Email Adicional</label>
                    </div>
                </div>

                <!-- TAB PESSOA FISICA -->
                <div id="tabPessoaFisicaModal" class="row">
                    <div class="input-field col s12 m3">
                        <select name="paisNacionalidade">
                            <option selected disabled>Pais Nacionalidade</option>
                            <option>Brasil</option>
                        </select>
                        <label class="hiddenLabel">Nacionalidade</label>
                    </div>
                    <div class="input-field col s12 m3" id="dataNascimentoGroup">
                        <input type="text"  name="dataNascimento">
                        <label>Data de Nascimento</label>
                    </div>
                    <div class="input-field col s12 m3">
                        <select name="sexo" id="sexo">
                            <option value="" selected disabled>Sexo</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Masculino">Masculino</option>
                        </select>
                        <label class="hiddenLabel">Sexo</label>
                    </div>
                    <div class="input-field col s12 m3" >
                        <input type="text" name="cpf" maxlength="14" >
                        <label>CPF</label>
                    </div>
                    <div class="input-field col s12 m3">
                        <input  type="text" name="rg" maxlength="50" id="rg">
                        <label>RG</label>
                    </div>
                    <div class="input-field col s12 m3" id="dataEmissaoGroup">
                        <input type="text" name="dataEmissao" id="dataEmissao">
                        <label>Data de Emissão</label>
                    </div>
                    <div class="input-field col s12 m3">
                        <input type="text" name="orgaoEmissor" id="orgaoEmissor">
                        <label>Orgão Emissor</label>
                    </div>
                    <div class="input-field col s12 m3">
                        <select name="ufOrgaoEmissor">
                            <option selected disabled>Estado de Emisão</option>
                            <option>Rio de Janeiro</option>
                        </select>
                        <label></label>
                    </div>
                </div><!-- FIM TAB PESSOA FISICA -->

                <!-- TAB PESSOA JURIDICA -->
                <div id="tabPessoaJuridicaModal" class="row">
                    <div class="input-field col s12 m4">
                        <input  type="text"  name="nomeFantasia" id="nomeFantasia">
                        <label>Nome Fantasia</label>
                    </div>
                    <div class="input-field col s12 m4">
                        <input type="text"  name="cnpj" id="cnpj">
                        <label>CNPJ</label>
                    </div>
                    <div class="input-field col s12 m4">
                        <input type="text"  name="inscricaoEstadual" id="inscricaoEstadual">
                        <label>Inscrição Estadual</label>
                    </div>
                </div><!-- FIM TAB PESSOA JURIDICA -->

            </div>

            <!-- BLOCO TELEFONES -->
            <div class="card customCard">
                <div class="row" id="telefoneBlock">
                    <div id="telefoneItem0" class="telefoneItem">
                        <div class="input-field col s12 m2">
                            <select name="tipoTelefone">
                                <option selected disabled>Tipo</option>
                                <option value="Residencial">Residencial</option>
                                <option value="Comercial">Comercial</option>
                                <option value="Móvel">Móvel</option>
                                <option value="Outro">Outro</option>
                            </select>
                            <label></label>
                        </div>
                        <div class="input-field col s12 m2">
                            <input type="tel" name="numeroTelefone">
                            <label>Telefone</label>
                        </div>
                    </div>
                </div>
            </div>
            <!-- FIM BLOCO TELEFONES -->

            <!-- BLOCO ENDERECOS -->
            <div id="enderecoBlock">
                <div id="enderecoItem0" class="enderecoItem card customCard">
                    <div class="row">
                        <div class="input-field col s12 m2">
                            <input name="cep" type="text" maxlength="8" minlength="8" onfocus="preventsLetter(this)">
                            <label>CEP</label>
                        </div>
                        <div class="input-field col ">
                            <button class="waves-effect waves-light btn purple lighten-1" type="button"
                                    name="btnBuscarEndereco">
                                Preencher
                            </button>
                            <button class="waves-effect waves-light btn purple lighten-1 " type="button"
                                    name="btnShowModalBuscaCEP">
                                Buscar CEP
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12 m3">
                            <select name="tipoEndereco">
                                <option selected disabled>Tipo de Endereço</option>
                                <option value="Residencial">Residencial</option>
                                <option value="Comercial">Comercial</option>
                            </select>
                            <label>Tipo Endereco</label>
                        </div>
                        <div class="input-field col s12 m3">
                            <select name="pais">
                                <option value="" selected disabled>País</option>
                            </select>
                            <label>País</label>
                        </div>
                        <div class="input-field col s12 m3">
                            <select name="uf">
                                <option value="" selected disabled>Estado</option>
                                <option value="">Rio de Janeiro</option>
                                <option value="">Brasilia</option>
                            </select>
                            <label>UF</label>
                        </div>
                        <div class="input-field col s12 m3">
                            <select name="municipio">
                                <option value="" selected disabled>Município</option>
                            </select>
                            <label>Município</label>
                        </div>
                        <div class="input-field col s12 m3">
                            <input name="bairro" type="text" maxlength="70" onfocus='preventsNumber(this)'>
                            <label>Bairro</label>
                        </div>
                        <div class="input-field col s12 m2">
                            <select name="tipoLogradouro">
                                <option value="" selected disabled>Tipo Logradouro</option>
                                <option value="Rua">Rua</option>
                                <option value="Avenida">Avenida</option>
                                <option value="Beco">Beco</option>
                                <option value="Estrada">Estrada</option>
                                <option value="Praça">Praça</option>
                                <option value="Rodovia">Rodovia</option>
                                <option value="Travessa">Travessa</option>
                                <option value="Largo">Largo</option>
                            </select>
                            <label>Tipo Logradouro</label>
                        </div>
                        <div class="input-field col s12 m3">
                            <input type="text"  name="logradouro">
                            <label>Logradouro</label>
                        </div>

                        <div class="input-field col s12 m1">
                            <input  name="numeroLogradouro" type="text" maxlength="10"
                                   onfocus='preventsLetter(this)'>
                            <label>Número</label>
                        </div>
                        <div class="input-field col s12 m3">
                            <input type="text"  name="complemento" maxlength="70">
                            <label>Complemento</label>
                        </div>
                        <input type="hidden" name="validacao" value="false"/>
                    </div>
                    <div class="row">
                        <div class="col switch">
                            <label>
                                <input name="divergente" value="false" onclick="$(this).val(this.checked ? 'true' : 'false')" type="checkbox" />
                                <span class="lever"></span>
                                Marque aqui caso o endereço dos correios seja divergente
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <!-- FIM BLOCO ENDERECOS -->

            <!-- BOTÃO SALVAR -->
            <div class="row">
                <div class="col s12 m2 offset-m5">
                    <button class="waves-effect waves-light btn btnMax purple lighten-1" name="salvar"  id="btnSalvar">
                        Salvar
                    </button>
                </div>
            </div>
            <!-- FIM BOTÃO SALVAR -->


            <!-- INICIO BOTOES FLUTUANTES -->
            <div id="floatingActionsBtns" class="fixed-action-btn" >
                <a class="btn-floating btn-large purple darken-4">
                    <i class="large waves-effect waves-light material-icons">
                        playlist_add
                    </i>
                </a>
                <ul>
                    <li>
                        <a id="btnAddTelefone" class="btn-floating waves-effect waves-light purple tooltipped" data-position="left" data-delay="50" data-tooltip="Adicionar Outro Telefone">
                            <i class="material-icons">
                                phone
                            </i>
                        </a>
                    </li>
                    <li>
                        <a id="btnRemoveTelefone" class="btn-floating waves-effect waves-light darken-1 purple tooltipped" data-position="left" data-delay="50" data-tooltip="Remover Telefone">
                            <i class="material-icons">
                                phone_forwarded
                            </i>
                        </a>
                    </li>
                    <li>
                        <a id="btnAddEndereco" class="btn-floating waves-effect waves-light purple darken-2 tooltipped" data-position="left" data-delay="50" data-tooltip="Adicionar Outro Endereço">
                            <i class="material-icons">
                                add_location
                            </i>
                        </a>
                    </li>
                    <li>
                        <a id="btnRemoveEndereco" class="btn-floating waves-effect waves-light purple darken-3 tooltipped" data-position="left" data-delay="50" data-tooltip="Remover Endereço">
                            <i class="material-icons">
                                place
                            </i>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- FIM BOTOES FLUTUANTES -->

        </div><!-- FIM CONTAINER -->
        <!-- fim modal content -->
    </div>
</div>

<!-- MODAL BUSCA CEP -->
<div id="modalCEP" class="customModal">
    <div class="customModalContent ">
        <div class="customModalHeader">
            <span class="customModalCloseBtn"><i class="material-icons">cancel</i></span>
            <h6 class="">Busca CEP</h6>
        </div>
        <div class="customModalSection">
            <div class="container-fluid">
                <div class="row">
                    <div class="input-field col s12 m3">
                        <select name="ufBuscaCEP">
                            <option value="" selected>UF</option>
                        </select>
                    </div>
                    <div class="input-field col s12 m3">
                        <select name="municipioBuscaCEP">
                            <option value="" selected>Municipio</option>
                        </select>
                    </div>
                    <div class="input-field col s12 m3">
                        <input type="text" name="bairroBuscaCEP">
                        <label>Bairro</label>
                    </div>
                    <div class="input-field col s12 m3">
                        <input type="text" name="logradouroBuscaCEP">
                        <label>Logradouro</label>
                    </div>
                    <div class="input-field col s12 m3">
                        <button class="waves-effect waves-light btn purple lighten-1" id="btnProcurarCEP">
                            Procurar
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col s12">
                        <div class=" material-table">
                            <table id="tableResultsCorreios" style="display: none" cellspacing="0" width="100%">
                                <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Logradouro</th>
                                    <th>Complemento</th>
                                    <th>Bairro</th>
                                    <th>Localidade</th>
                                    <th>UF</th>
                                    <th>CEP</th>
                                </tr>
                                </thead>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
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