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

    <!-- ESTILO CUSTOMIZADO -->
    <link rel="stylesheet" type="text/css" href="css/loading.css"/>
    <link rel="stylesheet" type="text/css" href="css/customModal.css"/>
    <link rel="stylesheet" type="text/css" href="css/estiloPmro.css"/>

    <script src="vendor/gojs/1.8.12/go.js"></script>

    <!-- JS CUSTOMIZADO -->
    <script type="text/javascript" src="utils/customModal.js"></script>
    <script type="text/javascript" src="utils/customLoading.js"></script>
    <script type="text/javascript" src="utils/RESTClient.js"></script>
    <script type="text/javascript" src="utils/utils.js"></script>

    <script src="viewModel/ConstantsModel.js"></script>
    <script src="viewModel/GerenciaPermissaoViewModel.js"></script>

</head>
<body>

<div id="sample">
    <div style="width: 60%; display: flex; justify-content: space-between">
        <div id="myPaletteDiv" style="width: 200px; margin-right: 2px; background-color: whitesmoke; border: solid 1px #bfbfbf"></div>
        <div id="myDiagramDiv" style="flex-grow: 1; height: 500px; border: solid 1px #bfbfbf"></div>
    </div>
</div>
<div>
        <textarea id="textareaModelJson">
{ "class": "go.GraphLinksModel",
  "nodeDataArray": [
{"key":1, "text":"Ciente", "isGroup":true, "category":"OfGroups"},
{"key":2, "text":"Siscec", "isGroup":true, "category":"OfGroups"},
{"key":3, "text":"fabio", "isGroup":true, "category":"OfNodes", "group":1},
{"key":4, "text":"isaque", "isGroup":true, "category":"OfNodes", "group":1},
{"key":5, "text":"alex", "isGroup":true, "category":"OfNodes", "group":2},
{"key":6, "text":"Group D", "isGroup":true, "category":"OfNodes", "group":2},
{"key":7, "text":"Group E", "isGroup":true, "category":"OfNodes", "group":6},
{"text":"first A", "group":3, "key":-7},
{"text":"second A", "group":3, "key":-8},
{"text":"first B", "group":4, "key":-9},
{"text":"second B", "group":4, "key":-10},
{"text":"third B", "group":4, "key":-11},
{"text":"first C", "group":5, "key":-12},
{"text":"second C", "group":5, "key":-13},
{"text":"first D", "group":6, "key":-14},
{"text":"first E", "group":7, "key":-15}
 ],
  "linkDataArray": [  ]}
        </textarea>
</div>


</body>
</html>