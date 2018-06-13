$(document).ready(function () {
    var listaControlesViewModel = new ListaControlesViewModel();
    listaControlesViewModel.init();
});

function ListaControlesViewModel()
{
    this.webservicePmroBaseURL = WEBSERVICE_PMRO_BASE_URL;
    this.webserviceSiscecBaseURL = WEBSERVICE_SISCEC_BASE_URL;
    this.customLoading = new CustomLoading('loading');
    this.restClient = new RESTClient();
    this.alertAPI = new ModalAPI();

    // LISTA CONTROLES
    this.btnShowGrid = $('#btnShowGrid');
    this.btnShowList = $('#btnShowList');
    this.tabGrid = $('#tabGrid');
    this.tabList = $('#tabList');

    //FILTROS DA LISTAGEM DE CONTROLES
    this.inputSetorFiltro = $('#inputSetorFiltro');
    this.selecModalidadeFiltro = $('#selecModalidadeFiltro');
    this.selectStatusFiltro = $('#selectStatusFiltro');
    this.selectOrderFiltro = $('#selectOrderFiltro');
    this.inputSearchFiltro = $('#inputSearchFiltro');
    this.btnSearchFiltro = $('#btnSearchFiltro');

    //DATATABLES LISTA DE CONTROLES
    this.tableListaControle = $('#tableListaControle');
    this.dataTableListaControle = null;
    this.btnDataTableControleSelectAll = $('#btnDataTableControleSelectAll');
    // Array de IDs das linhas selecionadas do dataTables ListaControle
    this.dataTableListaControleRowsSelected = [];
    this.btnDeleteControle = $('#btnDeleteControle');

    // DISPLAY CONTROLE
    this.outputNumeroControle = $('#outputNumeroControle');
    this.outputSetor = $('#outputSetor');
    this.outputModalidade = $('#outputModalidade');
    this.outputPrevisaoGasto = $('#outputPrevisaoGasto');
    this.outputEmpresa = $('#outputEmpresa');
    this.outputObjeto = $('#outputObjeto');
    this.dataTableExibeContratos = null;
    this.tableExibeContratos = $('#tableExibeContratos');

    // FORMULARIO EDITA CONTROLE
    this.inputEditNumeroControle = $('#inputEditNumeroControle');
    this.inputEditSetor = $('#inputEditSetor');
    this.selectEditModalidade = $('#selectEditModalidade');
    this.inputEditEmpresa = $('#inputEditEmpresa');
    this.inputEditPrevisaoGasto = $('#inputEditPrevisaoGasto');
    this.textAreaEditObjeto = $('#textAreaEditObjeto');
    this.btnSalvarEditControle = $('#btnSalvarEditControle');
    this.idControle = '';

    // MODAL EMPRESA
    this.modalEmpresa = new CustomModal('modalEmpresa');
    this.tablePessoaJuridica = $('#tablePessoaJuridica');
    this.dataTablesPessoaJuridica = null;

    // MODAL SETOR
    this.modalSetor = new CustomModal('modalSetor');
    this.treeViewModalBuscaSetor = $('#treeViewModalBuscaSetor');
    this.inputModalBuscaSetor = $('#inputModalBuscaSetor');

    // EXIBE MEDIÇOES PAGAS
    this.tableMedicoesPagas = $('#tableMedicoesPagas');
    this.dataTableMedicoesPagas = null;

    // EXIBE MEDIÇOES ABERTAS
    this.tableMedicoesAbertas = $('#tableMedicoesAbertas');
    this.dataTableMedicoesAbertas = null;

    // EXIBE FISCAIS DE UM CONTROLE
    this.tableExibeFiscais = $('#tableExibeFiscais');
    this.dataTableExibeFiscais = null;

    //FORM EDIT FISCAL
    this.inputEditNomeFiscal = $('#inputEditNomeFiscal');
    this.inputEditMatricula = $('#inputEditMatricula');
    this.inputEditNumeroPortaria = $('#inputEditNumeroPortaria');
    this.inputEditAnoPortaria = $('#inputEditAnoPortaria');
    this.inputEditDataPortaria = $('#inputEditDataPortaria');
    this.btnSalvarFiscal = $('#btnSalvarFiscal');
    this.idFiscal = null;
    this.btnAddNewFiscal = $('#btnAddNewFiscal');
    this.btnUpdateListFiscalToEdit = $('#btnUpdateListFiscalToEdit');
    this.btnDeleteFiscal = $('#btnDeleteFiscal');
    // LISTA FISCAIS PARA EDIÇÃO
    this.tableFiscalToEdit = $('#tableFiscalToEdit');
    this.dataTableFiscalToEdit = null;
    this.dataTableFiscalToEditSelectedId = [];

    //FORM EDITA CONTRATO
    this.inputNumeroProcessoContrato = $('#inputNumeroProcessoContrato');
    this.inputAnoProcessoContrato = $('#inputAnoProcessoContrato');
    this.inputNumeroContrato = $('#inputNumeroContrato');
    this.inputAnoContrato = $('#inputAnoContrato');
    this.inputDataInicioContrato = $('#inputDataInicioContrato');
    this.inputDataFimContrato = $('#inputDataFimContrato');
    this.inputValorContrato = $('#inputValorContrato');
    this.selectTipoContrato = $('#selectTipoContrato');
    this.selectSituacaoContrato = $('#selectSituacaoContrato');
    this.selectTipoAditivoContrato = $('#selectTipoAditivoContrato');
    this.inputPrazoAditivarContrato = $('#inputPrazoAditivarContrato');
    this.inputDataFimAditivarContrato = $('#inputDataFimAditivarContrato');
    this.btnSalvarContrato = $('#btnSalvarContrato');
    this.tableContratoToEdit = $('#tableContratoToEdit');
    this.dataTableContratoToEdit = null;
    this.dataTableContratoToEditSelectedId = [];
    this.idContrato = null;
    this.btnAddNewContrato = $('#btnAddNewContrato');
    this.btnUpdateTableContratoToEdit = $('#btnUpdateTableContratoToEdit');
    this.btnDeleteContrato = $('#btnDeleteContrato');

    // PARAMETROS DE PAGINACAO
    this.PAGINATION_STYLE_CAROULSEL = 11;
    this.PAGINATION_STYLE_CUBE = 12;
    this._paginationStyle = 12;
    this._recordsFiltered = 0;
    this._currentPage = 1;
    this._itemsPerPage = 20;
    this._btnQuantity = 6;
    this._paginationContainer = $('#paginationListaControles');

    //MODAL SOLICITA ADITIVO
    this.modalSolicitarAditivo = new CustomModal('modalSolicitarAditivo');
    this.inputDataSolicitacaoAditivo = $('#inputDataSolicitacaoAditivo');
    this.textAreaJustificaSolicitaAd = $('#textAreaJustificaSolicitaAd');
    this.btnSalvaSolicitacaoAditivo = $('#btnSalvaSolicitacaoAditivo');
    this.idContratoSolicitacao = null;

}

