$(document).ready(function () {
    var gerenciaMedicaoViewModel = new GerenciaMedicaoViewModel();
    gerenciaMedicaoViewModel.init();
});

function GerenciaMedicaoViewModel()
{
    this.webservicePmroBaseURL = WEBSERVICE_PMRO_BASE_URL;
    this.webserviceSiscecBaseURL = WEBSERVICE_SISCEC_BASE_URL;
    this.customLoading = new CustomLoading('loading');
    this.restClient = new RESTClient();

    //FORMULARIO CADASTRO MEDIÇÃO
    this.inputIdContratoMedicao = $('#inputIdContratoMedicao');
    this.inputDataInicioMedicao = $('#inputDataInicioMedicao');
    this.inputDataFimMedicao = $('#inputDataFimMedicao');
    this.checkboxIsPagoMedicao = $('#checkboxIsPagoMedicao');
    this.btnAddFormParcela = $('#btnAddFormParcela');
    this.btnSalvarMedicao = $('#btnSalvarMedicao');
    this.idContrato = null;

    //FORMULARIO CADASTRO PARCELA
    this.parcelaCount = 1;

    //LISTA PARCELA
    this.tableListaParcela = $('#tableListaParcela');
    //Inicializa o ModernDataTable Parcela
    this.dataTableParcela = new ModernDataTable('tableListaParcela');

    //LISTA MEDICAO
    this.tableListaMedicao = $('#tableListaMedicao');
    //Inicializa o ModernDataTable Medicão
    this.dataTableListaMedicao = new ModernDataTable('tableListaMedicao');

    //MODAL LISTA EMPENHO
    this.modalEmpenho = new CustomModal('modalEmpenho');
    this.tableListaEmpenho = $('#tableListaEmpenho');
    this.dataTableListaEmpenho = null;

    //MODAL LISTA CONTRATO
    this.modalContrato = new CustomModal('modalContrato');
    this.tableListaContrato = $('#tableListaContrato');
    this.dataTableListaContrato = null;
    this.selectFiltroStatusContrato = $('#selectFiltroStatusContrato');
    //
    this.idMedicao = null;
    //disabilita recurso de acordo com o usuario logado
    this.disableFeature = false;
}

