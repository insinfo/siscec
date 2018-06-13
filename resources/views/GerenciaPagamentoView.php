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
    <script src="vendor/materialize/0.100.1/js/materialize.js" type="text/javascript"></script>
    <link href="vendor/materialize/0.100.1/css/materialize.css" rel="stylesheet" type="text/css">
    <link href="vendor/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="vendor/limitless/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">

    <!-- Treeview -->
    <script src="vendor/jonmiles-bootstrap-treeview/1.2.0/bootstrap-treeview.min.js"></script>
    <link rel="stylesheet" href="vendor/jonmiles-bootstrap-treeview/1.2.0/bootstrap-treeview.min.css">

    <!-- ESTILO CUSTOMIZADO -->
    <link rel="stylesheet" type="text/css" href="css/loading.css"/>
    <link rel="stylesheet" type="text/css" href="css/customModal.css"/>
    <link rel="stylesheet" type="text/css" href="css/estiloPmro.css"/>
    <link rel="stylesheet" type="text/css" href="/cdn/Assets/css/modernDataTable.css"/>

    <!-- JS CUSTOMIZADO -->
    <script src="utils/customModal.js" type="text/javascript"></script>
    <script src="utils/customLoading.js" type="text/javascript"></script>
    <script src="utils/RESTClient.js" type="text/javascript"></script>
    <script src="utils/utils.js" type="text/javascript"></script>
    <script src="/cdn/utils/ModernDataTable.js" type="text/javascript"></script>

    <script src="viewModel/ConstantsModel.js" type="text/javascript"></script>
    <script src="viewModel/GerenciaPagamentoViewModel.js" type="text/javascript"></script>
</head>
<body>

<div class="container-fluid containerInsideIframe">

    <!-- Filtros da Lista de Pagamento-->
    <div class="row card customCard">
        <div class="col s12 m3">
            <div class="input-field">
                <select id="selectOrderFiltro">
                    <option selected value="DESC">Recentes</option>
                    <option value="ASC">Antigos</option>
                </select>
                <label >Ordenação</label>
            </div>
        </div>
        <div class="col s12 m3">
            <div class="input-field">
                <i class="material-icons inputSufix clearInput">clear</i>
                <input readonly type="text" placeholder="Selecione" id="inputSecretariaFiltro" name="inputSecretariaFiltro" >
                <label >Secretária</label>
            </div>
        </div>
        <div class="col s12 m3">
            <div class="input-field">
                <select id="selectPagoFiltro">
                    <option selected value="null">Todos</option>
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                </select>
                <label >Pago</label>
            </div>
        </div>
        <div class="col s12 m2">
            <div class="input-field">
                <button id="btnBuscar" class="waves-effect waves-light btn btnMax purple lighten-1 no-padding" >
                    Buscar
                </button>
            </div>
        </div>


    </div>
    <!-- /Filtros da Lista de Pagamento-->

    <div class="card customCard customCardPadding20">
        <div class="modernDataTable ">
            <table id="tableListaMedicao">
                <thead>
                <tr>
                    <th>Organograma</th>
                    <th>Objeto</th>
                    <th>Nº Contrato</th>
                    <th>Início Medição</th>
                    <th>Fim Medição</th>
                    <th>Total Medição</th>
                    <th>Pago</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>

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