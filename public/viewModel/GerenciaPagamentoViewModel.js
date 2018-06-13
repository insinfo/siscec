$(document).ready(function () {
    var gerenciaPagamentoViewModel = new GerenciaPagamentoViewModel();
    gerenciaPagamentoViewModel.init();
});

function GerenciaPagamentoViewModel() {
    this.webservicePmroBaseURL = WEBSERVICE_PMRO_BASE_URL;
    this.webserviceSiscecBaseURL = WEBSERVICE_SISCEC_BASE_URL;
    this.customLoading = new CustomLoading('loading');
    this.restClient = new RESTClient();

    //LISTA MEDICAO
    this.tableListaMedicao = $('#tableListaMedicao');
    //Inicializa o ModernDataTable Medicão
    this.dataTableListaMedicao = new ModernDataTable('tableListaMedicao');

    //disabilita recurso de acordo com o usuario logado
    this.disableFeature = false;
    //FILTROS
    this.selectPagoFiltro = $('#selectPagoFiltro');
    this.inputSecretariaFiltro = $('#inputSecretariaFiltro');
    this.selectOrderFiltro = $('#selectOrderFiltro');
    this.filtersDataToSender = {};
    this.btnBuscar = $('#btnBuscar');

    //modal setor
    this.modalSetor = new CustomModal('modalSetor');
    this.treeViewModalBuscaSetor = $('#treeViewModalBuscaSetor');
    this.inputModalBuscaSetor = $('#inputModalBuscaSetor');
    this.treeViewModalBuscaSetor = $('#treeViewModalBuscaSetor');
}

GerenciaPagamentoViewModel.prototype.init = function () {
    var self = this;
    // initialize MATERIALIZE
    $('ul.tabs').tabs();
    $('select').material_select();
    $('.modal').modal();

    //disabilita recurso de acordo com o usuario logado
    self.accessControl();
    self.getMedicoes();
    self.eventos();
};
GerenciaPagamentoViewModel.prototype.getMedicoes = function () {
    var self = this;

    self.filtersDataToSender = {"order": self.selectOrderFiltro.val()};
    if (self.selectPagoFiltro.val() !== "null") {
        self.filtersDataToSender.pago = self.selectPagoFiltro.val();
    }
    if (self.inputSecretariaFiltro.val() !== "") {
        self.filtersDataToSender.organograma = self.inputSecretariaFiltro.attr('data-content');
    }

    self.dataTableListaMedicao.hideRowSelectionCheckBox();
    self.dataTableListaMedicao.hideActionBtnDelete();
    self.dataTableListaMedicao.setDisplayCols(
        [
            {"key": "id"},
            {"key": "organogramaSigla"},
            {"key": "objeto"},
            {
                "key": "idContrato", "render": function (rowData) {
                    return rowData['contrato']['numeroContrato'] + '/' + rowData['contrato']['anoContrato'];
                }
            },
            {"key": "dataInicio", "type": "date"},
            {"key": "dataFim", "type": "date"},
            {"key": "totalMedicao"},
            {"key": "pago", "type": "boolSwitch"}
        ]
    );
    self.dataTableListaMedicao.setIsColsEditable(false);
    self.dataTableListaMedicao.setDataToSender(self.filtersDataToSender);
    self.dataTableListaMedicao.setSourceURL(self.webserviceSiscecBaseURL + 'medicoes');
    self.dataTableListaMedicao.setSourceMethodPOST();
    self.dataTableListaMedicao.setOnClick(function (td) {
        //console.log(td);
    });
    self.dataTableListaMedicao.setOnAddItemAction(function () {
        //$('.collapsible').collapsible('open', 0);
    });
    self.dataTableListaMedicao.setOnDeleteItemAction(function (ids) {
    });
    self.dataTableListaMedicao.setOnSwitchClick(function (data) {
        self.quitarMedicao(data['id'], data['pago']);
    });
    self.dataTableListaMedicao.load();
};
GerenciaPagamentoViewModel.prototype.getSetores = function (inputDOM) {
    var self = this;
    var correnteInput = $(inputDOM);
    self.customLoading.show();
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'secretarias');
    self.restClient.setMethodGET();
    self.restClient.setSuccessCallbackFunction(function (setoresData) {

        self.customLoading.hide();

        self.treeViewModalBuscaSetor.treeview({
            data: setoresData, onNodeSelected: function (event, node) {
                correnteInput.val(node['sigla']);
                correnteInput.attr('data-content', node['idOrganograma']);
                self.modalSetor.close();
            }
        });

        var result = null;
        var search = function (e) {
            result = null;
            var pattern = self.inputModalBuscaSetor.val();
            var options = {
                ignoreCase: true, exactMatch: false, revealResults: true
            };
            result = self.treeViewModalBuscaSetor.treeview('search', [pattern, options]);
            if (result.length > 0) {
                self.treeViewModalBuscaSetor.treeview({
                    data: null
                });
                self.treeViewModalBuscaSetor.treeview({
                    data: removeDuplicateItem(result, 'text', 'idPai'), onNodeSelected: function (event, node) {
                        correnteInput.val(node['text']);
                        correnteInput.attr('data-content', node['idOrganograma']);
                        self.modalSetor.close();
                    }
                });
            }
            else {
                self.treeViewModalBuscaSetor.treeview({
                    data: setoresData, onNodeSelected: function (event, node) {
                        correnteInput.val(node['sigla']);
                        correnteInput.attr('data-content', node['idOrganograma']);
                        self.modalSetor.close();
                    }
                });
            }

        };

        self.inputModalBuscaSetor.on('keyup', search);
        self.modalSetor.open();

    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro em obter setores');

    });
    self.restClient.exec();
};
GerenciaPagamentoViewModel.prototype.eventos = function () {
    var self = this;
    //evento abre a lista de setores para filtrar controles por setor
    self.inputSecretariaFiltro.click(function () {
        self.getSetores(this);
    });
    //limpa o input inputSetorFiltro
    $('.clearInput').click(function () {
        var input = $(this).closest('div').find('input');
        input.val('');
        input.attr('data-content', '');
    });

    self.btnBuscar.click(function (e) {

        self.filtersDataToSender = {"order": self.selectOrderFiltro.val()};
        if (self.selectPagoFiltro.val() !== "null") {
            self.filtersDataToSender.pago = self.selectPagoFiltro.val();
        }
        if (self.inputSecretariaFiltro.val() !== "") {
            self.filtersDataToSender.organograma = self.inputSecretariaFiltro.attr('data-content');
        }
        console.log(self.filtersDataToSender);
        self.dataTableListaMedicao.setDataToSender(self.filtersDataToSender);
        self.dataTableListaMedicao.reload();
    });

};
GerenciaPagamentoViewModel.prototype.quitarMedicao = function (idMedicao, pago) {
    var self = this;
    self.customLoading.show();
    var dataToSender = {"idMedicao": idMedicao, "pago": pago};
    //console.log(JSON.stringify(dataToSender));
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'medicoes/quitar');
    self.restClient.setMethodPOST();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.dataTableListaMedicao.reload();
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert(jqXHR['responseJSON']['message']);
        self.dataTableListaMedicao.reload();
    });
    self.restClient.exec();
};
//controle de acesso
GerenciaPagamentoViewModel.prototype.accessControl = function () {
    var self = this;
    //controle de acesso
    if (getPerfilUsuario() === PERFIL_VISUALIZADOR) {
        self.disableFeature = true;
    }
};



