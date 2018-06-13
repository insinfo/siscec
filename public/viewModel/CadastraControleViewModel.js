$(document).ready(function () {
    var cadControleViewModel = new CadastroControleViewModel();
    cadControleViewModel.init();
});

function CadastroControleViewModel()
{
    this.webservicePmroBaseURL = WEBSERVICE_PMRO_BASE_URL;
    this.webserviceSiscecBaseURL = WEBSERVICE_SISCEC_BASE_URL;
    this.customLoading = new CustomLoading('loading');
    this.restClient = new RESTClient();

    // FORMULARIO CADASTRA CONTROLE
    this.inputNumeroControle = $('#inputNumeroControle');
    this.inputSetor = $('#inputSetor');
    this.inputEmpresa = $('#inputEmpresa');
    this.selectModalidade = $('#selectModalidade');
    this.inputPrevisaoGasto = $('#inputPrevisaoGasto');
    this.textAreaObjeto = $('#textAreaObjeto');
    this.btnSalvarControle = $('#btnSalvarControle');
    this.idControle = '';

    // FORMULARIO CADASTRO FISCAL
    this.inputNomeFiscal = $('#inputNomeFiscal');
    this.inputMatricula = $('#inputMatricula');
    this.inputNumeroPortaria = $('#inputNumeroPortaria');
    this.inputAnoPortaria = $('#inputAnoPortaria');
    this.inputDataPortaria = $('#inputDataPortaria');
    this.btnSalvarFiscal = $('#btnSalvarFiscal');
    this.tableListaFiscais = $('#tableListaFiscais');
    this.dataTableListaFiscais = null;
    this.btnUpdateListaFiscal = $('#btnUpdateListaFiscal');
    this.btnDeleteListaFiscal = $('#btnDeleteListaFiscal');
    this.checkboxListaFiscalSelectAll = $('#checkboxListaFiscalSelectAll');
    // Array de IDs das linhas selecionadas do dataTableListaFiscais
    this.dataTableListaFiscalRowsSelected = [];

    //FORMULARIO CADASTRO CONTRATO
    this.inputNumeroProcesso = $('#inputNumeroProcesso');
    this.inputAnoProcesso = $('#inputAnoProcesso');
    this.inputNumeroContrato = $('#inputNumeroContrato');
    this.inputAnoContrato = $('#inputAnoContrato');
    this.inputDataInicio = $('#inputDataInicio');
    this.inputDataFim = $('#inputDataFim');
    this.inputValor = $('#inputValor');
    this.selectTipoContrato = $('#selectTipoContrato');
    this.selectTipoAditivo = $('#selectTipoAditivo');
    this.selectSituacaoContrato = $('#selectSituacaoContrato');
    this.inputPrazoAditivar = $('#inputPrazoAditivar');
    this.inputDataFimAditivar = $('#inputDataFimAditivar');
    this.btnSalvarContrato = $('#btnSalvarContrato');
    this.tableListaContrato = $('#tableListaContrato');
    this.dataTableListaContrato = null;
    this.btnUpdateListaContrato = $('#btnUpdateListaContrato');
    this.btnDeleteListaContrato = $('#btnDeleteListaContrato');
    this.checkboxListaContratoSelectAll = $('#checkboxListaContratoSelectAll');
    // Array de IDs das linhas selecionadas do dataTableListaContrato
    this.dataTableListaContratoRowsSelected = [];

    //modal setor
    this.modalSetor = new CustomModal('modalSetor');
    this.inputModalBuscaSetor = $('#inputModalBuscaSetor');
    this.treeViewModalBuscaSetor = $('#treeViewModalBuscaSetor');

    //modal empresa
    this.modalEmpresa = new CustomModal('modalEmpresa');
    this.tablePessoaJuridica = $('#tablePessoaJuridica');
    this.dataTablesPessoaJuridica = null;

    //modal pessoa fisica
    this.modalPessoaFisica = new CustomModal('modalPessoaFisica');
    this.tablePessoaFisica = $('#tablePessoaFisica');
    this.dataTablesPessoaFisica = null;
}
CadastroControleViewModel.prototype.init = function () {
    var self = this;
    // MATERIALIZE
    $('ul.tabs').tabs();
    $('select').material_select();
    $('.modal').modal();

    self.eventos();
    self.getNumeroControle();
    self.maskForm();
};
CadastroControleViewModel.prototype.updateInputs = function () {
    Materialize.updateTextFields();
    $('select').material_select();
};
CadastroControleViewModel.prototype.getSetores = function (inputDOM) {
    var self = this;
    var correnteInput = $(inputDOM);
    self.customLoading.show();
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'secretarias');
    self.restClient.setMethodGET();
    self.restClient.setSuccessCallbackFunction(function (setoresData) {

        self.customLoading.hide();

        self.treeViewModalBuscaSetor.treeview({
            data: setoresData, onNodeSelected: function (event, node) {
                correnteInput.val(node['text']);
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
CadastroControleViewModel.prototype.getEmpresas = function (inputDOM) {
    var self = this;
    inputDOM = $(inputDOM);
    self.modalEmpresa.open();
    if (self.dataTablesPessoaJuridica !== null)
    {
        self.dataTablesPessoaJuridica.destroy();
    }
    // inicializa dataTables pessoa juridica
    self.dataTablesPessoaJuridica = self.tablePessoaJuridica.DataTable({
        order: [[1, 'asc']], oLanguage: {
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Digite aqui palavras-chave",
            "sInfo": "_START_ -_END_ de _TOTAL_",
            "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }, bAutoWidth: false, responsive: true, processing: true,
        serverSide: true, ordering: false, ajax: {
            url: self.webserviceSiscecBaseURL + "pessoas/datatable",
            type: "POST", data: {'tipo': 'juridica'}
        }, columns: [{"data": "id", width: "50px"},
            {"data": "nomeFantasia", 'class': 'dataTableClick'}, {
            "data": "nome", 'class': 'dataTableClick'
        }, {"data": "cnpj", 'class': 'dataTableClick'},
            {"data": "inscricaoEstadual", 'class': 'dataTableClick'}, {
            "data": "emailPrincipal", 'class': 'dataTableClick'
        }]
    });

    self.tablePessoaJuridica.on('click', 'tbody tr', function () {
        var data = self.dataTablesPessoaJuridica.row(this).data();
        inputDOM.val(data['nome']);
        inputDOM.attr('data-content', data['id']);
        self.modalEmpresa.close();
    });

};
CadastroControleViewModel.prototype.getPessoaFisicas = function () {
    var self = this;
    self.modalPessoaFisica.open();

    if (self.dataTablesPessoaFisica !== null)
    {
        self.dataTablesPessoaFisica.destroy();
    }

    // inicializa dataTables pessoa fisica
    self.dataTablesPessoaFisica = self.tablePessoaFisica.DataTable({
        'order': [[1, 'asc']], oLanguage: {
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Digite aqui palavras-chave",
            "sInfo": "_START_ -_END_ de _TOTAL_",
            "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }, bAutoWidth: false, responsive: true,
        processing: true, serverSide: true, ordering:
            false, ajax: {
            url: self.webserviceSiscecBaseURL + "pessoas/datatable",
            type: "POST", data: {'tipo': 'fisica'}
        }, columns: [{"data": "id", width: "50px"}, {"data": "nome", 'class': 'dataTableClick'}, {
            "data": "dataNascimento", 'class': 'dataTableClick', render: function (data, type, row) {
                return sqlDateToBrasilDate(data);
            }
        }, {"data": "sexo", 'class': 'dataTableClick'}, {"data": "cpf", 'class': 'dataTableClick'}, {
            "data": "rg", 'class': 'dataTableClick'
        }]
    });

    self.tablePessoaFisica.on('click', 'tbody tr', function () {
        var data = self.dataTablesPessoaFisica.row(this).data();
        self.inputNomeFiscal.val(data['nome']);
        self.inputNomeFiscal.attr('data-content', data['id']);
        self.modalPessoaFisica.close();
    });

};
CadastroControleViewModel.prototype.maskForm = function () {
    var self = this;
    self.inputDataPortaria.mask('99/99/9999');
    self.inputDataInicio.mask('99/99/9999');
    self.inputDataFim.mask('99/99/9999');
    self.inputDataFimAditivar.mask('99/99/9999');
    self.inputValor.mask("#.##0,00", {reverse: true});
    self.inputPrevisaoGasto.mask("#.##0,00", {reverse: true});
    self.inputAnoPortaria.mask('9999');
    self.inputAnoProcesso.mask('9999');
    self.inputAnoContrato.mask('9999');
    //previne a entrada de letras no input prazo para aditivar
    preventsLetter(self.inputPrazoAditivar);
    //preventsLetter(self.inputPrevisaoGasto);
};
CadastroControleViewModel.prototype.getNumeroControle = function () {
    var self = this;
    self.customLoading.show();
    self.restClient.setWebServiceURL(this.webserviceSiscecBaseURL + 'serial');
    self.restClient.setMethodGET();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.inputNumeroControle.val(data['serial']);
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro em obter número do controle');
    });
    self.restClient.exec();
};
CadastroControleViewModel.prototype.validaFormControle = function () {
    var self = this;

    if (!self.inputSetor.val())
    {
        self.inputSetor.focus();
        alert('Selecione um setor!');
        return false;
    }
    if (!self.selectModalidade.val())
    {
        self.selectModalidade.focus();
        alert('Selecione uma modalidade!');
        return false;
    }
    if (!self.inputEmpresa.val())
    {
        self.inputEmpresa.focus();
        alert('Selecione uma empresa!');
        return false;
    }

    return true;
};
CadastroControleViewModel.prototype.saveControle = function () {
    var self = this;

    if (!self.validaFormControle())
    {
        return false;
    }
    //uso da lib "moment" para pegar a data atual
    var dataAtual = moment().locale("pt-br").format("DD/MM/YYYY");

    /** OBTEM DADOS DO FORMULARIO **/
    var dataToSender = {
        'numeroControle': self.inputNumeroControle.val(),
        'idOrganograma': self.inputSetor.attr('data-content'),
        'modalidade': self.selectModalidade.val(),
        'idPessoa': self.inputEmpresa.attr('data-content'),
        'previsaoGasto': self.inputPrevisaoGasto.val(),
        'objeto': self.textAreaObjeto.val(),
        'dataCadastro': dataAtual,
        "concluido": false
    };
    //console.log(JSON.stringify(dataToSender));
    self.customLoading.show();
    this.restClient.setDataToSender(dataToSender);
    self.restClient.setWebServiceURL(this.webserviceSiscecBaseURL + 'controles');
    self.restClient.setMethodPUT();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.idControle = data['idControle'];
        //console.log(data);
        alert('Salvo com sucesso!');
        self.resetFormControle();
        $('.collapsible').collapsible('open', 1);
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
CadastroControleViewModel.prototype.resetFormControle = function () {
    var self = this;
    // FORMULARIO CADASTRA CONTROLE
    self.getNumeroControle();
    self.inputSetor.val('');
    self.inputSetor.attr('data-content','');
    self.inputEmpresa.val('');
    self.inputEmpresa.attr('data-content','');
    self.selectModalidade.val('');
    self.inputPrevisaoGasto.val('');
    self.textAreaObjeto.val('');
    self.updateInputs();
};
//FISCAL
CadastroControleViewModel.prototype.resetFormFiscal = function () {
    var self = this;
    // FORMULARIO CADASTRO FISCAL
    self.inputNomeFiscal.val('');
    self.inputNomeFiscal.attr('data-content','');
    self.inputMatricula.val('');
    self.inputNumeroPortaria.val('');
    self.inputAnoPortaria.val('');
    self.inputDataPortaria.val('');
    self.updateInputs();
};
CadastroControleViewModel.prototype.validaFormFiscal = function () {
    var self = this;

    if (!self.inputNomeFiscal.val())
    {
        self.inputNomeFiscal.focus();
        alert('Selecione uma pessoa!');
        return false;
    }
    if (!self.inputMatricula.val())
    {
        self.inputMatricula.focus();
        alert('Digite a matricula!');
        return false;
    }

    if (!validaData(self.inputDataPortaria.val()))
    {
        self.inputDataPortaria.focus();
        alert('Digite uma data valida!');
        return false;
    }
    return true;
};
CadastroControleViewModel.prototype.saveFiscal = function () {
    var self = this;

    if (self.idControle === '')
    {
        alert('Cadastre um controle primeiro');
        return false;
    }

    if (!self.validaFormFiscal())
    {
        return false;
    }

    /** OBTEM DADOS DO FORMULARIO **/
    var dataToSender = {
        'idControle': self.idControle,
        'matricula': self.inputMatricula.val(),
        'numeroPortaria': self.inputNumeroPortaria.val(),
        'anoPortaria': self.inputAnoPortaria.val(),
        'dataPortaria': self.inputDataPortaria.val(),
        'idPessoa': self.inputNomeFiscal.attr('data-content')
    };

    //console.log(JSON.stringify(dataToSender));
    self.customLoading.show();
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setWebServiceURL(this.webserviceSiscecBaseURL + 'fiscais');
    self.restClient.setMethodPUT();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        //console.log(data);
        self.getFiscais(self.idControle);
        self.resetFormFiscal();
        //$('.collapsible').collapsible('open', 2);
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
CadastroControleViewModel.prototype.deleteFiscais = function () {
    var self = this;
    var ids = self.dataTableListaFiscalRowsSelected;
    if (ids.length === 0)
    {
        alert('Você não selecionou nenhum item a ser deletado ');
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
        self.reloadFiscais();
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        // console.log(jqXHR);
        alert('Erro ao deletar fiscal');
    });
    self.restClient.exec();
};
CadastroControleViewModel.prototype.getFiscais = function (idControle) {
    var self = this;

    if (self.dataTableListaFiscais !== null)
    {
        self.dataTableListaFiscais.destroy();
    }
    // inicializa dataTables lista fiscal
    self.dataTableListaFiscais = self.tableListaFiscais.DataTable({
        order: [[0, 'asc']],
        info: false,
        bPaginate: true,
        bAutoWidth: false,
        responsive: true,
        processing: true,
        serverSide: true,
        ordering: false,
        searching: true,
        ajax: {
            url: self.webserviceSiscecBaseURL + "fiscais",
            type: "POST",
            data: {'idControle': idControle}
        },
        columns:
            [
                {
                "data": "id", width: "50px", render: function (data, type, full, meta) {
                    return '<div class="dataTableCheckBox"><input type="checkbox" id="listaFiscalCheckRow' + data + '"/><label for="listaFiscalCheckRow' + data + '"></label></div>';
                }
            },
            {"data": "pessoa.nome", 'class': 'dataTableClick'},
            {"data": "matricula", 'class': 'dataTableClick'},
            {"data": "numeroPortaria", 'class': 'dataTableClick'},
            {"data": "anoPortaria", 'class': 'dataTableClick'},
            {"data": "dataPortaria", 'class': 'dataTableClick'}
        ],

        oLanguage: {
            "sZeroRecords": "Nenhum fiscal cadastrado para este controle",
            "sInfoEmpty": "Nenhum registro disponível",
            "sInfoFiltered": "(filtrado _MAX_ do total de registros)",
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Digite aqui palavras-chave",
            "sInfo": "_START_ -_END_ de _TOTAL_",
            "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }
    });

    //abilita o checkbox select all
    dataTableSelectAll(self.tableListaFiscais, self.dataTableListaFiscais, self.dataTableListaFiscalRowsSelected);

    //abilita a seleção
    dataTableSelect(self.tableListaFiscais, self.dataTableListaFiscais, self.dataTableListaFiscalRowsSelected);


};
CadastroControleViewModel.prototype.reloadFiscais = function () {
    var self = this;
    emptyArray(self.dataTableListaFiscalRowsSelected);
    self.dataTableListaFiscais.ajax.reload();
};
//CONTRATO
CadastroControleViewModel.prototype.resetFormContrato = function () {
    var self = this;
    //FORMULARIO CADASTRO CONTRATO
    self.inputNumeroProcesso.val('');
    self.inputAnoProcesso.val('');
    self.inputNumeroContrato.val('');
    self.inputAnoContrato.val('');
    self.inputDataInicio.val('');
    self.inputDataFim.val('');
    self.inputValor.val('');
    self.selectTipoContrato.val('0');
    self.selectTipoAditivo.val('');
    self.selectSituacaoContrato.val('');
    self.inputPrazoAditivar.val('');
    self.updateInputs();
};
CadastroControleViewModel.prototype.validaFormContrato = function () {
    var self = this;

    if (!self.inputNumeroProcesso.val())
    {
        self.inputNumeroProcesso.focus();
        alert('Digite o número do processo!');
        return false;
    }
    if (!self.inputAnoProcesso.val())
    {
        self.inputAnoProcesso.focus();
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
    if (!validaData(self.inputDataInicio.val()))
    {
        self.inputDataInicio.focus();
        alert('Digite uma data valida para inicio do contrato!');
        return false;
    }
    if (!validaData(self.inputDataFim.val()))
    {
        self.inputDataFim.focus();
        alert('Digite uma data valida para fim do contrato!');
        return false;
    }
    if (!self.inputValor.val())
    {
        self.inputValor.focus();
        alert('Digite o valor do contrato!');
        return false;
    }
    if (!self.selectTipoAditivo.val())
    {
        self.selectTipoAditivo.focus();
        alert('Selecione o tipo de aditivo!');
        return false;
    }
    if (!self.selectSituacaoContrato.val())
    {
        self.selectSituacaoContrato.focus();
        alert('Selecione o status do contrato!');
        return false;
    }
    if (!self.inputPrazoAditivar.val())
    {
        self.inputPrazoAditivar.focus();
        alert('Digite o prazo de aditivo em dias!');
        return false;
    }
    return true;
};
CadastroControleViewModel.prototype.saveContrato = function () {
    var self = this;

    if (self.idControle === '')
    {
        alert('Cadastre um controle primeiro');
        return false;
    }

    if (!self.validaFormContrato())
    {
        return false;
    }

    /** OBTEM DADOS DO FORMULARIO **/
    var dataToSender = {
        'idControle': self.idControle,
        'numeroProcesso': self.inputNumeroProcesso.val(),
        'anoProcesso': self.inputAnoProcesso.val(),
        'numeroContrato': self.inputNumeroContrato.val(),
        'anoContrato': self.inputAnoContrato.val(),
        'dataInicio': self.inputDataInicio.val(),
        'dataFim': self.inputDataFim.val(),
        'valor': self.inputValor.val(),
        'tipoContrato': self.selectTipoContrato.val(),
        'tipoAditivo': self.selectTipoAditivo.val(),
        'situacao': self.selectSituacaoContrato.val(),
        'prazoLimiteAditivo': self.inputPrazoAditivar.val(),
        'dataLimitAditivo': self.inputDataFimAditivar.val()
    };

    // console.log(JSON.stringify(dataToSender));

    self.customLoading.show();
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setWebServiceURL(this.webserviceSiscecBaseURL + 'contratos');
    self.restClient.setMethodPUT();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.getContratos(self.idControle);
        self.resetFormContrato();
        self.selectTipoContrato.val(1);
        self.updateInputs();
        //$('.collapsible').collapsible('open', 3);
        alert('Salvo com sucesso!');
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        self.customLoading.hide();
        alert('Erro oa salvar Contrato');
    });
    self.restClient.exec();
};
CadastroControleViewModel.prototype.getContratos = function (idControle) {
    var self = this;
    if (self.dataTableListaContrato !== null)
    {
        self.dataTableListaContrato.destroy();
    }
    // inicializa dataTables lista contrato
    self.dataTableListaContrato = self.tableListaContrato.DataTable({
        order: [[0, 'asc']],
        info: false,
        bPaginate: true,
        bAutoWidth: false,
        responsive: true,
        processing: true,
        serverSide: true,
        ordering: false,
        searching: true,
        ajax: {
            url: self.webserviceSiscecBaseURL + "contratos",
            type: "POST",
            data: {'idControle': idControle}
        },
        columns: [{
            "data": "id", width: "50px", render: function (data, type, full, meta) {
                return '<div class="dataTableCheckBox"><input type="checkbox" id="listaContratoCheckRow' + data + '"/><label for="listaContratoCheckRow' + data + '"></label></div>';
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
            "data": "valor"
        }],
        oLanguage: {
            "sZeroRecords": "Nenhum contrato cadastrado para este controle",
            "sInfoEmpty": "Nenhum registro disponível",
            "sInfoFiltered": "(filtrado _MAX_ do total de registros)",
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Digite aqui palavras-chave",
            "sInfo": "_START_ -_END_ de _TOTAL_",
            "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }
    });
    //abilita o checkbox select all
    dataTableSelectAll(self.tableListaContrato, self.dataTableListaContrato, self.dataTableListaContratoRowsSelected);
    //abilita a seleção
    dataTableSelect(self.tableListaContrato, self.dataTableListaContrato, self.dataTableListaContratoRowsSelected);

};
CadastroControleViewModel.prototype.deleteContratos = function (ids) {
    var self = this;
    if (ids.length === 0)
    {
        alert('Você não selecionou nenhum item a ser deletado ');
        return;
    }
    var dataToSender = {'ids': ids};
    self.customLoading.show();
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'contratos');
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setMethodDELETE();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.reloadContratos();
        alert(data['message']);
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        // console.log(jqXHR);
        alert('Erro ao deletar contrato');
    });
    self.restClient.exec();
};
CadastroControleViewModel.prototype.reloadContratos = function () {
    var self = this;
    emptyArray(self.dataTableListaContratoRowsSelected);
    self.dataTableListaContrato.ajax.reload();
};
CadastroControleViewModel.prototype.eventos = function () {
    var self = this;

    self.inputSetor.click(function () {
        self.getSetores(this);
    });

    self.inputNomeFiscal.click(function () {
        self.getPessoaFisicas();
    });

    self.inputEmpresa.click(function () {
        self.getEmpresas(this);
    });

    //evento botão salvar controle
    self.btnSalvarControle.click(function () {
        self.saveControle();
    });
    //evento botão salvar fiscal
    self.btnSalvarFiscal.click(function () {
        self.saveFiscal();
    });
    //evento botão salvar contrato
    self.btnSalvarContrato.click(function () {
        self.saveContrato();
    });

    //exibe a data final para aditivar de acordo com a quantidade de dias digitados
    self.inputPrazoAditivar.on('input', function () {
        if (this.value.length > this.maxLength)
        {
            this.value = this.value.slice(0, this.maxLength);
        }

        if (!validaData(self.inputDataFim.val()))
        {
            self.inputDataFimAditivar.val("Digite a data fim");
            self.updateInputs();
            return false
        }

        var myDate = moment(self.inputDataFim.val(), 'DD-MM-YYYY').subtract(self.inputPrazoAditivar.val(), "days").format("DD/MM/YYYY");
        self.inputDataFimAditivar.val(myDate);
        self.updateInputs();
    });

    /******** FISCAIS *********/
    //atualiza a lista de fiscais
    self.btnUpdateListaFiscal.click(function () {
        self.reloadFiscais();
    });
    //evento que deleta os contratos selecionados no dataTables
    self.btnDeleteListaFiscal.click(function () {
       self.deleteFiscais();
    });
    /******** CONTRATOS *********/
    //atualiza a lista de contratos
    self.btnUpdateListaContrato.click(function () {
        self.reloadContratos();
    });
    //evento que deleta os contratos selecionados no dataTables
    self.btnDeleteListaContrato.click(function () {
        self.deleteContratos(self.dataTableListaContratoRowsSelected);
    });

};

