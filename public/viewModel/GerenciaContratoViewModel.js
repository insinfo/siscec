$(document).ready(function () {
    var gerenciaContratoViewModel = new GerenciaContratoViewModel();
    gerenciaContratoViewModel.init();
});

function GerenciaContratoViewModel()
{
    this.webservicePmroBaseURL = WEBSERVICE_PMRO_BASE_URL;
    this.webserviceSiscecBaseURL = WEBSERVICE_SISCEC_BASE_URL;
    this.customLoading = new CustomLoading('loading');
    this.restClient = new RESTClient();

    //LISTA CONTRATOS
    this.dataTableExibeContratos = null;
    this.tableExibeContratos = $('#tableExibeContratos');

    //FORMULARIO CADASTRO CONTRATO
    this.inputNumeroControle = $('#inputNumeroControle');
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
    this.dataTableListaContratoRowsSelected = [];

    //modal controles
    this.modalControle = new CustomModal('modalControle');
    this.tableListaControle = $('#tableListaControle');
    this.dataTableListaControle = null;


}
GerenciaContratoViewModel.prototype.init = function () {
    var self = this;
    // INICIALIZA MATERIALIZE
    $('ul.tabs').tabs();
    $('select').material_select();
    $('.modal').modal();
    $('.collapsible').collapsible();

    // INICIALIZA EVENTOS
    self.getContratos();
    self.eventos();
    self.maskForm();
};
GerenciaContratoViewModel.prototype.getControles = function () {
    var self = this;

    self.modalControle.open();

    if (self.dataTableListaControle !== null)
    {
        self.dataTableListaControle.destroy();
    }

    // inicializa dataTables Lista Controle
    self.dataTableListaControle = self.tableListaControle.DataTable({
        info: false,
        bPaginate: true,
        bAutoWidth: false,
        responsive: true,
        processing: true,
        serverSide: true,
        ordering: false,
        searching: true,
        ajax: {
            url: self.webserviceSiscecBaseURL + 'controles', type: "POST"
        },
        columns: [
            { "data": "id", width: "50px"
            },
            {"data": "setorNome", 'class': 'dataTableClick'},
            {"data": "empresa.nome", 'class': 'dataTableClick'},
            {"data": "modalidade", 'class': 'dataTableClick', render: function (data, type, row) {
                return listaModalidades[data];
                }
            },
            {"data": "previsaoGasto", 'class': 'dataTableClick'},
            {"data": "objeto", 'class': 'dataTableClick'}],
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
};
GerenciaContratoViewModel.prototype.maskForm = function () {
    var self = this;

    self.inputDataInicio.mask('99/99/9999');
    self.inputDataFim.mask('99/99/9999');
    self.inputDataFimAditivar.mask('99/99/9999');
    self.inputValor.mask("#.##0,00", {reverse: true});


    self.inputAnoProcesso.mask('9999');
    self.inputAnoContrato.mask('9999');
    //previne a entrada de letras no input prazo para aditivar
    preventsLetter(self.inputPrazoAditivar);
    //preventsLetter(self.inputPrevisaoGasto);
};
GerenciaContratoViewModel.prototype.getContratos = function () {
    var self = this;

    if (self.dataTableExibeContratos !== null)
    {
        self.dataTableExibeContratos.destroy();
    }

    // inicializa dataTables Lista Contratos de um controle
    self.dataTableExibeContratos = self.tableExibeContratos.DataTable({
        info: false,
        bPaginate: true,
        bAutoWidth: false,
        responsive: true,
        processing: true,
        serverSide: true,
        ordering: false,
        searching: true,
        ajax: {
            url: self.webserviceSiscecBaseURL + "contratos", type: "POST"
        },
        columns:
            [
            { "data": "id", width: "50px", "render": function (data, type, full, meta)
                {
                    return '<div class="dataTableCheckBox"><input type="checkbox" id="listaContratoCheckRow' + data + '"/><label for="listaContratoCheckRow' + data + '"></label></div>';
                }
            },
            {
            "data": "numeroProcesso", "render": function (data, type, row) {
                return data + '/' + row['anoProcesso'];
            }
        }, {
            "data": "numeroContrato", "render": function (data, type, row) {
                return data + '/' + row['anoContrato'];
            }
        }, {
            "data": "dataInicio"
        }, {
            "data": "dataFim"
        }, {
            "data": "tipoContrato", "render": function (data, type, row) {return listaTipoContrato[data];}
        }, {
            "data": "situacao", "render": function (data, type, row) {
                return listaStatusContrato[data];
            }
        }, {
            "data": "valor","class":"indigo-text darken-1", "render": function (data, type, row) {
                return data;
            }
        }, {
            "data": "empenhado","class":"purple-text darken-1", "render": function (data, type, row) {
                return data;
            }
        }, {
            "data": "pago","class":"blue-text darken-1", "render": function (data, type, row) {
                data = data != null ? data : '0';
                return data;
            }
        }, {
            "data": "saldo", "render": function (data, type, row) {
                data = data != null ? data : '0';
                var yes = '<span class="light-green-text text-darken-2">'+data+'</span>';
                var no = '<span class="red-text text-darken-2">'+data+'</span>';
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
};
GerenciaContratoViewModel.prototype.resetFormContrato = function () {
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
GerenciaContratoViewModel.prototype.validaFormContrato = function () {
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
GerenciaContratoViewModel.prototype.saveContrato = function () {
    var self = this;

    if (!self.validaFormContrato())
    {
        return false;
    }

    /** OBTEM DADOS DO FORMULARIO **/
    var dataToSender = {
        'idControle': self.inputNumeroControle.attr('data-content'),
        'numeroProcesso': self.inputNumeroProcesso.val(),
        'anoProcesso': self.inputAnoProcesso.val(),
        'numeroContrato': self.inputNumeroContrato.val(),
        'anoContrato': self.inputAnoContrato.val(),
        'dataInicio': self.inputDataInicio.val(),
        'dataFim': self.inputDataFim.val(),
        'valor': self.inputValor.unmask().val(),
        'tipoContrato': self.selectTipoContrato.val(),
        'tipoAditivo': self.selectTipoAditivo.val(),
        'situacao': self.selectSituacaoContrato.val(),
        'prazoLimiteAditivo': self.inputPrazoAditivar.val()
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
GerenciaContratoViewModel.prototype.deleteContratos = function (ids) {
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
GerenciaContratoViewModel.prototype.reloadContratos = function () {
    var self = this;
    emptyArray(self.dataTableListaContratoRowsSelected);
    self.dataTableListaContrato.ajax.reload();
};
GerenciaContratoViewModel.prototype.updateInputs = function () {
    Materialize.updateTextFields();
    $('select').material_select();
};
GerenciaContratoViewModel.prototype.eventos = function () {
    var self = this;
    //evento botão salvar contrato
    self.btnSalvarContrato.click(function () {
        self.saveContrato();
    });

    self.inputNumeroControle.click(function () {
        self.getControles();
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

        var myDate = moment(self.inputDataFim.val(), 'DD-MM-YYYY').subtract(self.inputPrazoAditivar.val(), "days").format("DD-MM-YYYY");
        self.inputDataFimAditivar.val(myDate);
        self.updateInputs();
    });
};