<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SISCEC - Sistema de Controle de Execução Contratual - Jubarte</title>

    <!-- FONTES -->
    <link href="//fonts.googleapis.com/css?family=Roboto+Mono|Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
    <link href="vendor/limitless/css/icons/icomoon/styles.css" rel="stylesheet" type="text/css">
    <!-- Estilos do Limitless -->
    <link href="vendor/limitless/css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="vendor/limitless/css/core.css" rel="stylesheet" type="text/css">
    <link href="vendor/limitless/css/components.css" rel="stylesheet" type="text/css">
    <link href="vendor/limitless/css/colors.css" rel="stylesheet" type="text/css">

    <!-- LIBS CORE -->
    <script type="text/javascript" src="vendor/limitless/js/core/libraries/jquery.min.js"></script>
    <script type="text/javascript" src="vendor/limitless/js/core/libraries/bootstrap.min.js"></script>

    <!-- PLUGINS JQUERY -->
    <!--
    <script type="text/javascript" src="vendor/limitless/js/plugins/loaders/blockui.min.js"></script>

    <script type="text/javascript" src="vendor/limitless/js/plugins/visualization/d3/d3.min.js"></script>
    <script type="text/javascript" src="vendor/limitless/js/plugins/visualization/d3/d3_tooltip.js"></script>
    <script type="text/javascript" src="vendor/limitless/js/plugins/forms/styling/switchery.min.js"></script>
    <script type="text/javascript" src="vendor/limitless/js/plugins/forms/styling/uniform.min.js"></script>
    <script type="text/javascript" src="vendor/limitless/js/plugins/forms/selects/bootstrap_multiselect.js"></script>
    <script type="text/javascript" src="vendor/limitless/js/plugins/ui/moment/moment.min.js"></script>
    <script type="text/javascript" src="vendor/limitless/js/plugins/pickers/daterangepicker.js"></script>
    <script type="text/javascript" src="vendor/limitless/js/plugins/ui/headroom/headroom.min.js"></script>
    <script type="text/javascript" src="vendor/limitless/js/plugins/ui/headroom/headroom_jquery.min.js"></script>
    <script type="text/javascript" src="vendor/limitless/js/plugins/ui/nicescroll.min.js"></script>

    <!-- Inicialização dos plugins Limitless -->
    <!--<script type="text/javascript" src="vendor/limitless/js/core/app.js"></script>
    <script type="text/javascript" src="vendor/limitless/js/pages/layout_fixed_custom.js"></script>
    <!--<script type="text/javascript" src="vendor/limitless/js/pages/layout_navbar_hideable_sidebar.js"></script>-->

    <link rel="stylesheet" type="text/css" href="css/loading.css"/>
    <link rel="stylesheet" type="text/css" href="css/estiloPmro.css"/>
    <link rel="stylesheet" type="text/css" href="css/loginPage.css"/>

    <!-- VIEWMODEL DESTA PAGINA -->
    <script type="text/javascript" src="utils/utils.js"></script>
    <script type="text/javascript" src="utils/customLoading.js"></script>
    <script type="text/javascript" src="utils/RESTClient.js"></script>
    <script type="text/javascript" src="/cdn/utils/MenuAPI.js"></script>

    <script type="text/javascript" src="viewModel/ConstantsModel.js"></script>
    <script type="text/javascript" src="viewModel/MainViewModel.js"></script>

</head>

<body class="navbar-top ">

