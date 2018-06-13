<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="Modal" content="">
    <title>Modal</title>

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
    <script>
    $(document).ready(function () {
        $('.modal').modal();
    });
    </script>

</head>
<body>
<div class="container-fluid containerInsideIframe">

    <div class="row">
        <div class="col s12 m12 l12 xl12">
            <a class="waves-effect waves-light btn modal-trigger" href="#modal">Modal</a>
        </div>
    </div>

</div>

<!-- Modal Structure -->
<div id="modal" class="modal" style="width: 40%;">
    <div class="modal-content backgroundTopModal">
        <!--<button type="button" class="close" data-dismiss="modal">×</button>-->
        <h6>Modal Header</h6>
    </div>
    <div class="modal-content">
        <p>Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.</p>
    </div>
    <div class="modal-footer">
        <a href="#" class="modal-action modal-close waves-effect waves-gray btn-flat">Cancelar</a>
        <a href="#" class="modal-action modal-close waves-effect waves-gray btn-flat">Ignorar</a>
        <a href="#" class="modal-action modal-close waves-effect waves-gray btn backgroundBtn">Salvar</a>
    </div>
</div>

</body>
</html>