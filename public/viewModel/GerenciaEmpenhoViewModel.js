$(document).ready(function () {
    var gerenciaEmpenhoViewModel = new GerenciaEmpenhoViewModel();
    gerenciaEmpenhoViewModel.init();
});

function GerenciaEmpenhoViewModel()
{
    this.webservicePmroBaseURL = WEBSERVICE_PMRO_BASE_URL;
    this.webserviceSiscecBaseURL = WEBSERVICE_SISCEC_BASE_URL;
    this.customLoading = new CustomLoading('loading');
    this.restClient = new RESTClient();

    //FORMULARIO CADASTRO EMPENHO
    this.inputIdContrato = $('#inputIdContrato');
    this.inputIdFonteRecurso = $('#inputIdFonteRecurso');
    this.inputNumero = $('#inputNumero');
    this.inputAno = $('#inputAno');
    this.inputData = $('#inputData');
    this.inputValor = $('#inputValor');
    this.inputJustificativa = $('#inputJustificativa');
    this.checkboxIsCancelado = $('#checkboxIsCancelado');
    this.btnSalvarEmpenho = $('#btnSalvarEmpenho');
    this.btnAddEmpenho = $('#btnAddEmpenho');
    this.btnUpdateListaEmpenho = $('#btnUpdateListaEmpenho');
    this.btnDeleteEmpenhos = $('#btnDeleteEmpenhos');
    this.idEmpenho = null;
    this.btnResetForm = $('#btnResetForm');

    //LISTA EMPENHO
    this.tableListaEmpenho = $('#tableListaEmpenho');
    this.dataTableListaEmpenho = null;
    this.dataTableListaEmpenhoRowsSelected = [];
    //MODAL LISTA CONTRATO
    this.modalContrato = new CustomModal('modalContrato');
    this.tableListaContrato = $('#tableListaContrato');
    this.dataTableListaContrato = null;
    this.selectFiltroStatusContrato = $('#selectFiltroStatusContrato');

    //MODAL FONTE DE RECURSO
    this.modalFonteRecurso = new CustomModal('modalFonteRecurso');
    this.tableListaFonteRecurso = $('#tableListaFonteRecurso');
    this.dataTableListaFonteRecurso = null;
    //disabilita recurso de acordo com o usuario logado
    this.disableFeature = false;


}
GerenciaEmpenhoViewModel.prototype.init = function () {
    var self = this;
    // MATERIALIZE
    $('ul.tabs').tabs();
    $('select').material_select();
    $('.modal').modal();
    //disabilita recurso de acordo com o usuario logado
    self.accessControl();
    self.eventos();
    self.maskForm();
    self.getEmpenhos();
};
GerenciaEmpenhoViewModel.prototype.getFonteRecursos = function (inputElem) {
    var self = this;
    inputElem = $(inputElem);
    self.modalFonteRecurso.open();
    if (self.dataTableListaFonteRecurso !== null)
    {
        self.dataTableListaFonteRecurso.destroy();
    }
    //inicializa dataTables lista fontes de recursos
    self.dataTableListaFonteRecurso = self.tableListaFonteRecurso.DataTable({
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
            url: self.webserviceSiscecBaseURL + "recursos",
            type: "POST"
        },
        columns: [{"data": "id", "width": "70px"}, {"data": "codigo", "width": "80px"}, {
            "data": "sigla", "width": "130px"
        }, {"data": "descricao"}],
        oLanguage: {
            "sZeroRecords": "Nenhum registro disponível",
            "sInfoEmpty": "Nenhum registro disponível",
            "sInfoFiltered": "(filtrado _MAX_ do total de registros)",
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Digite aqui palavras-chave",
            "sInfo": "_START_ -_END_ de _TOTAL_",
            "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }
    });
    self.tableListaFonteRecurso.on('click', 'tbody tr', function () {
        var data = self.dataTableListaFonteRecurso.row($(this).closest('tr')).data();
        inputElem.val(data['sigla']);
        inputElem.attr('data-content', data['id']);
        self.modalFonteRecurso.close();
    });

};
GerenciaEmpenhoViewModel.prototype.getContratos = function (inputElem) {
    var self = this;
    inputElem = $(inputElem);
    self.modalContrato.open();
    if (self.dataTableListaContrato !== null)
    {
        self.dataTableListaContrato.destroy();
    }
    //inicializa dataTables lista fontes de recursos
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
            url: self.webserviceSiscecBaseURL + "contratos", type: "POST",
            data: function ( d ) {
                d['idControle'] =  '';
                d['situacao'] = self.selectFiltroStatusContrato.val();
            }

        },
        columns: [{
            "data": "id", width: "50px"
        },

            {
                "data": "numeroContrato", "render": function (data, type, row) {
                return data + '/' + row['anoContrato'];
            }
            }, {
                "data": "numeroProcesso", "render": function (data, type, row) {
                    return data + '/' + row['anoProcesso'];
                }
            }, {
                "data": "dataInicio",render: function (data, type, full, meta) {
                    return sqlDateToBrasilDate(data);}
            }, {
                "data": "dataFim",render: function (data, type, full, meta) {
                    return sqlDateToBrasilDate(data);}
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
            "sZeroRecords": "Nenhum contrato disponível",
            "sInfoEmpty": "Nenhum registro disponível",
            "sInfoFiltered": "(filtrado _MAX_ do total de registros)",
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Digite aqui palavras-chave",
            "sInfo": "_START_ -_END_ de _TOTAL_",
            "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }
    });
    self.tableListaContrato.on('click', 'tbody tr', function () {
        var data = self.dataTableListaContrato.row($(this).closest('tr')).data();
        inputElem.val(data['numeroContrato'] + '/' + data['anoContrato']);
        inputElem.attr('data-content', data['id']);
        self.modalContrato.close();
    });

};
GerenciaEmpenhoViewModel.prototype.resetForm = function () {
    var self = this;
    self.idEmpenho = null;
    self.inputIdContrato.val('');
    self.inputIdContrato.attr('data-content', '');
    self.inputIdFonteRecurso.val('');
    self.inputIdFonteRecurso.attr('data-content', '');
    self.inputNumero.val('');
    self.inputAno.val('');
    self.inputData.val('');
    self.inputValor.val('');
    self.inputJustificativa.val('');
    self.checkboxIsCancelado.prop('checked', false);
};
GerenciaEmpenhoViewModel.prototype.maskForm = function () {
    var self = this;
    self.inputAno.mask('9999');
    self.inputData.mask('99/99/9999');
    self.inputValor.mask("#.##0,00", {reverse: true});
    limitaInputEvent(self.inputNumero, 15);
    //preventsLetter(self.inputNumero);
};
GerenciaEmpenhoViewModel.prototype.validaForm = function () {
    var self = this;

    if (!self.inputIdContrato.val())
    {
        self.inputIdContrato.focus();
        alert('Selecione um contrato!');
        return false;
    }
    if (!self.inputIdFonteRecurso.val())
    {
        self.inputIdFonteRecurso.focus();
        alert('Selecione a fonte do recurso!');
        return false;
    }
    if (!self.inputNumero.val())
    {
        self.inputNumero.focus();
        alert('Digite o número do empenho!');
        return false;
    }
    if (!self.inputAno.val())
    {
        self.inputAno.focus();
        alert('Digite o ano do empenho!');
        return false;
    }
    if (!self.inputData.val())
    {
        self.inputData.focus();
        alert('Digite a data do empenho!');
        return false;
    }
    if (!self.inputValor.val())
    {
        self.inputValor.focus();
        alert('Digite o valor do empenho!');
        return false;
    }
    if( self.checkboxIsCancelado.is(":checked"))
    {
        if (!self.inputJustificativa.val())
        {
            self.inputJustificativa.focus();
            alert('Digite a justificativa do cancelamento!');
            return false;
        }
    }
    return true;
};
GerenciaEmpenhoViewModel.prototype.getEmpenhos = function () {
    var self = this;

    if (self.dataTableListaEmpenho !== null)
    {
        self.dataTableListaEmpenho.destroy();
    }
    //inicializa dataTables Lista de Empenho
    self.dataTableListaEmpenho = self.tableListaEmpenho.DataTable({
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
            url: self.webserviceSiscecBaseURL + "empenhos", type: "POST"
        },
        columns: [{
            "data": "id", "width": "70px", render: function (data, type, full, meta) {
                return '<div class="dataTableCheckBox"><input type="checkbox" id="listaEmpenhoCheckRow' + data + '"/><label for="listaEmpenhoCheckRow' + data + '"></label></div>';
            }
        }, {
            "data": "contrato.numeroContrato", render: function (data, type, row, meta) {
                return data + '/' + row['contrato']['anoContrato'];
            }
        },
            {"data": "numero"}, {"data": "ano"},
            {"data": "data"},
            {"data": "valor"},
            {"data": "recurso.sigla"},
            {"data": "cancelado", render: function (data, type, row, meta) {
                var canceled = '<i class="fa fa-times-circle fa-2x red-text "  aria-hidden="true"></i>';
                var notCanceled = '<i class="fa fa-check-circle fa-2x green-text" aria-hidden="true"></i>';
                return data ? 'Sim' : 'Não';
                }
            },
            {"data": "totalPago"},
            {"data": "saldo", render: function (data, type, row, meta) {
                    return data === 'R$ 0,00' ? '<span class="red-text">'+data+'</span>' : data;
                }
            },
            {"data": "justificativa"}
            ],

        oLanguage: {
            "sZeroRecords": "Nenhum registro disponível",
            "sInfoEmpty": "Nenhum registro disponível",
            "sInfoFiltered": "(filtrado _MAX_ do total de registros)",
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Digite aqui palavras-chave",
            "sInfo": "_START_ -_END_ de _TOTAL_",
            "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }
    });
    self.tableListaEmpenho.on('click', 'tbody tr td', function (e) {
        var este = $(this);
        var data = self.dataTableListaEmpenho.row(este.closest('tr')).data();
        if (e.target !== e.currentTarget)
        {
            return;
        }
        if ($(e.target).children().length > 0)
        {
            return;
        }
        $('.collapsible').collapsible('open', 0);
        self.showEmpenhoToEdit(data);
    });

    self.tableListaEmpenho.on('click', 'tbody tr td .dataTableCheckBox', function (e) {
        e.stopPropagation();
    });

    //abilita o checkbox select all
    dataTableSelectAll(self.tableListaEmpenho, self.dataTableListaEmpenho, self.dataTableListaEmpenhoRowsSelected);
    //abilita a seleção
    dataTableSelect(self.tableListaEmpenho, self.dataTableListaEmpenho, self.dataTableListaEmpenhoRowsSelected);

};
GerenciaEmpenhoViewModel.prototype.showEmpenhoToEdit = function (data) {
    var self = this;
    self.idEmpenho = data['id'];
    self.inputIdContrato.val(data['contrato']['numeroContrato'] + '/' + data['contrato']['anoContrato']);
    self.inputIdContrato.attr('data-content', data['idContrato']);
    self.inputIdFonteRecurso.val(data['recurso']['sigla']);
    self.inputIdFonteRecurso.attr('data-content', data['idFonteRecurso']);
    self.inputNumero.val(data['numero']);
    self.inputAno.val(data['ano']);
    self.inputData.val(data['data']);
    self.inputValor.val(data['valor']);
    self.inputJustificativa.val(data['justificativa']);
    if (data['cancelado'])
    {
        self.checkboxIsCancelado.prop('checked', true);
    }
    else
    {
        self.checkboxIsCancelado.prop('checked', false);
    }
    self.updateInputs();
};
GerenciaEmpenhoViewModel.prototype.saveEmpenho = function () {
    var self = this;
    if (!self.validaForm())
    {
        return false;
    }
    /** OBTEM DADOS DO FORMULARIO **/
    var dataToSender = {
        'idContrato': self.inputIdContrato.attr('data-content'),
        'idFonteRecurso': self.inputIdFonteRecurso.attr('data-content'),
        'data': self.inputData.val(),
        'numero': self.inputNumero.val(),
        'ano': self.inputAno.val(),
        'justificativa': self.inputJustificativa.val(),
        'valor': self.inputValor.val(),
        'cancelado': self.checkboxIsCancelado.is(":checked")
    };
    //console.log(JSON.stringify(dataToSender));
    // console.log(self.idEmpenho);
    var parameterID = '';
    if (self.idEmpenho !== null)
    {
        parameterID = '/' + self.idEmpenho;
    }
    self.customLoading.show();
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'empenhos' + parameterID);
    self.restClient.setMethodPUT();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.resetForm();
        self.updateListaEmpenho();
        alert(data['message']);
        $('.collapsible').collapsible('open', 1);
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro ao salvar');
    });
    self.restClient.exec();
};
GerenciaEmpenhoViewModel.prototype.updateListaEmpenho = function () {
    var self = this;
    emptyArray(self.dataTableListaEmpenhoRowsSelected);
    self.dataTableListaEmpenho.ajax.reload();
};
GerenciaEmpenhoViewModel.prototype.deleteEmpenhos = function () {
    var self = this;
    var ids = self.dataTableListaEmpenhoRowsSelected;
    if (ids.length === 0)
    {
        alert('Você não selecionou nenhum item a ser deletado ');
        return;
    }
    var dataToSender = {'ids': ids};
    self.customLoading.show();
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setWebServiceURL(this.webserviceSiscecBaseURL + 'empenhos');
    self.restClient.setMethodDELETE();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        self.updateListaEmpenho();
        alert(data['message']);
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro ao deletar');
    });
    self.restClient.exec();
};
GerenciaEmpenhoViewModel.prototype.eventos = function () {
    var self = this;

    self.btnSalvarEmpenho.click(function () {
        self.saveEmpenho();
    });

    self.inputIdContrato.click(function () {
        self.getContratos(this);
    });

    self.inputIdFonteRecurso.click(function () {
        self.getFonteRecursos(this);
    });

    self.btnDeleteEmpenhos.click(function () {
        self.deleteEmpenhos();
    });

    self.btnAddEmpenho.click(function () {
        self.resetForm();
        $('.collapsible').collapsible('open', 0);
    });

    self.btnUpdateListaEmpenho.click(function () {
        self.updateListaEmpenho();
    });

    self.selectFiltroStatusContrato.change(function () {
        self.dataTableListaContrato.ajax.reload();
    });

    self.btnResetForm.click(function () {
        self.resetForm();
    });
};
GerenciaEmpenhoViewModel.prototype.updateInputs = function () {
    Materialize.updateTextFields();
    $('select').material_select();
};

//controle de acesso
GerenciaEmpenhoViewModel.prototype.accessControl = function () {
    var self = this;
    //controle de acesso
    if (getPerfilUsuario() === PERFIL_VISUALIZADOR)
    {
        $("#btnAddEmpenho").remove();
        $("#btnDeleteEmpenhos").remove();

        $("#btnSalvarEmpenho").remove();


        self.disableFeature = true;

    }
};