<div id="pageMainView" class="containerCustom">
    <!-- Main navbar -->
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-header">
            <a class="navbar-brand" href="#"><img src="img/logo-siscec-interno.svg" alt="SISCEC - Sistema de Controle de Execução Contratual"></a>

            <ul class="nav navbar-nav visible-xs-block">
                <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
                <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
            </ul>
        </div>

        <div class="navbar-collapse collapse" id="navbar-mobile">
            <ul class="nav navbar-nav">
                <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a>
                </li>
            </ul>

            <!--p class="navbar-text"><span class="label bg-success">Online</span></p-->

            <ul class="nav navbar-nav navbar-right">
                <!--<li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="icon-git-compare"></i>
                        <span class="visible-xs-inline-block position-right">Git updates</span>
                        <span class="badge bg-warning-400">9</span>
                    </a>

                    <div class="dropdown-menu dropdown-content">
                        <div class="dropdown-content-heading">
                            Git updates
                            <ul class="icons-list">
                                <li><a href="#"><i class="icon-sync"></i></a></li>
                            </ul>
                        </div>

                        <ul class="media-list dropdown-content-body width-350">
                            <li class="media">
                                <div class="media-left">
                                    <a href="#"
                                       class="btn border-primary text-primary btn-flat btn-rounded btn-icon btn-sm"><i
                                                class="icon-git-pull-request"></i></a>
                                </div>

                                <div class="media-body">
                                    Drop the IE <a href="#">specific hacks</a> for temporal inputs
                                    <div class="media-annotation">4 minutes ago</div>
                                </div>
                            </li>

                            <li class="media">
                                <div class="media-left">
                                    <a href="#"
                                       class="btn border-warning text-warning btn-flat btn-rounded btn-icon btn-sm"><i
                                                class="icon-git-commit"></i></a>
                                </div>

                                <div class="media-body">
                                    Add full font overrides for popovers and tooltips
                                    <div class="media-annotation">36 minutes ago</div>
                                </div>
                            </li>

                            <li class="media">
                                <div class="media-left">
                                    <a href="#" class="btn border-info text-info btn-flat btn-rounded btn-icon btn-sm"><i
                                                class="icon-git-branch"></i></a>
                                </div>

                                <div class="media-body">
                                    <a href="#">Chris Arney</a> created a new <span class="text-semibold">Design</span>
                                    branch
                                    <div class="media-annotation">2 hours ago</div>
                                </div>
                            </li>

                            <li class="media">
                                <div class="media-left">
                                    <a href="#"
                                       class="btn border-success text-success btn-flat btn-rounded btn-icon btn-sm"><i
                                                class="icon-git-merge"></i></a>
                                </div>

                                <div class="media-body">
                                    <a href="#">Eugene Kopyov</a> merged <span class="text-semibold">Master</span> and <span
                                            class="text-semibold">Dev</span> branches
                                    <div class="media-annotation">Dec 18, 18:36</div>
                                </div>
                            </li>

                            <li class="media">
                                <div class="media-left">
                                    <a href="#"
                                       class="btn border-primary text-primary btn-flat btn-rounded btn-icon btn-sm"><i
                                                class="icon-git-pull-request"></i></a>
                                </div>

                                <div class="media-body">
                                    Have Carousel ignore keyboard events
                                    <div class="media-annotation">Dec 12, 05:46</div>
                                </div>
                            </li>
                        </ul>

                        <div class="dropdown-content-footer">
                            <a href="#" data-popup="tooltip" title="All activity"><i
                                        class="icon-menu display-block"></i></a>
                        </div>
                    </div>
                </li>-->
                <!--<li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="icon-bubbles4"></i>
                        <span class="visible-xs-inline-block position-right">Messages</span>
                        <span class="badge bg-warning-400">2</span>
                    </a>

                    <div class="dropdown-menu dropdown-content width-350">
                        <div class="dropdown-content-heading">
                            Messages
                            <ul class="icons-list">
                                <li><a href="#"><i class="icon-compose"></i></a></li>
                            </ul>
                        </div>

                        <ul class="media-list dropdown-content-body">
                            <li class="media">
                                <div class="media-left">
                                    <img src="vendor/limitless/images/placeholder.jpg" class="img-circle img-sm" alt="">
                                    <span class="badge bg-danger-400 media-badge">5</span>
                                </div>

                                <div class="media-body">
                                    <a href="#" class="media-heading">
                                        <span class="text-semibold">James Alexander</span>
                                        <span class="media-annotation pull-right">04:58</span>
                                    </a>

                                    <span class="text-muted">who knows, maybe that would be the best thing for me...</span>
                                </div>
                            </li>

                            <li class="media">
                                <div class="media-left">
                                    <img src="vendor/limitless/images/placeholder.jpg" class="img-circle img-sm" alt="">
                                    <span class="badge bg-danger-400 media-badge">4</span>
                                </div>

                                <div class="media-body">
                                    <a href="#" class="media-heading">
                                        <span class="text-semibold">Margo Baker</span>
                                        <span class="media-annotation pull-right">12:16</span>
                                    </a>

                                    <span class="text-muted">That was something he was unable to do because...</span>
                                </div>
                            </li>

                            <li class="media">
                                <div class="media-left"><img src="vendor/limitless/images/placeholder.jpg" class="img-circle img-sm"
                                                             alt=""></div>
                                <div class="media-body">
                                    <a href="#" class="media-heading">
                                        <span class="text-semibold">Jeremy Victorino</span>
                                        <span class="media-annotation pull-right">22:48</span>
                                    </a>

                                    <span class="text-muted">But that would be extremely strained and suspicious...</span>
                                </div>
                            </li>

                            <li class="media">
                                <div class="media-left"><img src="vendor/limitless/images/placeholder.jpg" class="img-circle img-sm"
                                                             alt=""></div>
                                <div class="media-body">
                                    <a href="#" class="media-heading">
                                        <span class="text-semibold">Beatrix Diaz</span>
                                        <span class="media-annotation pull-right">Tue</span>
                                    </a>

                                    <span class="text-muted">What a strenuous career it is that I've chosen...</span>
                                </div>
                            </li>

                            <li class="media">
                                <div class="media-left"><img src="vendor/limitless/images/placeholder.jpg" class="img-circle img-sm"
                                                             alt=""></div>
                                <div class="media-body">
                                    <a href="#" class="media-heading">
                                        <span class="text-semibold">Richard Vango</span>
                                        <span class="media-annotation pull-right">Mon</span>
                                    </a>

                                    <span class="text-muted">Other travelling salesmen live a life of luxury...</span>
                                </div>
                            </li>
                        </ul>

                        <div class="dropdown-content-footer">
                            <a href="#" data-popup="tooltip" title="All messages"><i
                                    class="icon-menu display-block"></i></a>
                        </div>
                    </div>
                </li>-->

                <li class="sessionTimeout">
                    <i class="icon-alarm"></i>
                    <span>00:00:00</span>
                </li>
                <li class="">
                    <a id="btnOpenModalBugReport" data-toggle="modal" data-target="#modalBugReport">
                        <i class="icon-bug2"></i>
                    </a>
                </li>
                <li class="dropdown dropdown-user">
                    <a class="dropdown-toggle" data-toggle="dropdown">
                        <span class="userThumbnail"><i>MO</i></span>
                        <span id="spanFullUserName">Leonardo Calheiros</span>
                        <i class="caret"></i>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-right">
                        <!--<li><a href="#"><i class="icon-user-plus"></i> Meu perfil</a></li>
                        <li><a href="#"><span class="badge bg-teal-400 pull-right">58</span> <i
                                class="icon-comment-discussion"></i> Mensages</a></li>
                        <li class="divider"></li>
                        <li><a href="#"><i class="icon-cog5"></i> Configurações</a></li>-->
                        <li><a href="#" id="btnLogout"><i class="icon-switch2"></i> Sair</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <!-- /main navbar -->

    <!-- Page container -->
    <div class="page-container containerCustom">

        <!-- Page content -->
        <div class="page-content containerCustom">

            <!-- Main sidebar -->
            <div class="sidebar sidebar-main sidebar-fixed">
                <div class="sidebar-content">

                    <!-- User menu -->
                    <!--<div class="sidebar-user">
                        <div class="category-content">
                            <div class="media">
                                <a href="#" class="media-left"><img src="vendor/limitless/images/placeholder.jpg"
                                                                    class="img-circle img-sm" alt=""></a>
                                <div class="media-body">
                                    <span class="media-heading text-semibold">Leonardo Calheiros</span>
                                    <div class="text-size-mini text-muted">
                                        <i class="icon-pin text-size-small"></i> &nbsp;Rio das Ostras, RJ
                                    </div>
                                </div>

                                <div class="media-right media-middle">
                                    <ul class="icons-list">
                                        <li>
                                            <a href="#"><i class="icon-cog3"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>-->
                    <!-- /user menu -->

                    <!-- Main navigation -->
                    <div class="sidebar-category sidebar-category-visible">
                        <div class="category-content no-padding">
                            <ul id="sidebarMainMenu" class="navigation navigation-main navigation-accordion">



                            </ul>
                        </div>
                    </div>
                    <!-- /main navigation -->

                </div>
            </div>
            <!-- /main sidebar -->

            <!-- Main content -->
            <div class=" containerCustom">
                <!-- Content area -->
                <iframe id="iframeShowPage" src="" scrolling="no"
                        name="iframeShowPage" class="iframeCustom" allowtransparency="false"></iframe>
            </div>
            <!-- /main content -->
        </div>
        <!-- /page content -->
    </div>
    <!-- /page container -->