ListaControlesViewModel.prototype.init = function () {
    var self = this;
    // INICIALIZA MATERIALIZE
    $('ul.tabs').tabs();
    $('select').material_select();
    $('.modal').modal();
    $('.collapsible').collapsible();

    // INICIALIZA MODAL GERENCIA CONTROLE
    $().animatedModal({color: '#f0f0f0', modalTarget: 'gerenciaControleModal'});
    // INICIALIZA MODAL EXIBIR CONTROLE
    $().animatedModal({color: '#f0f0f0', modalTarget: 'exibirControleModal'});

    // INICIALIZA EVENTOS
    self.accessControl();
    self.getControles();
    self.eventos();
    self.maskForm();
};
ListaControlesViewModel.prototype.accessControl = function () {
    var self = this;
    //controle de acesso
    if (getPerfilUsuario() === PERFIL_VISUALIZADOR)
    {
        $($("#controleListItemTemplate")[0].content).find('.cardActionBtn').remove();
        $("#btnDeleteControle").remove();
        //self.btnAddControle.remove();
        /*var host = document.querySelector('#hoster');
        var template = document.querySelector('#im-a-template');
        var documentFragment = template.content;
        var templateClone = documentFragment.cloneNode(true);
        root.appendChild(templateClone);*/
    }
};
ListaControlesViewModel.prototype.eventos = function () {
    var self = this;

    /** LISTA CONTROLES **/
    self.btnShowGrid.click(function () {
        self.tabList.removeClass('hideTab');
        self.tabList.addClass('hideTab');
        self.tabGrid.removeClass('hideTab');

        self.btnShowGrid.removeClass('btnInativo');
        self.btnShowGrid.addClass('btnAtivo');
        self.btnShowList.removeClass('btnAtivo');
        self.btnShowList.addClass('btnInativo');
    });
    self.btnShowList.click(function () {
        self.tabGrid.removeClass('hideTab');
        self.tabGrid.addClass('hideTab');
        self.tabList.removeClass('hideTab');

        self.btnShowList.removeClass('btnInativo');
        self.btnShowList.addClass('btnAtivo');
        self.btnShowGrid.removeClass('btnAtivo');
        self.btnShowGrid.addClass('btnInativo');
    });
    //evento abre a lista de setores para filtrar controles por setor
    self.inputSetorFiltro.click(function () {
        self.getSetores(this);
    });
    //evento botão de buscar controles
    self.btnSearchFiltro.click(function () {
        self.getControles();
    });
    self.inputSearchFiltro.keypress(function (ev) {
        var keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if (keycode === 13)
        {
            self.getControles();
        }
    });

    // evento click no card da Lista de Controle e abre o modal de exibição
    self.tabGrid.find('ul').on('click', 'li table', function (e) {
        var id = $(this).find('.listItemNumeroControle').attr('data-content');
        self.showPageDisplay(id);
        e.stopPropagation();
    });

    // evento click no botão edição do card da Lista de Controle e abre o modal de edição
    self.tabGrid.find('ul').on('click', 'a.btnEditarControle', function () {
        var id = $(this).closest('li.controleListItem').find('.listItemNumeroControle').attr('data-content');
        self.showPageEdit(id);
    });

    // evento click na linha do dataTables Lista Controle e abre o modal de exibição
    self.tableListaControle.on('click', 'tbody tr .dataTableClick', function () {
        var id = self.dataTableListaControle.row($(this).closest('tr')).data()['id'];
        self.showPageDisplay(id);
    });

    //evento que deleta os controles selecionados no dataTables lista controles
    self.btnDeleteControle.click(function () {
        self.deleteControles();
    });

    //evento de click em um contrato da exbição de controle
    self.tableExibeContratos.on('click', 'tbody tr', function () {
        var data = self.dataTableExibeContratos.row($(this).closest('tr')).data();

        self.getMedicoesPagas({"idContrato": data['id']});
        self.getMedicoesAbetas({"idContrato": data['id']});
        self.tableExibeContratos.find('tr').each(function () {
            $(this).removeClass('trAtivo');
        });
        $(this).toggleClass('trAtivo');
    });

    // FORMULARIO EDITA CONTROLE
    self.inputEditEmpresa.click(function () {
        self.getPessoas(this, 'Juridica');
    });
    //evento abre a lista de setores para selecionar um setor para editar controle
    self.inputEditSetor.click(function () {
        self.getSetores(this);
    });
    //evento botão salvar edição do controle
    self.btnSalvarEditControle.click(function () {
        self.saveControle();
    });
    // FORMULARIO EDITA FISCAL
    self.inputEditNomeFiscal.click(function () {
        self.getPessoas(this, "fisica");
    });
    self.tableFiscalToEdit.on('click', 'tbody tr', function (e) {

        if ($(e.target).closest('td').hasClass('dataTableColSelect'))
        {
            return;
        }

        var data = self.dataTableFiscalToEdit.row($(this).closest('tr')).data();
        self.idFiscal = data['id'];
        self.fillFormFiscal(data);
        self.inputEditNomeFiscal.focus();
        e.stopPropagation();
    });
    //actions datatable fiscais to edit
    self.btnUpdateListFiscalToEdit.click(function () {
        self.reloadTableFiscaisToEdit();
    });
    self.btnAddNewFiscal.click(function () {
        self.resetFormFiscal();
        self.inputEditNomeFiscal.focus();
    });
    self.btnDeleteFiscal.click(function () {
        self.deleteFiscais();
    });
    self.btnSalvarFiscal.click(function () {
        self.saveFiscal();
    });

    //FORMULARIO EDITA CONTRATO
    self.tableContratoToEdit.on('click', 'tbody tr', function (e) {

        if ($(e.target).closest('td').hasClass('dataTableColSelect'))
        {
            return;
        }

        var data = self.dataTableContratoToEdit.row($(this).closest('tr')).data();
        self.idContrato = data['id'];
        self.fillFormContrato(data);
        self.inputNumeroProcessoContrato.focus();
        e.stopPropagation();
    });
    self.btnSalvarContrato.click(function () {
        self.saveContrato();
    });
    self.btnAddNewContrato.click(function () {
        self.resetFormContrato();
        self.inputNumeroProcessoContrato.focus();
    });
    self.btnUpdateTableContratoToEdit.click(function () {
        self.reloadTableContratosToEdit();
    });
    self.btnDeleteContrato.click(function () {
        self.deleteContratos();
    });
    //exibe a data final para aditivar de acordo com a quantidade de dias digitados
    self.inputPrazoAditivarContrato.on('input', function () {
        if (this.value.length > this.maxLength)
        {
            this.value = this.value.slice(0, this.maxLength);
        }
        self.showDataFimAditivar();
    });

    //paginação da lista de controles
    //eventos dos botões
    self._paginationContainer.on('click', '#previous-page', function () {
        self.prevPage();
    });
    self._paginationContainer.on('click', '#next-page', function () {
        self.nextPage();
    });
    self._paginationContainer.on('click', '.btn-pagination', function () {
        self._currentPage = parseInt($(this).text());
        self.changePage(self._currentPage);
    });

    //solicita aditivo
    self.tabGrid.find('ul').on('click', '.btnSolicitaAditivo', function (e) {
        e.stopPropagation();
        self.idContratoSolicitacao = $(this).closest('table').find('.listItemNumeroContrato').attr('idcontrato');
        self.modalSolicitarAditivo.open();
    });

    self.btnSalvaSolicitacaoAditivo.on('click', function () {
        self.solicitarAdtivo();
    });

    //limpa o input inputSetorFiltro
    $('.clearInput').click(function () {
        var input = $(this).closest('div').find('input');
        input.val('');
        input.attr('data-content','');
    });
};
ListaControlesViewModel.prototype.solicitarAdtivo = function () {
    var self = this;

    var dataToSender = {
        "dataAditivo": self.inputDataSolicitacaoAditivo.val(), "justificativaAditivo": self.textAreaJustificaSolicitaAd.val()
    };

    var id = self.idContratoSolicitacao;
    self.customLoading.show();
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + "contratos" + "/" + id);
    self.restClient.setMethodPUT();
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        alert(data['message']);
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro ao informar solicitação!');
    });
    self.restClient.exec();
};
ListaControlesViewModel.prototype.renderCardsControles = function (data) {
    var self = this;
    data = data['data'];
    var host = self.tabGrid.find('ul');
    host.empty();

    var html = $("#controleListItemTemplate").html();

    for (var i = 0; i < data.length; i++)
    {
        //ponto quente de performace
        var listItem = $(html);


        var controle = data[i];

        listItem.find('.listItemNumeroControle').attr('data-content', controle['id']);
        listItem.find('.listItemNumeroControle').text(controle['numeroControle']);
        listItem.find('.listItemSetorControle').text(controle['setorNome']);
        listItem.find('.listItemModalidade').text(listaModalidades[controle['modalidade']]);
        listItem.find('.listItemEmpresa').text(controle['empresa']['nome']);
        listItem.find('.listItemObjeto').text(controle['objeto']);

        var contratos = controle['contratos'];

        if (contratos.length >= 1)
        {
            var contrato = contratos[0];
            var statusContrato = listaStatusContrato[contrato['situacao']];
            var card = listItem.find('.card');
            card.removeClass('borderAberto');
            card.addClass('border' + statusContrato);
            listItem.find('.listItemStatusContrato').text(statusContrato);
            listItem.find('.listItemNumeroContrato').text(contrato['numeroProcesso'] + '/' + contrato['anoProcesso']);
            listItem.find('.listItemNumeroContrato').attr('idcontrato', contrato['id']);
            listItem.find('.listItemDias').text(contrato['prazoLimiteAditivo']);
            listItem.find('.listItemValor').text(contrato['valor']);

            if (contrato['dataAditivo'])
            {
                listItem.find('.listItemBotaoAditivo').empty().text('Aditivado em:\u205f \u205f \u205f ' + sqlDateToBrasilDate(contrato['dataAditivo']));
            }
        }
        else
        {
            listItem.find('.listItemStatusContrato').text('sem contrato cadastrado');
            listItem.find('.listItemNumeroContrato').text('sem contrato cadastrado');
            listItem.find('.listItemDias').text('sem contrato cadastrado');
            listItem.find('.listItemValor').text('sem contrato cadastrado');
            listItem.find('.listItemBotaoAditivo').empty();
        }
        host.append(listItem.clone());
    }
};
ListaControlesViewModel.prototype.renderDataTableControles = function (data) {
    var self = this;
    data = data['data'];
    if (self.dataTableListaControle !== null)
    {
        self.dataTableListaControle.destroy();
    }

    // inicializa dataTables Lista Controle
    self.dataTableListaControle = self.tableListaControle.DataTable({
        info: false, bPaginate: false, bAutoWidth: false, responsive: true, processing: false, serverSide: false, ordering: false, searching: false, data: data, columns: [{
            "data": "id", width: "50px", render: function (data, type, full, meta) {
                return '<div class="dataTableCheckBox"><input type="checkbox" id="listaControleCheckRow' + data + '"/><label for="listaControleCheckRow' + data + '"></label></div>';
            }
        }, {"data": "numeroControle", 'class': 'dataTableClick'}, {"data": "setorNome", 'class': 'dataTableClick'}, {"data": "empresa.nome", 'class': 'dataTableClick'}, {
            "data": "modalidade", 'class': 'dataTableClick', render: function (data, type, row) {
                return listaModalidades[data];
            }
        }, {"data": "previsaoGasto", 'class': 'dataTableClick'}, {"data": "objeto", 'class': 'dataTableClick'}]
    });
    //abilita o checkbox select all
    dataTableSelectAll(self.tableListaControle, self.dataTableListaControle, self.dataTableListaControleRowsSelected);

    //abilita a seleção
    dataTableSelect(self.tableListaControle, self.dataTableListaControle, self.dataTableListaControleRowsSelected);

};
ListaControlesViewModel.prototype.prevPage = function () {
    var self = this;
    if (self._currentPage > 1)
    {
        self._currentPage--;
        self.changePage();
    }
};
ListaControlesViewModel.prototype.nextPage = function () {
    var self = this;
    if (self._currentPage < self.numPages())
    {
        self._currentPage++;
        self.changePage();
    }
};
ListaControlesViewModel.prototype.changePage = function () {
    var self = this;
    self.getControles();
};
ListaControlesViewModel.prototype.numPages = function () {
    var self = this;
    return Math.ceil(self._recordsFiltered / self._itemsPerPage);
};
ListaControlesViewModel.prototype.renderPaginationListaControles = function () {
    var self = this;

    //quantidade total de paginas
    var totalPages = self.numPages();
    var btnQuantity = self._btnQuantity > totalPages ? totalPages : self._btnQuantity;
    //quantidade de botões de paginação exibidos
    var itemsPerPage = self._itemsPerPage; //quantidade de itens a serem exibidos por pagina
    var currentPage = self._currentPage;//pagina atual
    if (btnQuantity == 1)
    {
        return;
    }
    //console.log("btnQuantity: "+btnQuantity+" totalPages:"+totalPages+" itemsPerPage:"+itemsPerPage+" currentPage:"+currentPage);

    var prevButton = '<li><a href="#" id="previous-page"><i class="material-icons">chevron_left</i></a></li>';
    if (currentPage === 1)
    {
        prevButton = prevButton.replace('<li>', '<li class="disabled">');
    }
    var nextButton = '<li><a href="#" id="next-page"><i class="material-icons">chevron_right</i></a></li>';
    if (currentPage === totalPages)
    {
        nextButton = nextButton.replace('<li>', '<li class="disabled">');
    }

    self._paginationContainer.empty();
    self._paginationContainer.append(prevButton);

    var idx, loopEnd, itemClass = "";
    switch (self._paginationStyle)
    {
        case self.PAGINATION_STYLE_CAROULSEL:
            idx = currentPage - parseInt(btnQuantity / 2);
            if (idx <= 0)
            {
                idx = 1;
            }
            loopEnd = idx + btnQuantity;
            if (loopEnd > totalPages)
            {
                loopEnd = totalPages + 1;
                idx = loopEnd - btnQuantity;
            }
            while (idx < loopEnd)
            {
                itemClass = idx === currentPage ? ' class="active" ' : '';
                self._paginationContainer.append('<li' + itemClass + '><a href="#" class="btn-pagination" page="' + idx + '">' + idx + '</a></li>');
                idx++;
            }
            break;
        case self.PAGINATION_STYLE_CUBE:
            var facePosition = (currentPage % btnQuantity) === 0 ? btnQuantity : currentPage % btnQuantity;
            loopEnd = btnQuantity - facePosition + currentPage;
            idx = currentPage - facePosition;
            while (idx < loopEnd)
            {
                idx++;
                if (idx <= totalPages)
                {
                    itemClass = idx === currentPage ? ' class="active" ' : '';
                    self._paginationContainer.append('<li' + itemClass + '><a href="#" class="btn-pagination" page="' + idx + '">' + idx + '</a></li>');
                }
            }
            break;
    }
    self._paginationContainer.append(nextButton);
};
ListaControlesViewModel.prototype.getSetores = function (inputDOM) {
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
            if (result.length > 0)
            {
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
            else
            {
                self.treeViewModalBuscaSetor.treeview({
                    data: setoresData, onNodeSelected: function (event, node) {
                        correnteInput.val(node['text']);
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
ListaControlesViewModel.prototype.getControle = function (id) {
    var self = this;
    self.customLoading.show();
    self.restClient.setWebServiceURL(this.webserviceSiscecBaseURL + 'controles/' + id);
    self.restClient.setMethodGET();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.displayControle(data);
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro em obter controle ');
    });
    self.restClient.exec();
};
ListaControlesViewModel.prototype.getControles = function () {
    var self = this;
    var currentPage = self._currentPage === 1 ? 0 : self._currentPage - 1;
    var offset = currentPage * self._itemsPerPage;
    var filtros = {
        "idOrganograma": self.inputSetorFiltro.attr('data-content'), "modalidade": self.selecModalidadeFiltro.val(), "status": self.selectStatusFiltro.val(), "search": self.inputSearchFiltro.val(), "order": self.selectOrderFiltro.val(), "start": offset, "length": self._itemsPerPage, "draw": 1
    };
    //console.log(filtros);
    self.customLoading.show();
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'controles');
    self.restClient.setMethodPOST();
    self.restClient.setDataToSender(filtros);
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.renderCardsControles(data);
        self.renderDataTableControles(data);
        self._recordsFiltered = parseInt(data['recordsFiltered']);
        self.renderPaginationListaControles(data);
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro em obter controles ');
    });
    self.restClient.exec();

};
ListaControlesViewModel.prototype.updateInputFields = function () {
    Materialize.updateTextFields();
    $('select').material_select();
};
ListaControlesViewModel.prototype.displayControle = function (data) {
    var self = this;
    data = data['data'];

    this.outputNumeroControle.text(data['numeroControle']);
    this.outputSetor.text(data['setor']['nome']);
    this.outputModalidade.text(listaModalidades[data['modalidade']]);
    this.outputPrevisaoGasto.text(data['previsaoGasto']);
    this.outputEmpresa.text(data['empresa']['nome']);
    this.outputObjeto.text(data['objeto']);

    this.inputEditNumeroControle.val(data['numeroControle']);
    this.inputEditSetor.val(data['setor']['nome']);
    this.inputEditSetor.attr('data-content', data['idOrganograma']);
    this.selectEditModalidade.val(data['modalidade']);
    this.inputEditEmpresa.val(data['empresa']['nome']);
    this.inputEditPrevisaoGasto.val(data['previsaoGasto']);
    this.textAreaEditObjeto.text(data['objeto']);
    self.updateInputFields();

};
ListaControlesViewModel.prototype.reloadTableControles = function () {
    var self = this;
    emptyArray(self.dataTableFiscalToEditSelectedId);
    self.getControles();
}
ListaControlesViewModel.prototype.deleteControles = function () {
    var self = this;
    var ids = self.dataTableListaControleRowsSelected;
    if (self.dataTableListaControleRowsSelected.length === 0)
    {
        alert('Você não selecionou nenhum item a ser deletado ');
        return;
    }

    var dataToSender = {'ids': ids};
    self.customLoading.show();
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'controles');
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setMethodDELETE();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.reloadTableControles();
        alert(data['message']);

    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        // console.log(jqXHR);
        alert('Erro ao deletar controle');
    });
    self.restClient.exec();
};
ListaControlesViewModel.prototype.getPessoas = function (inputDOM, tipoPessoa) {
    var self = this;
    inputDOM = $(inputDOM);

    self.customLoading.show();
    self.restClient.setWebServiceURL(this.webserviceSiscecBaseURL + "pessoas/datatable");
    self.restClient.setMethodPOST();
    self.restClient.setDataToSender({
        'tipo': tipoPessoa, 'draw': '1', 'start': '0', 'length': '1', 'search': ''
    });
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();

        self.modalEmpresa.open();
        if (self.dataTablesPessoaJuridica !== null)
        {
            self.dataTablesPessoaJuridica.destroy();
        }
        // inicializa dataTables pessoa juridica
        self.dataTablesPessoaJuridica = self.tablePessoaJuridica.DataTable({
            order: [[1, 'asc']], oLanguage: {
                "sStripClasses": "", "sSearch": "", "sSearchPlaceholder": "Digite aqui palavras-chave", "sInfo": "_START_ -_END_ de _TOTAL_", "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
            }, bAutoWidth: false, responsive: true, processing: true, serverSide: true, ordering: false, ajax: {
                url: self.webserviceSiscecBaseURL + "pessoas/datatable",
                type: "POST", data: {'tipo': tipoPessoa}
            }, columns: data['columns']
        });
        self.tablePessoaJuridica.off('click', 'tbody tr');
        self.tablePessoaJuridica.on('click', 'tbody tr', function () {
            var data = self.dataTablesPessoaJuridica.row(this).data();
            inputDOM.val(data['nome']);
            inputDOM.attr('data-content', data['id']);
            self.modalEmpresa.close();
        });
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro em obter colunas');
    });
    self.restClient.exec();
};
ListaControlesViewModel.prototype.maskForm = function () {
    var self = this;
    self.inputEditDataPortaria.mask('99/99/9999');
    self.inputEditPrevisaoGasto.mask("#.##0,00", {reverse: true});
    self.inputEditAnoPortaria.mask('9999');

    self.inputAnoProcessoContrato.mask('9999');
    self.inputAnoContrato.mask('9999');
    self.inputDataInicioContrato.mask('99/99/9999');
    self.inputDataFimContrato.mask('99/99/9999');
    self.inputValorContrato.mask("#.##0,00", {reverse: true});

    self.inputDataSolicitacaoAditivo.mask('99/99/9999');

    self.inputDataFimAditivarContrato.mask('99/99/9999');

};
// EXIBE CONTRATOS
ListaControlesViewModel.prototype.getContratosToDisplay = function (idControle) {
    var self = this;
    var dataToSend = {"idControle": idControle};

    if (self.dataTableExibeContratos !== null)
    {
        self.dataTableExibeContratos.destroy();
    }

    // inicializa dataTables Lista Contratos de um controle
    self.dataTableExibeContratos = self.tableExibeContratos.DataTable({
        info: false, bPaginate: true,
        bAutoWidth: false, responsive: true,
        processing: true, serverSide: true,
        ordering: false, searching: true,
        "ajax": {
            url: self.webserviceSiscecBaseURL + "contratos",
            type: "POST",
            data: dataToSend
        }, "columns": [{
            "data": "numeroProcesso", "render": function (data, type, row) {
                return data + '/' + row['anoProcesso'];
            }
        }, {
            "data": "numeroContrato", "render": function (data, type, row) {
                return data + '/' + row['anoContrato'];
            }
        }, {
            "data": "dataInicio", "render": function (data, type, row) {
                return sqlDateToBrasilDate(data);
            }
        }, {
            "data": "dataFim", "render": function (data, type, row) {
                return sqlDateToBrasilDate(data);
            }
        }, {
            "data": "tipoContrato", "render": function (data, type, row) {
                return listaTipoContrato[data];
            }
        }, {
            "data": "situacao", "render": function (data, type, row) {
                return listaStatusContrato[data];
            }
        }, {
            "data": "valor", "class": "indigo-text darken-1", "render": function (data, type, row) {
                return data;
            }
        }, {
            "data": "empenhado", "class": "purple-text darken-1", "render": function (data, type, row) {
                return data;
            }
        }, {
            "data": "pago", "class": "blue-text darken-1", "render": function (data, type, row) {
                data = data != null ? data : '0';
                return data;
            }
        }, {
            "data": "saldo", "render": function (data, type, row) {
                data = data != null ? data : '0';
                var yes = '<span class="light-green-text text-darken-2">' + data + '</span>';
                var no = '<span class="red-text text-darken-2">' + data + '</span>';
                data = brCurrencyToFloat(data) === 0 ? no : yes;
                return data;
            }
        }, {
            "data": "dataAditivo", "render": function (data, type, row) {
                var yes = '<i class="material-icons green-text text-darken-2">check</i>';
                var no = '<i class="material-icons red-text text-darken-2">clear</i>';
                data = data != null ? yes : no;
                return data;
            }
        }], "initComplete": function () {
            this.find('tbody tr:first-child').toggleClass('trAtivo');
        },
        oLanguage: {
            "sZeroRecords": "Nenhum contrato cadastrado para este controle", "sInfoEmpty": "Nenhum registro disponível", "sInfoFiltered": "(filtrado _MAX_ do total de registros)", "sStripClasses": "", "sSearch": "", "sSearchPlaceholder": "Digite aqui palavras-chave", "sInfo": "_START_ -_END_ de _TOTAL_", "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }
    });
};
// EXIBE MEDIÇOES PAGAS
ListaControlesViewModel.prototype.getMedicoesPagas = function (dataToSend) {
    var self = this;

    if (self.dataTableMedicoesPagas !== null)
    {
        self.dataTableMedicoesPagas.destroy();
    }
    //console.log('getMedicoesPagas');

    // inicializa dataTables Lista medições de um contrato
    self.dataTableMedicoesPagas = self.tableMedicoesPagas.DataTable({
        info: false, bPaginate: true,
        bAutoWidth: false, responsive: true,
        processing: true, serverSide: true,
        ordering: false, searching: false,
        ajax: {
            url: self.webserviceSiscecBaseURL + "medicoes/pagas",
            type: "POST",
            data: dataToSend
        }, columns: [{
            "data": "dataInicio", "render": function (data, type, row) {
                return sqlDateToBrasilDate(data);
            }
        }, {
            "data": "dataFim", "render": function (data, type, row) {
                return sqlDateToBrasilDate(data);
            }
        }, {
            "data": "valor", "render": function (data, type, row) {
                return '<span class="' + row['cor'] + '">' + numberToBrasilReal(data) + '</span>';
            }
        }], oLanguage: {
            "sZeroRecords": "Nenhuma medição paga para este contrato", "sInfoEmpty": "Nenhum registro disponível", "sInfoFiltered": "(filtrado _MAX_ do total de registros)", "sStripClasses": "", "sSearch": "", "sSearchPlaceholder": "Digite aqui palavras-chave", "sInfo": "_START_ -_END_ de _TOTAL_", "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="3">3</option><option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }
    });
};
// EXIBE MEDIÇOES ABERTAS
ListaControlesViewModel.prototype.getMedicoesAbetas = function (dataToSend) {
    var self = this;

    if (self.dataTableMedicoesAbertas !== null)
    {
        self.dataTableMedicoesAbertas.destroy();
    }

    // inicializa dataTables Lista medições abertas de um contrato
    self.dataTableMedicoesAbertas = self.tableMedicoesAbertas.DataTable({
        info: false, bPaginate: true, bAutoWidth: false, responsive: true, processing: true, serverSide: true, ordering: false, searching: false, ajax: {
            url: self.webserviceSiscecBaseURL + "medicoes/abertas", type: "POST", data: dataToSend
        }, columns: [{
            "data": "dataInicio", "render": function (data, type, row) {
                return sqlDateToBrasilDate(data);
            }
        }, {
            "data": "dataFim", "render": function (data, type, row) {
                return sqlDateToBrasilDate(data);
            }
        }, {"data": "valor"}], oLanguage: {
            "sZeroRecords": "Nenhuma medição em aberto para este contrato", "sInfoEmpty": "Nenhum registro disponível", "sInfoFiltered": "(filtrado _MAX_ do total de registros)", "sStripClasses": "", "sSearch": "", "sSearchPlaceholder": "Digite aqui palavras-chave", "sInfo": "_START_ -_END_ de _TOTAL_", "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="3">3</option><option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }
    });
};
// EXIBE FISCAIS
ListaControlesViewModel.prototype.getFiscaisToDisplay = function (idControle) {
    var self = this;

    if (self.dataTableExibeFiscais !== null)
    {
        self.dataTableExibeFiscais.destroy();
    }

    // inicializa dataTables Lista medições abertas de um contrato
    self.dataTableExibeFiscais = self.tableExibeFiscais.DataTable({
        info: false, bPaginate: true, bAutoWidth: false, responsive: true, processing: true, serverSide: true, ordering: false, searching: false, ajax: {
            url: self.webserviceSiscecBaseURL + "fiscais", type: "POST", data: {"idControle": idControle}
        }, columns: [{"data": "pessoa.nome"}, {"data": "matricula"}, {"data": "numeroPortaria"}, {"data": "anoPortaria"}, {"data": "dataPortaria"}], oLanguage: {
            "sZeroRecords": "Nenhuma fiscal para este controle", "sInfoEmpty": "Nenhum registro disponível", "sInfoFiltered": "(filtrado _MAX_ do total de registros)", "sStripClasses": "", "sSearch": "", "sSearchPlaceholder": "Digite aqui palavras-chave", "sInfo": "_START_ -_END_ de _TOTAL_", "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="3">3</option><option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }
    });
};
ListaControlesViewModel.prototype.showPageDisplay = function (idControle) {
    var self = this;
    self.getControle(idControle);
    self.getContratosToDisplay(idControle);
    self.getMedicoesPagas({"idControle": idControle});
    self.getMedicoesAbetas({"idControle": idControle});
    self.getFiscaisToDisplay(idControle);
    $().animatedModalOpem('exibirControleModal', 'bounceInRight', 'bounceOutRight', function () {
    });
};
/** PAGINA DE EDIÇÃO **/
ListaControlesViewModel.prototype.validaFormControle = function () {
    var self = this;

    /** FORMULARIO EDITA CONTROLE**/
    if (!self.selectEditModalidade.val())
    {
        self.selectEditModalidade.focus();
        alert('Selecione uma modalidade!');
        return false;
    }
    if (!self.inputEditSetor.val())
    {
        self.inputEditSetor.focus();
        alert('Selecione um setor!');
        return false;
    }
    if (!self.inputEditEmpresa.val())
    {
        self.inputEditEmpresa.focus();
        alert('Selecione uma empresa!');
        return false;
    }

    return true;
};
ListaControlesViewModel.prototype.saveControle = function () {
    var self = this;

    if (!self.validaFormControle())
    {
        return false;
    }

    /** OBTEM DADOS DO FORMULARIO **/
    var dataToSender = {
        'numeroControle': self.inputEditNumeroControle.val(), 'idOrganograma': self.inputEditSetor.attr('data-content'), 'modalidade': self.selectEditModalidade.val(), 'idPessoa': self.inputEditEmpresa.attr('data-content'), 'previsaoGasto': self.inputEditPrevisaoGasto.val(), 'objeto': self.textAreaEditObjeto.val(), "concluido": false
    };

    self.customLoading.show();

    this.restClient.setDataToSender(dataToSender);
    self.restClient.setWebServiceURL(this.webserviceSiscecBaseURL + 'controles/' + self.idControle);
    self.restClient.setMethodPUT();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.idControle = data['idControle'];
        //console.log(data);
        alert('Salvo com sucesso!');
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        self.customLoading.hide();
        alert('Erro oa salvar o controle');
    });
    self.restClient.exec();
};
ListaControlesViewModel.prototype.showPageEdit = function (idControle) {
    var self = this;
    self.idControle = idControle;
    self.getControle(idControle);
    self.getFiscaisToEdit(idControle);
    self.getContratosToEdit(idControle);
    $().animatedModalOpem('gerenciaControleModal', 'bounceInRight', 'bounceOutRight', function () {
    });
};
//EDITA FISCAL
ListaControlesViewModel.prototype.getFiscaisToEdit = function (idControle) {
    var self = this;
    if (self.dataTableFiscalToEdit !== null)
    {
        self.dataTableFiscalToEdit.destroy();
    }
    self.dataTableFiscalToEdit = self.tableFiscalToEdit.DataTable({
        info: false, bPaginate: true, bAutoWidth: false, responsive: true, processing: true, serverSide: true, ordering: false, searching: true, ajax: {
            url: self.webserviceSiscecBaseURL + "fiscais", type: "POST", data: {"idControle": idControle}
        }, columns: [{
            "data": "id", "class": "dataTableColSelect", width: "50px", "render": function (data, type, full, meta) {
                return '<div class="dataTableCheckBox"><input type="checkbox" id="listFiscalToEditCheckRow' + data + '"/><label for="listFiscalToEditCheckRow' + data + '"></label></div>';
            }
        }, {"data": "pessoa.nome"}, {"data": "matricula"}, {"data": "numeroPortaria"}, {"data": "anoPortaria"}, {"data": "dataPortaria"}], "initComplete": function (settings, json) {
            //
        }, oLanguage: {
            "sZeroRecords": "Nenhuma fiscal para este controle", "sInfoEmpty": "Nenhum registro disponível", "sInfoFiltered": "(filtrado _MAX_ do total de registros)", "sStripClasses": "", "sSearch": "", "sSearchPlaceholder": "Digite aqui palavras-chave", "sInfo": "_START_ -_END_ de _TOTAL_", "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="3">3</option><option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }
    });

    dataTableSelectAll(self.tableFiscalToEdit, self.dataTableFiscalToEdit, self.dataTableFiscalToEditSelectedId);
    dataTableSelect(self.tableFiscalToEdit, self.dataTableFiscalToEdit, self.dataTableFiscalToEditSelectedId);
};
ListaControlesViewModel.prototype.fillFormFiscal = function (data) {
    var self = this;
    self.inputEditNomeFiscal.val(data["pessoa"]["nome"]);
    self.inputEditNomeFiscal.attr('data-content', data["idPessoa"]);
    self.inputEditMatricula.val(data["matricula"]);
    self.inputEditNumeroPortaria.val(data["numeroPortaria"]);
    self.inputEditAnoPortaria.val(data["anoPortaria"]);
    self.inputEditDataPortaria.val(data["dataPortaria"]);
    self.updateInputFields();
};
ListaControlesViewModel.prototype.resetFormFiscal = function () {
    var self = this;
    self.idFiscal = null;
    self.inputEditNomeFiscal.val('');
    self.inputEditNomeFiscal.attr('data-content', '');
    self.inputEditMatricula.val('');
    self.inputEditNumeroPortaria.val('');
    self.inputEditAnoPortaria.val('');
    self.inputEditDataPortaria.val('');
    self.updateInputFields();
};
ListaControlesViewModel.prototype.validaFormFiscal = function () {
    var self = this;

    if (!self.inputEditNomeFiscal.val())
    {
        self.inputEditNomeFiscal.focus();
        alert('Selecione uma pessoa!');
        return false;
    }
    if (!self.inputEditMatricula.val())
    {
        self.inputEditMatricula.focus();
        alert('Digite a matricula!');
        return false;
    }
    if (!validaData(self.inputEditDataPortaria.val()))
    {
        self.inputEditDataPortaria.focus();
        alert('Digite uma data valida!');
        return false;
    }
    return true;
};
ListaControlesViewModel.prototype.saveFiscal = function () {
    var self = this;

    if (!self.validaFormFiscal())
    {
        return false;
    }
    /** OBTEM DADOS DO FORMULARIO **/
    var dataToSender = {
        'idControle': self.idControle, 'matricula': self.inputEditMatricula.val(), 'numeroPortaria': self.inputEditNumeroPortaria.val(), 'anoPortaria': self.inputEditAnoPortaria.val(), 'dataPortaria': self.inputEditDataPortaria.val(), 'idPessoa': self.inputEditNomeFiscal.attr('data-content')
    };
    var id = self.idFiscal ? '/' + self.idFiscal : '';
    //console.log(JSON.stringify(dataToSender));
    self.customLoading.show();
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setWebServiceURL(this.webserviceSiscecBaseURL + 'fiscais' + id);
    self.restClient.setMethodPUT();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.dataTableFiscalToEdit.ajax.reload();
        self.resetFormFiscal();
        alert('Salvo com sucesso!');
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        self.customLoading.hide();
        alert('Erro oa salvar fiscal');
    });
    self.restClient.exec();
};
ListaControlesViewModel.prototype.deleteFiscais = function () {
    var self = this;
    var ids = self.dataTableFiscalToEditSelectedId;
    //console.log(ids);
    if (ids.length === 0)
    {
        alert('Você não selecionou nenhum item a ser deletado!');
        return;
    }
    var dataToSender = {'ids': ids};
    self.customLoading.show();
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'fiscais');
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setMethodDELETE();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        alert(data['message']);
        self.reloadTableFiscaisToEdit();
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        // console.log(jqXHR);
        alert('Erro ao deletar fiscal');
    });
    self.restClient.exec();
};
ListaControlesViewModel.prototype.reloadTableFiscaisToEdit = function () {
    var self = this;
    emptyArray(self.dataTableFiscalToEditSelectedId);
    self.dataTableFiscalToEdit.ajax.reload();
};
//EDITA CONTRATO
ListaControlesViewModel.prototype.getContratosToEdit = function (idControle) {
    var self = this;
    var dataToSend = {"idControle": idControle};

    if (self.dataTableContratoToEdit !== null)
    {
        self.dataTableContratoToEdit.destroy();
    }
    self.dataTableContratoToEdit = self.tableContratoToEdit.DataTable({
        info: false, bPaginate: true, bAutoWidth: false, responsive: true, processing: true, serverSide: true, ordering: false, searching: true, "ajax": {
            url: self.webserviceSiscecBaseURL + "contratos", type: "POST", data: dataToSend
        }, "columns": [{
            "data": "id", "class": "dataTableColSelect", width: "50px", "render": function (data, type, full, meta) {
                return '<div class="dataTableCheckBox"><input type="checkbox" id="listContratoToEditCheckRow' + data + '"/><label for="listContratoToEditCheckRow' + data + '"></label></div>';
            }
        }, {
            "data": "numeroProcesso", "render": function (data, type, row) {
                return data + '/' + row['anoProcesso'];
            }
        }, {
            "data": "numeroContrato", "render": function (data, type, row) {
                return data + '/' + row['anoContrato'];
            }
        }, {
            "data": "dataInicio", "render": function (data, type, row) {
                return sqlDateToBrasilDate(data);
            }
        }, {
            "data": "dataFim", "render": function (data, type, row) {
                return sqlDateToBrasilDate(data);
            }
        }, {
            "data": "tipoContrato", "render": function (data, type, row) {
                return listaTipoContrato[data];
            }
        }, {
            "data": "situacao", "render": function (data, type, row) {
                return listaStatusContrato[data];
            }
        }, {
            "data": "valor", "class": "indigo-text darken-1", "render": function (data, type, row) {
                return data;
            }
        }, {
            "data": "empenhado", "class": "purple-text darken-1", "render": function (data, type, row) {
                return data;
            }
        }, {
            "data": "pago", "class": "blue-text darken-1", "render": function (data, type, row) {
                data = data != null ? data : '0';
                return data;
            }
        }, {
            "data": "saldo", "render": function (data, type, row) {
                data = data != null ? data : '0';
                var yes = '<span class="light-green-text text-darken-2">' + data + '</span>';
                var no = '<span class="red-text text-darken-2">' + data + '</span>';
                data = brCurrencyToFloat(data) === 0 ? no : yes;
                return data;
            }
        }, {
            "data": "dataAditivo", "render": function (data, type, row) {
                var yes = '<i class="material-icons green-text text-darken-2">check</i>';
                var no = '<i class="material-icons red-text text-darken-2">clear</i>';
                data = data != null ? yes : no;
                return data;
            }
        }], "initComplete": function () {

        }, oLanguage: {
            "sZeroRecords": "Nenhum contrato cadastrado para este controle", "sInfoEmpty": "Nenhum registro disponível", "sInfoFiltered": "(filtrado _MAX_ do total de registros)", "sStripClasses": "", "sSearch": "", "sSearchPlaceholder": "Digite aqui palavras-chave", "sInfo": "_START_ -_END_ de _TOTAL_", "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }
    });

    dataTableSelectAll(self.tableContratoToEdit, self.dataTableContratoToEdit, self.dataTableContratoToEditSelectedId);
    dataTableSelect(self.tableContratoToEdit, self.dataTableContratoToEdit, self.dataTableContratoToEditSelectedId);

};
ListaControlesViewModel.prototype.fillFormContrato = function (data) {
    var self = this;
    //console.log(data);
    self.inputNumeroProcessoContrato.val(data['numeroProcesso']);
    self.inputAnoProcessoContrato.val(data['anoProcesso']);
    self.inputNumeroContrato.val(data['numeroContrato']);
    self.inputAnoContrato.val(data['anoContrato']);
    self.inputDataInicioContrato.val(sqlDateToBrasilDate(data['dataInicio']));
    self.inputDataFimContrato.val(sqlDateToBrasilDate(data['dataFim']));
    self.inputValorContrato.val(data['valor']);
    self.selectTipoContrato.val(data['tipoContrato']);
    self.selectSituacaoContrato.val(data['situacao']);
    self.selectTipoAditivoContrato.val(data['tipoAditivo']);
    self.inputPrazoAditivarContrato.val(data['prazoLimiteAditivo']);
    self.inputDataFimAditivarContrato.val('');
    self.updateInputFields();
    self.showDataFimAditivar();
};
ListaControlesViewModel.prototype.resetFormContrato = function () {
    var self = this;
    self.idContrato = null;
    self.inputNumeroProcessoContrato.val('');
    self.inputAnoProcessoContrato.val('');
    self.inputNumeroContrato.val('');
    self.inputAnoContrato.val('');
    self.inputDataInicioContrato.val('');
    self.inputDataFimContrato.val('');
    self.inputValorContrato.val('');
    self.selectTipoContrato.val('');
    self.selectSituacaoContrato.val('');
    self.selectTipoAditivoContrato.val('');
    self.inputPrazoAditivarContrato.val('');
    self.inputDataFimAditivarContrato.val('');
    self.updateInputFields();
};
ListaControlesViewModel.prototype.reloadTableContratosToEdit = function () {
    var self = this;
    emptyArray(self.dataTableListaContratoRowsSelected);
    self.dataTableContratoToEdit.ajax.reload();
};
ListaControlesViewModel.prototype.validaFormContrato = function () {
    var self = this;

    if (!self.inputNumeroProcessoContrato.val())
    {
        self.inputNumeroProcessoContrato.focus();
        alert('Digite o número do processo!');
        return false;
    }
    if (!self.inputAnoProcessoContrato.val())
    {
        self.inputAnoProcessoContrato.focus();
        alert('Digite o ano do processo!');
        return false;
    }
    if (!self.inputNumeroContrato.val())
    {
        self.inputNumeroContrato.focus();
        alert('Digite o número do contrato!');
        return false;
    }
    if (!self.inputAnoContrato.val())
    {
        self.inputAnoContrato.focus();
        alert('Digite o ano do contrato!');
        return false;
    }
    if (!validaData(self.inputDataInicioContrato.val()))
    {
        self.inputDataInicioContrato.focus();
        alert('Digite uma data valida para inicio do contrato!');
        return false;
    }
    if (!validaData(self.inputDataFimContrato.val()))
    {
        self.inputDataFimContrato.focus();
        alert('Digite uma data valida para fim do contrato!');
        return false;
    }
    if (!self.inputValorContrato.val())
    {
        self.inputValorContrato.focus();
        alert('Digite o valor do contrato!');
        return false;
    }
    if (!self.selectTipoContrato.val())
    {
        self.selectTipoContrato.focus();
        alert('Selecione o tipo de contrato!');
        return false;
    }
    if (!self.selectTipoAditivoContrato.val())
    {
        self.selectTipoAditivoContrato.focus();
        alert('Selecione o tipo aditivo do contrato!');
        return false;
    }
    if (!self.selectSituacaoContrato.val())
    {
        self.selectSituacaoContrato.focus();
        alert('Selecione a situação do contrato!');
        return false;
    }
    if (!self.inputPrazoAditivarContrato.val())
    {
        self.inputPrazoAditivarContrato.focus();
        alert('Digite o prazo de aditivo em dias!');
        return false;
    }
    return true;
};
ListaControlesViewModel.prototype.saveContrato = function () {
    var self = this;

    if (!self.validaFormContrato())
    {
        return false;
    }

    /** OBTEM DADOS DO FORMULARIO **/
    var dataToSender = {
        'idControle': self.idControle, 'numeroProcesso': self.inputNumeroProcessoContrato.val(), 'anoProcesso': self.inputAnoProcessoContrato.val(), 'numeroContrato': self.inputNumeroContrato.val(), 'anoContrato': self.inputAnoContrato.val(), 'dataInicio': self.inputDataInicioContrato.val(), 'dataFim': self.inputDataFimContrato.val(), 'valor': self.inputValorContrato.val(), 'tipoContrato': self.selectTipoContrato.val(), 'tipoAditivo': self.selectTipoAditivoContrato.val(), 'situacao': self.selectSituacaoContrato.val(), 'prazoLimiteAditivo': self.inputPrazoAditivarContrato.val(), 'dataLimitAditivo': self.inputDataFimAditivarContrato.val()
    };
    //console.log(JSON.stringify(dataToSender));
    self.customLoading.show();
    self.restClient.setDataToSender(dataToSender);
    var id = self.idContrato ? "/" + self.idContrato : "";
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'contratos' + id);
    self.restClient.setMethodPUT();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.resetFormContrato();
        self.reloadTableContratosToEdit();
        self.alertAPI.showModal(ModalAPI.SUCCESS, "Sucesso", data['message'], "OK");
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        self.customLoading.hide();
        self.alertAPI.showModal(ModalAPI.ERROR, "Erro", jqXHR.responseJSON, "OK");
    });
    self.restClient.exec();
};
ListaControlesViewModel.prototype.deleteContratos = function () {
    var self = this;
    var ids = self.dataTableContratoToEditSelectedId;
    if (ids.length === 0)
    {
        alert('Você não selecionou nenhum item a ser deletado.');
        return;
    }
    var dataToSender = {'ids': ids};
    self.customLoading.show();
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'contratos');
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setMethodDELETE();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.reloadTableContratosToEdit();
        alert(data['message']);
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        // console.log(jqXHR);
        alert('Erro ao deletar contrato');
    });
    self.restClient.exec();
};
ListaControlesViewModel.prototype.showDataFimAditivar = function () {
    var self = this;
    if (!validaData(self.inputDataFimContrato.val()))
    {
        self.inputDataFimAditivarContrato.val("Digite a data fim");
        self.updateInputFields();
        return;
    }

    var myDate = moment(self.inputDataFimContrato.val(), 'DD-MM-YYYY')
        .subtract(self.inputPrazoAditivarContrato.val(), "days").format("DD/MM/YYYY");
    self.inputDataFimAditivarContrato.val(myDate);
    self.updateInputFields();
};