GerenciaMedicaoViewModel.prototype.init = function () {
    var self = this;
    // initialize MATERIALIZE
    $('ul.tabs').tabs();
    $('select').material_select();
    $('.modal').modal();

    //disabilita recurso de acordo com o usuario logado
    self.accessControl();
    self.getMedicoes();
    self.eventos();
    self.maskForm();


    self.dataTableParcela.setDisplayCols([{"key": "id"}, {
        "key": "idEmpenho", "class": "inputIdEmpenhoParcela", "validation": self.validaInputEmpenho, "render": function (tdContent) {

            if (typeof tdContent === 'object')
            {
                if (tdContent['empenho'])
                {
                    return tdContent['empenho']['numero'] + '/' + tdContent['empenho']['ano'];
                }
            }
            return tdContent['idEmpenho'];
        }
    }, {"key": "numeroParcela", "class": "inputNumeroParcela", "editable": "false"}, {"key": "valor", "class": "inputValorParcela", "validation": self.validaInputValorParcela}]);
    if (self.disableFeature)
    {
        self.dataTableParcela.hideActionBox();
    }

};
GerenciaMedicaoViewModel.prototype.getParcelas = function () {
    var self = this;

    if (self.disableFeature)
    {
        self.dataTableParcela.hideActionBox();
    }

    self.dataTableParcela.setSourceURL(self.webserviceSiscecBaseURL + 'parcelas');
    self.dataTableParcela.setDataToSender({"idMedicao": self.idMedicao});
    self.dataTableParcela.load();
    self.dataTableParcela.setOnDeleteItemAction(function (ids) {
        self.deleteParcela(ids);
    });
};
GerenciaMedicaoViewModel.prototype.validaInputEmpenho = function (tdContent) {
    if (tdContent === 'Selecione' || tdContent === '')
    {
        Materialize.toast('Selecione o empenho!', 4000);
        return false;
    }
    return true
};
GerenciaMedicaoViewModel.prototype.validaInputValorParcela = function (tdContent) {
    if (tdContent === 'R$ 0.000,00' || tdContent === '')
    {
        Materialize.toast('Digite o valor!', 4000);
        return false;
    }
    return true
};
GerenciaMedicaoViewModel.prototype.getMedicoes = function () {
    var self = this;
    self.dataTableListaMedicao.setDisplayCols([
        {"key": "id"},
        {"key": "idContrato", "render": function (rowData) {
            return rowData['contrato']['numeroContrato'] + '/' + rowData['contrato']['anoContrato'];
            }
        },
        {"key": "dataInicio", "type": "date"},
        {"key": "dataFim", "type": "date"},
        {"key": "pago", "type": "boolLabel"}
        ]);
    if (self.disableFeature)
    {
        self.dataTableListaMedicao.hideActionBox();
    }
    else
    {
        self.dataTableListaMedicao.showActionBtnAdd();
    }
    self.dataTableListaMedicao.setIsColsEditable(false);
    self.dataTableListaMedicao.setSourceURL(self.webserviceSiscecBaseURL + 'medicoes');
    self.dataTableListaMedicao.setOnClick(function (data) {
        self.showMedicaoForEdit(data);
        self.getParcelas();
    });
    self.dataTableListaMedicao.setOnAddItemAction(function () {
        //$('.collapsible').collapsible('open', 0);
        location.reload();
    });
    self.dataTableListaMedicao.setOnDeleteItemAction(function (ids) {
        self.deleteMedicao(ids);
    });
    self.dataTableListaMedicao.load();
};
GerenciaMedicaoViewModel.prototype.showMedicaoForEdit = function (data) {
    var self = this;
    self.inputIdContratoMedicao.val(data['contrato']['numeroContrato'] + '/' + data['contrato']['anoContrato']);
    self.inputIdContratoMedicao.attr('data-content', data['idContrato']);
    self.inputDataInicioMedicao.val(sqlDateToBrasilDate(data['dataInicio']));
    self.inputDataFimMedicao.val(sqlDateToBrasilDate(data['dataFim']));
    self.checkboxIsPagoMedicao.prop('checked', data['pago']);
    self.idMedicao = data['id'];
    self.updateInputs();
    $('.collapsible').collapsible('open', 0);
};
GerenciaMedicaoViewModel.prototype.getContratos = function (inputElem) {
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
        info: false, bPaginate: true,
        bAutoWidth: false, responsive:true,
        processing: true,
        serverSide: true,
        ordering: false,
        searching: true, ajax: {
            url: self.webserviceSiscecBaseURL + "contratos",
            type: "POST",
            data:  function ( d ) {
                d['idControle'] =  '';
                d['situacao'] = self.selectFiltroStatusContrato.val();
            }
        }, columns: [{
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
                "data": "dataInicio"
            }, {
                "data": "dataFim"
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
            }], oLanguage: {
            "sZeroRecords": "Nenhum contrato cadastrado para este controle",
            "sInfoEmpty": "Nenhum registro disponível",
            "sInfoFiltered": "(filtrado _MAX_ do total de registros)",
            "sStripClasses": "", "sSearch": "",
            "sSearchPlaceholder": "Digite aqui palavras-chave",
            "sInfo": "_START_ -_END_ de _TOTAL_",
            "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }
    });
    self.tableListaContrato.on('click', 'tbody tr', function () {
        var data = self.dataTableListaContrato.row($(this).closest('tr')).data();
        inputElem.val(data['numeroContrato'] + '/' + data['anoContrato']);
        inputElem.attr('data-content', data['id']);
        self.idContrato = data['id'];
        self.modalContrato.close();
    });

};
GerenciaMedicaoViewModel.prototype.getEmpenhos = function (elementId) {
    var self = this;

    self.modalEmpenho.open();
    if (self.dataTableListaEmpenho !== null)
    {
        self.dataTableListaEmpenho.destroy();
    }
    //inicializa dataTables Lista de Empenho
    self.dataTableListaEmpenho = self.tableListaEmpenho.DataTable({
        order: [[0, 'asc']], info: false,
        bPaginate: true,
        bAutoWidth: false, responsive: true, processing: true,
        serverSide: true, ordering: false, searching: true,
        ajax: {
            url: self.webserviceSiscecBaseURL + "empenhos", type: "POST",
            "data": {"idContrato": self.idContrato}
        }, columns: [{
            "data": "id", "width": "70px"
        },
            {
            "data": "contrato.numeroContrato", render: function (data, type, row, meta) {
                return data + '/' + row['contrato']['anoContrato'];
            }
        }, {"data": "numero"},
            {"data": "ano"},
            {"data": "data"},
            {"data": "recurso.sigla"},
            {"data": "cancelado", render: function (data, type, row, meta) {
                var canceled = '<i class="fa fa-times-circle fa-2x red-text "  aria-hidden="true"></i>';
                var notCanceled = '<i class="fa fa-check-circle fa-2x green-text" aria-hidden="true"></i>';
                return data ? '<span class="">Sim</span>' : '<span class="">Não</span>';
            }
        },
            {"data": "valor"},
            {"data": "totalPago"},
            {"data": "saldo", render: function (data, type, row, meta) {
                    return data === 'R$ 0,00' ? '<span class="red-text">'+data+'</span>' : data;
                }
            },
            {"data": "justificativa"}

        ],

        oLanguage: {
            "sZeroRecords": "Nenhum registro disponível",
            "sInfoEmpty": "Nenhum registro disponível", "sInfoFiltered": "(filtrado _MAX_ do total de registros)", "sStripClasses": "", "sSearch": "", "sSearchPlaceholder": "Digite aqui palavras-chave", "sInfo": "_START_ -_END_ de _TOTAL_", "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }
    });
};
GerenciaMedicaoViewModel.prototype.resetForm = function () {
    var self = this;
    self.inputIdContratoMedicao.val('');
    self.inputIdContratoMedicao.attr('data-content', '');
    self.inputDataInicioMedicao.val('');
    self.inputDataFimMedicao.val('');
    self.checkboxIsPagoMedicao.prop('checked', false);
};
GerenciaMedicaoViewModel.prototype.addFormParcela = function (data) {
    var self = this;

    if (!self.inputIdContratoMedicao.val())
    {
        self.inputIdContratoMedicao.focus();
        alert('Selecione um contrato primeiro!');
        return false;
    }

    self.parcelaCount = self.dataTableParcela.getRowsCount() + 1;

    var json = {
        "id": self.parcelaCount, "idEmpenho": 'Selecione', "numeroParcela": self.parcelaCount, "valor": 'R$ 0.000,00'
    };

    self.dataTableParcela.appendRowFromJSON(json);
    var inputIdEmpenhoParcela = $('.inputIdEmpenhoParcela');
    inputIdEmpenhoParcela.focus();
    inputIdEmpenhoParcela.css('cursor', 'pointer');

};
GerenciaMedicaoViewModel.prototype.maskForm = function () {
    var self = this;
    self.inputDataInicioMedicao.mask('99/99/9999');
    self.inputDataFimMedicao.mask('99/99/9999');
    self.tableListaParcela.on('keypress', '.inputValorParcela', function (e) {
        return currencyFormatEditableElement(this, '.', ',', e);
    });
    self.tableListaParcela.on('focus', '.inputValorParcela', function (e) {
        var element = $(this);
        if (element.text() === 'R$ 0.000,00')
        {
            element.text('');
        }
    });
    self.tableListaParcela.on('blur', '.inputValorParcela', function (e) {
        var element = $(this);
        if (element.text() === '')
        {
            element.text('R$ 0.000,00');
        }
    });
};
GerenciaMedicaoViewModel.prototype.validaForm = function () {
    var self = this;

    if (!self.inputIdContratoMedicao.val())
    {
        self.inputIdContratoMedicao.focus();
        alert('Selecione um contrato!');
        return false;
    }
    if (!validaData(self.inputDataInicioMedicao.val()))
    {
        self.inputDataInicioMedicao.focus();
        alert('Digite uma data de inicio valida!');
        return false;
    }
    if (!validaData(self.inputDataFimMedicao.val()))
    {
        self.inputDataFimMedicao.focus();
        alert('Digite uma data de término valida!');
        return false;
    }
    var dataInicio = moment(self.inputDataInicioMedicao.val(), 'DD/MM/YYYY').format("YYYY-MM-DD");
    var dataFim = moment(self.inputDataFimMedicao.val(), 'DD/MM/YYYY').format("YYYY-MM-DD");

    if (!moment(dataFim).isAfter(dataInicio))
    {
        self.inputDataFimMedicao.focus();
        alert('A data de término deve ser superior à data de início!');
        return false;
    }

    return true;
};
GerenciaMedicaoViewModel.prototype.validaDataInicioMedicao = function () {
    var self = this;

    if (!self.validaForm())
    {
        return false;
    }
    self.customLoading.show();
    var idContrato = self.inputIdContratoMedicao.attr('data-content');
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'medicoes/contrato/' + idContrato);
    self.restClient.setMethodGET();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();

        if (isEmptyObject(data))
        {
            self.saveMedicao();
            return;
        }

        if (data['id'] === self.idMedicao)
        {
            self.saveMedicao();
            return;
        }

        //valida a data inicio da medição atual com base na data fim da medição anterior
        var dataFimMedicaoAnterior = moment(data['dataFim'], "YYYY-MM-DD").format("YYYY-MM-DD");
        var dataInicioMedicaoAtual = moment(self.inputDataInicioMedicao.val(), 'DD/MM/YYYY').format("YYYY-MM-DD");
        var diff = Math.abs(moment(dataInicioMedicaoAtual).diff(dataFimMedicaoAnterior, 'days'));
        var dataCorrigida = null;

        if (moment(dataInicioMedicaoAtual).isAfter(dataFimMedicaoAnterior))
        {
            if (diff !== 1)
            {
                if (confirm('A data inicio é superior ' + diff + ' dia(s) da data fim da medição anterior, se deseja salvar assim mesmo click em ok') === true)
                {
                    self.saveMedicao();
                }
                else
                {
                    //alert('nao salvo');
                }
            }
            else
            {
                self.saveMedicao();
            }
        }
        else if (dataFimMedicaoAnterior === dataInicioMedicaoAtual)
        {
            dataCorrigida = moment(dataFimMedicaoAnterior).add(1, 'days').format('DD/MM/YYYY');
            alert('A data inicio é igual ' + diff + ' dia(s) da data fim da medição anterior, ocorrendo sobreposição de dias medidos, a mesma será corrigida para ' + dataCorrigida + '.');
            self.inputDataInicioMedicao.val(dataCorrigida);
            self.saveMedicao();
        }
        else
        {
            dataCorrigida = moment(dataFimMedicaoAnterior).add(1, 'days').format('DD/MM/YYYY');
            alert('A data inicio é inferior ' + diff + ' dia(s) da data fim da medição anterior, ocorrendo sobreposição de dias medidos, a mesma será corrigida para ' + dataCorrigida + '.');
            self.inputDataInicioMedicao.val(dataCorrigida);
            self.saveMedicao();
        }
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
    });
    self.restClient.exec();
};
GerenciaMedicaoViewModel.prototype.saveMedicao = function () {
    var self = this;

    if (!self.validaForm())
    {
        return false;
    }

    if (!self.dataTableParcela.validateFields2())
    {
        return false;
    }

    /** OBTEM DADOS DO FORMULARIO **/
    var dataToSender = {
        'idContrato': self.inputIdContratoMedicao.attr('data-content'), 'dataInicio': self.inputDataInicioMedicao.val(), 'dataFim': self.inputDataFimMedicao.val(), 'pago': false
    };
    dataToSender['parcelas'] = self.dataTableParcela.getDataAsJSON();
    //console.log(JSON.stringify(dataToSender));
    self.customLoading.show();
    var idURL = self.idMedicao === null ? '' : '/' + self.idMedicao;

    self.restClient.setDataToSender(dataToSender);
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'medicoes' + idURL);
    self.restClient.setMethodPUT();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        alert('Salvo com sucesso!');
        location.reload();
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro oa salvar o controle');
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    });
    self.restClient.exec();
};
GerenciaMedicaoViewModel.prototype.deleteMedicao = function (ids) {
    var self = this;

    if (!confirm('Tem certeza?'))
    {
        return;
    }

    if (ids.length === 0)
    {
        alert('Você não selecionou nenhum item a ser deletado ');
        return;
    }
    var dataToSender = {'ids': ids};
    self.customLoading.show();
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'medicoes');
    self.restClient.setMethodDELETE();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        alert(data['message']);
        self.dataTableListaMedicao.reload();
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert(data['message']);
    });
    self.restClient.exec();
};
GerenciaMedicaoViewModel.prototype.deleteParcela = function (ids) {
    var self = this;

    if (ids.length === 0)
    {
        alert('Você não selecionou nenhum item a ser deletado ');
        return;
    }
    if (!confirm('Tem certeza?'))
    {
        return;
    }
    var dataToSender = {'ids': ids};
    console.log(JSON.stringify(dataToSender));
    self.customLoading.show();
    self.restClient.setDataToSender(dataToSender);
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'parcelas');
    self.restClient.setMethodDELETE();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        alert(data['message']);
        if (self.idMedicao)
        {
            self.dataTableParcela.reload();
        }
        else
        {
            self.dataTableParcela.deleteRowsSelected();
        }
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert(data['message']);
    });
    self.restClient.exec();
};
GerenciaMedicaoViewModel.prototype.eventos = function () {
    var self = this;

    self.inputIdContratoMedicao.click(function () {
        self.getContratos(this);
    });

    self.btnAddFormParcela.click(function () {
        self.addFormParcela();
    });

    var inputIdEmpenhoParcela = null;
    //abre o modal "Empenhos" para selecionar um empenho
    self.tableListaParcela.on('click', '.inputIdEmpenhoParcela', function (e) {
        if (!self.disableFeature)
        {
            self.getEmpenhos();
            inputIdEmpenhoParcela = $(this);
        }

    });
    //quando selecionar um empenho
    self.tableListaEmpenho.on('click', 'tbody tr td', function (e) {

        var data = self.dataTableListaEmpenho.row($(this).closest('tr')).data();
        inputIdEmpenhoParcela.text(data['numero'] + '/' + data['ano']);
        inputIdEmpenhoParcela.attr("data-content", data['id']);
        self.modalEmpenho.close();
    });

    //salva os dados dor formulario medição
    self.btnSalvarMedicao.click(function () {
        self.validaDataInicioMedicao();
    });

    self.selectFiltroStatusContrato.change(function () {
        self.dataTableListaContrato.ajax.reload();
    });

};
GerenciaMedicaoViewModel.prototype.updateInputs = function () {
    Materialize.updateTextFields();
    $('select').material_select();
};

//controle de acesso
GerenciaMedicaoViewModel.prototype.accessControl = function () {
    var self = this;
    //controle de acesso
    if (getPerfilUsuario() === PERFIL_VISUALIZADOR)
    {
        $("#btnSalvarMedicao").remove();
        $("#btnAddFormParcela").remove();


        self.disableFeature = true;

    }
};



