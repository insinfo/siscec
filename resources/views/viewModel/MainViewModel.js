$(document).ready(function () {
    var mainViewModel = new MainViewModel();
    mainViewModel.init();
});

function MainViewModel()
{
    this.webservicePmroBaseURL = WEBSERVICE_PMRO_BASE_URL;
    this.webserviceSiscecBaseURL = WEBSERVICE_SISCEC_BASE_URL;
    this.customLoading = new CustomLoading('loading');
    this.restClient = new RESTClient();
    //TOKEN CONFIG
    this.accessTokenKey = 'YWNjZXNzX3Rva2Vu';
    this.expiresInKey = 'ZXhwaXJlc19pbg==';
    this.loginStatusKey = 'bG9naW5TdGF0dXM=';
    this.tokenTypeKey = 'dG9rZW5fdHlwZQ==';
    this.userFullNameKey = 'ZnVsbF9uYW1l';
    this.expirationTimeKey = 'expirationTime';
    this.intervalFunctionIdKey = 'intervalFunctionId';
    this.idPerfilKey = 'idPerfil';
    this.idSetorKey = 'idSetor';

    this.pageLoginView = $("#pageLoginView");
    this.pageMainView = $("#pageMainView");
    this.sidebarMainMenu = $("#sidebarMainMenu");

    this.spanFullUserName = $("#spanFullUserName");
    this.userThumbnail = $(".userThumbnail");

    this.formLogin = $("#formLogin");
    this.inputUserName = $("#inputUserName");
    this.inputUserPass = $("#inputUserPass");
    this.btnLogin = $("#btnLogin");
    this.btnLogout = $("#btnLogout");

    this.iframeShowPage = $("#iframeShowPage");
    this.body = $("body");

    this.sidebarMainMenu = $("#sidebarMainMenu");
    this.menuAPI = new MenuAPI('sidebarMainMenu');
    this.menuAPI.setMethod('GET');
    this.menuAPI.setURL(this.webserviceSiscecBaseURL+'menu/hierarquia');
    this.menuAPI.setIframeID('iframeShowPage');
}