</div>

<div id="pageLoginView">
    <div id="formLogin">
        <div class="container">
            <div class="card card-container">
                <div class="row">
                    <div class="col-sm-3 " align="center">
                        <div class="row">
                            <div class="col">
                                <img class="logo" src="img/logoSISCEC.png">
                                <h6 class="bemVindo">Bem Vindo ao</h6>
                                <h1 class="sisName">SISCEC</h1>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4 " align="center">
                        <div class="loginForm">
                            <div class="row">
                                <div class="col">
                                    <div class="right-inner-addon">
                                        <input class="inputCuston" type="text" name="login" id="inputUserName"
                                               placeholder="Usuário">
                                        <i class="fa fa-fw fa-user" id="iconUser"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="right-inner-addon">
                                        <input class="inputCuston" type="password" name="senha" id="inputUserPass"
                                               placeholder="Senha">
                                        <i class="fa fa-fw fa-unlock-alt" id="iconPassword"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <input class="btnCuston" type="submit" value="Login" id="btnLogin">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <!--<a class="recoveryPass" href="#">Esqueceu a senha?</a>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<!-- Modal BUG-REPORT -->
<div id="modalBugReport" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h6 class="modal-title">Reporte Um Problema!</h6>
            </div>

            <div class="modal-body">



            </div>
        </div>
    </div>
</div>
<!-- /primary modal -->

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