MainViewModel.prototype.init = function () {
    var self = this;
    self.iframeShowPage.css('opacity', '0');
    //self.iframeShowPage.attr('src', '');
    self.eventos();
    if (sessionStorage.getItem(self.accessTokenKey))
    {
        self.checkToken();
        //console.log('checkToken');
    }
    else
    {
        self.showLoginView();
        //console.log('showLoginView');
    }
    /*window.addEventListener("beforeunload", function (e) {
        var confirmationMessage = "\o/";
        e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
        return confirmationMessage;              // Gecko, WebKit, Chrome <34
    });*/


    if (sessionStorage.getItem(self.expirationTimeKey) != null)
    {
        clearTimeout(self.getSessionTimeoutId());
        self.displaySessionTimeout();
    }
};
MainViewModel.prototype.initPostAuth = function () {
    var self = this;
    self.menuAPI.load();
    //console.log('initPostAuth');
    self.iframeShowPage.attr('src', '/siscec/listaControles');
};
MainViewModel.prototype.getSessionTimeoutId = function () {
    var self = this;
    return sessionStorage.getItem(self.intervalFunctionIdKey);
};
MainViewModel.prototype.setSessionTimeoutId = function (intervalFunctionId) {
    var self = this;
    return sessionStorage.setItem(self.intervalFunctionIdKey, intervalFunctionId);
};
MainViewModel.prototype.displaySessionTimeout = function () {
    var self = this;

    var intervaloSec = 2;

    self.setSessionTimeoutId(setInterval(function () {

        var sessionTimeCount = sessionStorage.getItem(self.expirationTimeKey);

        $('.sessionTimeout span').text(secondsToHoursMinSec(sessionTimeCount));
        sessionTimeCount = sessionTimeCount - intervaloSec;
        sessionStorage.setItem(self.expirationTimeKey, sessionTimeCount);

        if (sessionTimeCount <= 0)
        {
            clearTimeout(self.getSessionTimeoutId());
            self.logout();
        }
    }, intervaloSec * 1000));

};
MainViewModel.prototype.logout = function () {
    var self = this;
    self.iframeShowPage.attr('src', '');
    clearTimeout(self.getSessionTimeoutId());
    sessionStorage.removeItem(self.intervalFunctionIdKey);
    sessionStorage.removeItem(self.accessTokenKey);
    sessionStorage.removeItem(self.expiresInKey);
    sessionStorage.removeItem(self.loginStatusKey);
    sessionStorage.removeItem(self.tokenTypeKey);
    sessionStorage.removeItem(self.userFullNameKey);
    sessionStorage.removeItem(self.expirationTimeKey);
    sessionStorage.removeItem(self.idPerfilKey);
    sessionStorage.removeItem(self.idSetorKey);
    //console.log('logout');
    //
    redirect('/siscec');
    //self.showLoginView();
};
MainViewModel.prototype.eventos = function () {
    var self = this;
    self.formLogin.submit(function (e) {
        e.preventDefault();
    });
    self.btnLogin.submit(function (e) {
        e.preventDefault();
    });
    //dispara a altenticação o click e no enter
    self.btnLogin.click(function () {
        self.autenticar();
    });
    self.inputUserName.keypress(function (e) {
        if (e.which == 13)
        {
            self.autenticar();
        }
    });
    self.inputUserPass.keypress(function (e) {
        if (e.which == 13)
        {
            self.autenticar();
        }
    });

    self.btnLogout.click(function () {
        self.logout();
    });
    //
    self.sidebarMainMenu.on('click', 'a', function () {
        if ($(window).width() <= 768)
        {
            console.log('dsf');
            $('body').toggleClass('sidebar-mobile-main').removeClass('sidebar-mobile-secondary sidebar-mobile-opposite sidebar-mobile-detached');
        }
    });

    // Toggle mini sidebar
    $('.sidebar-main-toggle').on('click', function (e) {
        e.preventDefault();
        // Toggle min sidebar class
        $('body').toggleClass('sidebar-xs');
    });

    // Toggle main sidebar
    $('.sidebar-mobile-main-toggle').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-mobile-main').removeClass('sidebar-mobile-secondary sidebar-mobile-opposite sidebar-mobile-detached');
    });

    //evento botão que exibe ou esconde o menu sidebar no mobile
    $('.sidebar-main.sidebar-fixed .sidebar-content').on('mouseenter', function () {
        if ($('body').hasClass('sidebar-xs'))
        {
            // Expand fixed navbar
            $('body').removeClass('sidebar-xs').addClass('sidebar-fixed-expanded');
        }
    }).on('mouseleave', function () {
        if ($('body').hasClass('sidebar-fixed-expanded'))
        {
            // Collapse fixed navbar
            $('body').removeClass('sidebar-fixed-expanded').addClass('sidebar-xs');
        }
    });

};
MainViewModel.prototype.showMainView = function () {
    var self = this;
    self.pageLoginView.css('display', 'none');
    self.pageMainView.css('display', 'block');
    self.iframeShowPage.animate({opacity: 1});
    /*self.pageLoginView.animate({top:  self.body.height()},400,'swing',function () {
    });*/

    //exibe o nome e as inicias do usuario
    var nomeUsuario = sessionStorage.getItem(self.userFullNameKey);
    self.spanFullUserName.text(nomeUsuario);
    self.userThumbnail.find('i').text(retornarIniciais(nomeUsuario));
    self.userThumbnail.css('background', stringToColour(nomeUsuario))
};
MainViewModel.prototype.showLoginView = function () {
    var self = this;
    self.pageMainView.css('display', 'none');
    self.pageLoginView.css('display', 'block');
    self.iframeShowPage.css('opacity', '0');
};
MainViewModel.prototype.autenticar = function () {
    var self = this;
    self.customLoading.show();

    //obtem dados do formulario de login
    var dataToSender = {
        "userName": self.inputUserName.val(), "password": self.inputUserPass.val()
    };
    //faz uma requisição a API Rest para autenticar
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'auth');
    self.restClient.setMethodPOST();
    //caso sucesso
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        sessionStorage.setItem(self.accessTokenKey, data['access_token']);
        sessionStorage.setItem(self.expiresInKey, data['expires_in']);
        sessionStorage.setItem(self.loginStatusKey, data['login']);
        sessionStorage.setItem(self.tokenTypeKey, data['token_type']);
        sessionStorage.setItem(self.userFullNameKey, data['full_name']);
        sessionStorage.setItem(self.expirationTimeKey, data['expires_in']);
        sessionStorage.setItem(self.idPerfilKey, data['idPerfil']);
        sessionStorage.setItem(self.idSetorKey, data['idSetor']);

        self.showMainView();
        self.displaySessionTimeout();
        self.initPostAuth();
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Credencial Invalida!');
    });
    self.restClient.exec();
};
MainViewModel.prototype.checkToken = function () {
    var self = this;
    self.customLoading.show();
    //faz uma requisição a API Rest para validar token
    self.restClient.setDataToSender({"access_token": sessionStorage.getItem(self.accessTokenKey)});
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'auth/check');
    self.restClient.setMethodPOST();
    //caso sucesso
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.showMainView();
        self.customLoading.hide();
        self.initPostAuth();
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.showLoginView();
        self.customLoading.hide();
    });
    self.restClient.exec();
};
