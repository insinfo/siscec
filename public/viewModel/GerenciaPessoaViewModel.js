$(document).ready(function () {
    var gerenciaPessoaViewModel = new GerenciaPessoaViewModel();
    gerenciaPessoaViewModel.init();
});

function GerenciaPessoaViewModel() {
    this.webservicePmroBaseURL = WEBSERVICE_PMRO_BASE_URL;
    this.webserviceSissecBaseURL = WEBSERVICE_SISCEC_BASE_URL;
    this.webserviceJubarteBaseURL = WEBSERVICE_JUBARTE_BASE_URL;

    this.tablePessoaFisica = $('#tablePessoaFisica');
    this.dataTablePessoaFisica = null;
    this.tablePessoaJuridica = $('#tablePessoaJuridica');
    this.dataTablePessoaJuridica = null;
    this.restClient = new RESTClient();
    this.customLoading = new CustomLoading('loading');

    this.btnAddPessoaFisica = $('#btnAddPessoaFisica');
    this.btnUpdatePessoaFisica = $('#btnUpdatePessoaFisica');
    this.btnDeletePessoaFisica = $('#btnDeletePessoaFisica');

    this.btnAddPessoaJuridica = $('#btnAddPessoaJuridica');
    this.btnDeletePessoaJuridica = $('#btnDeletePessoaFisica');
    this.btnUpdatePessoaJuridica = $('#btnUpdatePessoaJuridica');

    /** parte add pessoa **/
    this.gerenciaPessoaModalId = 'gerenciaPessoaModal';
    //this.tabPessoaFisicaModal = $('#tabPessoaFisicaModal');
    this.limitTelefones = 3;
    this.limitEnderecos = 3;

    this.actionIncluirOrEditarPessoa = 'incluir';
    this.idPessoa = $('[name="idPessoa"]');
    this.tipoPessoa = $('[name="tipoPessoa"]');
    this.nomePessoa = $('[name="nomePessoa"]');
    this.emailPrincipal = $('[name="emailPrincipal"]');
    this.emailAdicional = $('[name="emailAdicional"]');

    this.cpf = $('[name="cpf"]');
    this.rg = $('[name="rg"]');
    this.dataEmissao = $('[name="dataEmissao"]');
    this.orgaoEmissor = $('[name="orgaoEmissor"]');
    this.ufOrgaoEmissor = $('[name="ufOrgaoEmissor"]');
    this.paisNacionalidade = $('[name="paisNacionalidade"]');
    this.dataNascimento = $('[name="dataNascimento"]');
    this.sexo = $('[name="sexo"]');

    this.cnpj = $('[name="cnpj"]');
    this.nomeFantasia = $('[name="nomeFantasia"]');
    this.inscricaoEstadual = $('[name="inscricaoEstadual"]');

    this.selectPaisNacionalidadeName = "paisNacionalidade";
    this.selectPaisName = "pais";
    this.selectUfName = "uf";
    this.selectMunicipioName = "municipio";

    this.selectUfOrgaoEmissorName = "ufOrgaoEmissor";

    this.selectUfBuscaCEPName = "ufBuscaCEP";
    this.selectMunicipioBuscaCEPName = "municipioBuscaCEP";
    this.inputBairroBuscaCEPName = "bairroBuscaCEP";
    this.inputLogradouroBuscaCEPName = "logradouroBuscaCEP";

    this.selectUfBuscaCEP = $('[name="' + this.selectUfBuscaCEPName + '"]');
    this.selectMunicipioBuscaCEP = $('[name="' + this.selectMunicipioBuscaCEPName + '"]');
    this.inputBairroBuscaCEP = $('[name="' + this.inputBairroBuscaCEPName + '"]');
    this.inputLogradouroBuscaCEP = $('[name="' + this.inputLogradouroBuscaCEPName + '"]');

    this.correiosDataTable = null;
    this.tableResultCorreios = $('#tableResultsCorreios');
    this.btnTabPessoaFisica = $('[name="btnTabPessoaFisica"]');
    this.btnTabPessoaJuridica = $('[name="btnTabPessoaJuridica"]');
    this.telefoneBlock = $('#telefoneBlock');
    this.enderecoBlock = $('#enderecoBlock');
    this.btnSalvar = $('#btnSalvar');
    this.btnAddTelefone = $('#btnAddTelefone');
    this.btnRemoveTelefone = $('#btnRemoveTelefone');

    this.btnAddEndereco = $('#btnAddEndereco');
    this.enderecoItemClass = 'enderecoItem';//identifica o bloco de endereço a ser replicado

    this.btnBuscarEnderecoName = 'btnBuscarEndereco';
    this.btnProcurarCEP = $('#btnProcurarCEP');
    this.modalCEP = new CustomModal('modalCEP');
    this.btnShowModalBuscaCEPName = "btnShowModalBuscaCEP";

    // Array de IDs das linhas selecionadas do dataTables pessoa fisica
    this.pessoaFisicaRowsSelected = [];
    // Array de IDs das linhas selecionadas do dataTables pessoa juridica
    this.pessoaJuridicaRowsSelected = [];

    this.refOfCorrentDivEndereco = null;

    /*this.floatingActionsBtns = $('#floatingActionsBtns');*/

    //disabilita recurso de acordo com o usuario logado
    this.disableFeature = false;

    //
    this.isPopulateSelect = 0;
}

GerenciaPessoaViewModel.prototype.init = function () {
    var self = this;

    // MATERIALIZE
    $('ul.tabs').tabs();
    $('select').material_select();
    $('.modal').modal();

    // BARRA DE ROLAGEM
    //$("#gerenciaPessoaModal").mCustomScrollbar({theme: "minimal-dark", scrollInertia: "5"});

    // MODAL FULL SCREEN
    $().animatedModal({color: '#f0f0f0', modalTarget: 'gerenciaPessoaModal'});

    self.getPessoasFisicas();
    self.getPessoasJuridicas();
    self.getPaises();
    self.getUFs();
    self.getMunicipios();
    self.eventos();
    self.maskForm();
    //disabilita recurso de acordo com o usuario logado
    self.accessControl();
};
GerenciaPessoaViewModel.prototype.getPessoasFisicas = function () {
    var self = this;
    // inicializa dataTables pessoa fisica
    self.dataTablePessoaFisica = self.tablePessoaFisica.DataTable({
        'columnDefs': [{
            'targets': 0,
            'searchable': false,
            'orderable': false,
            'width': '1%',
            'className': 'dt-body-center',
            'render': function (data, type, full, meta) {
                return '<div class="dataTableCheckBox"><input type="checkbox" id="checkRow' + data + '"/><label for="checkRow' + data + '"></label></div>';
            }
        }], 'order': [[1, 'asc']], oLanguage: {
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Digite aqui palavras-chave",
            "sInfo": "_START_ -_END_ de _TOTAL_",
            "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }, bAutoWidth: false, responsive: true,
        processing: true, serverSide: true,
        ordering: false,
        ajax: {
            url: self.webserviceSissecBaseURL + "pessoas/datatable", type: "POST",
            data: {'tipo': 'fisica'}
        }, columns: [{"data": "id", width: "50px"}, {"data": "nome", 'class': 'dataTableClick'}, {
            "data": "dataNascimento", 'class': 'dataTableClick', render: function (data, type, row) {
                return sqlDateToBrasilDate(data);
            }
        }, {"data": "sexo", 'class': 'dataTableClick'}, {"data": "cpf", 'class': 'dataTableClick'}, {
            "data": "rg", 'class': 'dataTableClick'
        }]
    });


    dataTableSelectAll(self.tablePessoaFisica, self.dataTablePessoaFisica, self.pessoaFisicaRowsSelected);
    // evento de click no checkbox das linhas do dataTables pessoa fisica
    dataTableSelect(self.tablePessoaFisica, self.dataTablePessoaFisica, self.pessoaFisicaRowsSelected);

};
GerenciaPessoaViewModel.prototype.getPessoasJuridicas = function () {
    var self = this;

    // inicializa dataTables pessoa juridica
    self.dataTablePessoaJuridica = self.tablePessoaJuridica.DataTable({
        'columnDefs': [{
            'targets': 0,
            'searchable': false,
            'orderable': false,
            'width': '1%',
            'className': 'dt-body-center',
            'render': function (data, type, full, meta) {
                return '<div class="dataTableCheckBox"><input type="checkbox" id="checkRow' + data + '"/><label for="checkRow' + data + '"></label></div>';
            }
        }], 'order': [[1, 'asc']], oLanguage: {
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Digite aqui palavras-chave",
            "sInfo": "_START_ -_END_ de _TOTAL_",
            "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        }, bAutoWidth: false,
        responsive: true,
        processing: true,
        serverSide: true,
        ordering: false,
        ajax: {
            url: self.webserviceSissecBaseURL + "pessoas/datatable",
            type: "POST", data: {'tipo': 'juridica'}
        },
        columns: [{"data": "id", width: "50px"}, {
            "data": "nomeFantasia", 'class': 'dataTableClick'
        }, {"data": "nome", 'class': 'dataTableClick'}, {
            "data": "cnpj", 'class': 'dataTableClick'
        }, {"data": "inscricaoEstadual", 'class': 'dataTableClick'}, {
            "data": "emailPrincipal", 'class': 'dataTableClick'
        }]

    });

    // evento de click do checkbox das linhas do dataTables pessoa juridica
    dataTableSelectAll(self.tablePessoaJuridica, self.dataTablePessoaJuridica, self.pessoaJuridicaRowsSelected);

    dataTableSelect(self.tablePessoaJuridica, self.dataTablePessoaJuridica, self.pessoaJuridicaRowsSelected);

};
GerenciaPessoaViewModel.prototype.updateSelect = function () {
    $('select').material_select();
};
GerenciaPessoaViewModel.prototype.showLabelSelect = function () {
    $('.select-wrapper').parent().find('label').css('display', 'block');
};
GerenciaPessoaViewModel.prototype.hiddenLabelSelect = function () {
    $('.select-wrapper').parent().find('label').css('display', 'none');
};
GerenciaPessoaViewModel.prototype.getPessoa = function (idPessoa, tipoPessoa) {
    var self = this;
    self.customLoading.show();

    self.restClient.setWebServiceURL(self.webserviceSissecBaseURL + 'pessoas/' + idPessoa + '/' + tipoPessoa);
    self.restClient.setMethodGET();
    self.restClient.setDataToSender();
    self.restClient.setSuccessCallbackFunction(function (pessoaData) {
        self.showLabelSelect();
        self.idPessoa.val(pessoaData["idPessoa"]);
        self.tipoPessoa.val(pessoaData["tipo"]);
        self.nomePessoa.val(pessoaData["nome"]);
        self.emailPrincipal.val(pessoaData["emailPrincipal"]);
        self.emailAdicional.val(pessoaData["emailAdicional"]);

        if (tipoPessoa.toLowerCase() === 'fisica') {
            self.cpf.val(pessoaData["cpf"]);
            self.rg.val(pessoaData["rg"]);
            self.dataEmissao.val(sqlDateToBrasilDate(pessoaData["dataEmissao"]));
            self.orgaoEmissor.val(pessoaData["orgaoEmissor"]);
            self.ufOrgaoEmissor.val(pessoaData["ufOrgaoEmissor"]);
            self.paisNacionalidade.val(pessoaData["paisNacionalidade"]);
            self.dataNascimento.val(sqlDateToBrasilDate(pessoaData["dataNascimento"]));
            self.sexo.val(pessoaData["sexo"]);
            self.updateSelect();
        }
        if (tipoPessoa.toLowerCase() === 'juridica') {
            self.cnpj.val(pessoaData["cnpj"]);
            self.inscricaoEstadual.val(pessoaData["inscricaoEstadual"]);
            self.nomeFantasia.val(pessoaData["nomeFantasia"]);
        }

        var telefones = pessoaData["telefones"];
        var enderecos = pessoaData["enderecos"];

        telefones.forEach(function (item, index, array) {
            self.addTelefone(true, item['numero'], item['tipo']);
        });

        enderecos.forEach(function (item, index, array) {
            self.addEndereco(true, item);
        });

        Materialize.updateTextFields();
        self.customLoading.hide();

    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro em obter pessoa');
    });
    self.restClient.exec();
};
GerenciaPessoaViewModel.prototype.resetForm = function (tipoPessoa) {
    var self = this;

    self.telefoneBlock.find('.telefoneItem').not('#telefoneItem0').remove();
    self.enderecoBlock.find('.enderecoItem').not('#enderecoItem0').remove();

    $('#' + self.gerenciaPessoaModalId).find(':input')
        .not(':button, :submit,select,.select-dropdown')
        .each(function () {

        var item = $(this);
        if (item.attr('name') === 'tipoPessoa') {
            item.val(tipoPessoa);
        }
        else if (item.attr('name') === 'validacao') {
            item.val("false");
        }
        else if (item.attr('name') === 'divergente') {
            if (item.val() === 'true') {
                item.val('false');
                item.trigger('click');
            }
        }
        else {
            item.val('');
        }
    });
};
GerenciaPessoaViewModel.prototype.editPessoa = function (idPessoa, tipoPessoa) {
    var self = this;
    self.actionIncluirOrEditarPessoa = 'alterar';
    self.getPessoa(idPessoa, tipoPessoa);
    self.showModalEditPessoa(tipoPessoa);
};
GerenciaPessoaViewModel.prototype.showModalEditPessoa = function (tipoPessoa) {
    var self = this;
    var tipo = tipoPessoa.toLowerCase() === 'fisica' ? 'tabPessoaFisicaModal' : 'tabPessoaJuridicaModal';

    $().animatedModalOpem('gerenciaPessoaModal', 'bounceInRight', 'bounceOutRight', function () {
        $('ul.tabs').tabs('select_tab', tipo);
        /* self.floatingActionsBtns.show(200);*/
    });

};
GerenciaPessoaViewModel.prototype.addPessoa = function (tipoPessoa) {
    var self = this;
    self.actionIncluirOrEditarPessoa = 'incluir';
    self.resetForm(tipoPessoa);
    self.showModalEditPessoa(tipoPessoa);
};
GerenciaPessoaViewModel.prototype.deletePessoa = function () {
    //table.ajax.reload();
};
GerenciaPessoaViewModel.prototype.updatePessoa = function () {
    this.tablePessoaFisica.DataTable().ajax.reload();
};
// parte add pessoa
GerenciaPessoaViewModel.prototype.getPaises = function (select,idPaisToSelect) {
    var self = this;
    self.customLoading.show();

    this.restClient.setWebServiceURL(self.webservicePmroBaseURL + 'pais');
    this.restClient.setMethodGET();
    this.restClient.setSuccessCallbackFunction(function (data) {
        if (!select) {
            populateSelect($('[name="' + self.selectPaisName + '"]'), data, 'id', 'nome', 'brasil');
            populateSelect($('[name="' + self.selectPaisNacionalidadeName + '"]'), data, 'id', 'nome', 'brasil');
        }
        else {
            populateSelect(select, data, 'id', 'nome', 'brasil');
            if(idPaisToSelect) {
                select.val(idPaisToSelect);
            }
        }
        self.updateSelect();
        self.customLoading.hide();
    });
    this.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        alert('Erro em obter Paises');
        self.customLoading.hide();
    });
    this.restClient.exec();
};
GerenciaPessoaViewModel.prototype.getUFs = function (select,idUfToSelect) {
    var self = this;
    self.customLoading.show();

    var dataToSender = {'idPais': 33};
    this.restClient.setWebServiceURL(this.webservicePmroBaseURL + 'uf');
    this.restClient.setMethodPOST();
    this.restClient.setDataToSender(dataToSender);
    this.restClient.setSuccessCallbackFunction(function (data) {
        if (!select) {
            populateSelect($('[name="' + self.selectUfName + '"]'), data, 'id', 'nome', 'rio de janeiro');
            populateSelect($('[name="' + self.selectUfOrgaoEmissorName + '"]'), data, 'id', 'nome', 'rio de janeiro');
            populateSelect(self.selectUfBuscaCEP, data, 'id', 'nome', 'rio de janeiro');
        }
        else {
            populateSelect(select, data, 'id', 'nome', 'rio de janeiro');
            if(idUfToSelect) {
                select.val(idUfToSelect);
            }
        }

        self.updateSelect();
        self.customLoading.hide();
    });
    this.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro em obter lista de estados');
    });
    this.restClient.exec();
};
GerenciaPessoaViewModel.prototype.getMunicipios = function (select,idUF,idMunicipioToSelect) {
    var self = this;
    self.customLoading.show();

    if (idUF == null) {
        idUF = 20;
    }
    var dataToSender = {'idUF': idUF};
    this.restClient.setWebServiceURL(this.webservicePmroBaseURL + 'municipio');
    this.restClient.setMethodPOST();
    this.restClient.setDataToSender(dataToSender);
    this.restClient.setSuccessCallbackFunction(function (data) {
        if (!select) {
            populateSelect($('[name="' + self.selectMunicipioName + '"]'), data, 'id', 'nome', 'rio das ostras');
            populateSelect(self.selectMunicipioBuscaCEP, data, 'id', 'nome', 'rio das ostras');
        }
        else {
            populateSelect(select, data, 'id', 'nome', 'rio das ostras');
            if(idMunicipioToSelect) {
                select.val(idMunicipioToSelect);
            }
        }

        self.updateSelect();
        self.customLoading.hide();
    });
    this.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro em obter lista de municipios');
    });
    this.restClient.exec();
};
GerenciaPessoaViewModel.prototype.getCEPbyEndereco = function (endereco, refCorrentDivEndereco) {
    var self = this;
    var dataToSender = {'endereco': endereco};
    if (self.correiosDataTable !== null) {
        self.correiosDataTable.destroy();
    }
    self.correiosDataTable = self.tableResultCorreios.DataTable({
        oLanguage: {
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Digite aqui palavras-chave",
            "sInfo": "_START_ -_END_ de _TOTAL_",
            "sLengthMenu": '<span></span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        },
        bAutoWidth: false,
        responsive: true,
        processing: true,
        serverSide: true,
        ordering: false,
        searching: false,
        info: false,
        ajax: {
            url: self.webserviceJubarteBaseURL + "correios/cep",
            type: "POST",
            data: dataToSender,
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Ouve um erro ao tentar localizar o CEP, verifique se você esta conectado a internet ou se você digitou informações invalidas, se o erro persistir entre em contato com a COTINF/PMRO')
            }
        },
        columns: [{'data': 'tipo', 'width': '3%'}, {
            "data": "logradouro", 'width': '14%'
        }, {"data": "complemento"}, {"data": "bairro", 'width': '14%'}, {
            "data": "localidade", 'width': '14%'
        }, {"data": "uf", 'width': '14%'}, {"data": "cep", 'width': '14%'}]

    });

    self.tableResultCorreios.on('click', 'tbody tr', function () {
        var data = self.correiosDataTable.row(this).data();
        console.log(data);
        var cep = data['cep'].replace('-', '').trim();
        self.getEnderecoByCEP(cep, refCorrentDivEndereco);
        self.modalCEP.close();
    });
};
GerenciaPessoaViewModel.prototype.getEnderecoByCEP = function (cep, refCorrentDivEndereco) {
    var self = this;
    self.customLoading.show();

    /*refCorrentDivEndereco.find('[name="bairro"]').prop('disabled', true);
    refCorrentDivEndereco.find('[name="uf"]').prop('disabled', true);
    refCorrentDivEndereco.find('[name="municipio"]').prop('disabled', true);
    refCorrentDivEndereco.find('[name="logradouro"]').prop('disabled', true);
    refCorrentDivEndereco.find('[name="tipoLogradouro"]').prop('disabled', true);*/

    this.restClient.setWebServiceURL(self.webserviceJubarteBaseURL + 'correios/endereco/' + cep);
    this.restClient.setMethodGET();
    this.restClient.setSuccessCallbackFunction(function (data) {
        //set o input validaoCorreios para true
        var estadoCorreios = data['uf'];
        var municipioCorreios = data['municipio'];
        var tipoLogradouroCorreios = data['tipo'];

        refCorrentDivEndereco.find('[name="validacao"]').val('true');
        refCorrentDivEndereco.find('[name="cep"]').val(data['cep']);

        //seleciona o PAIS
        var selectPais = refCorrentDivEndereco.find('[name="pais"]');
        setSelectIsContain(selectPais, 'brasil');
        self.updateSelect();

        //seleciona o ESTADO
        var selectUf = refCorrentDivEndereco.find('[name="uf"]');
        setSelectIsContain(selectUf, estadoCorreios);
        self.updateSelect();

        //dispara o evento change preenchendo o select municipio com as municipios
        //do estado do CEP e seta o municipio do CEP
        //eventFire(selectUf[0], 'change');
        var timerFunc = setInterval(function () {
            if (self.customLoading.isProcessing() === false) {
                clearInterval(timerFunc);
                var selectMunicipio = refCorrentDivEndereco.find('[name="municipio"]');
                setSelectIsContain(selectMunicipio, municipioCorreios);
                self.updateSelect();
            }
        }, 500);

        refCorrentDivEndereco.find('[name="bairro"]').val(data['bairro']);
        refCorrentDivEndereco.find('[name="logradouro"]').val(data['logradouro']);

        var selectTipoLogradouro = refCorrentDivEndereco.find('[name="tipoLogradouro"]');
        if (!setSelectIsContain(selectTipoLogradouro, tipoLogradouroCorreios)) {
            selectTipoLogradouro.append($('<option>', {
                value: tipoLogradouroCorreios, text: tipoLogradouroCorreios
            }).attr("selected", true));
        }
        self.updateSelect();
        Materialize.updateTextFields();
        self.customLoading.hide();
    });
    this.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        refCorrentDivEndereco.find('[name="bairro"]').prop('disabled', false);
        refCorrentDivEndereco.find('[name="uf"]').prop('disabled', false);
        refCorrentDivEndereco.find('[name="municipio"]').prop('disabled', false);
        refCorrentDivEndereco.find('[name="logradouro"]').prop('disabled', false);
        refCorrentDivEndereco.find('[name="tipoLogradouro"]').prop('disabled', false);
        alert('Não foi possível obter endereço pelo CEP informado.');
    });
    this.restClient.exec();
};
GerenciaPessoaViewModel.prototype.validaForm = function (tipoPessoa) {
    var self = this;

    if (tipoPessoa.toLowerCase() === 'fisica') {
        if (!self.nomePessoa.val()) {
            self.nomePessoa.focus();
            alert('Digite um nome!');
            return false;
        }
        if (!validaCPF(self.cpf.val())) {
            self.cpf.focus();
            alert('Digite um CPF valido!');
            return false;
        }
        if (!validaData(self.dataNascimento.val())) {
            self.dataNascimento.focus();
            alert('Digite uma data de nascimento valida!');
            return false;
        }
        if (!self.sexo.val()) {
            self.sexo.focus();
            alert('Selecione um sexo!');
            return false;
        }

    }
    else {
        if (!self.nomePessoa.val()) {
            self.nomePessoa.focus();
            alert('Digite a razão social!');
            return false;
        }
        if (!self.nomeFantasia.val()) {
            self.nomeFantasia.focus();
            alert('Digite o nome fantasia!');
            return false;
        }
        if (!self.cnpj.val()) {
            self.cnpj.focus();
            alert('Digite um CNPJ valido!');
            return false;
        }

    }
    var telefone = $('[name="numeroTelefone"]');
    if (!telefone.val()) {
        telefone.focus();
        alert('Digite um telefone!');
        return false;
    }
    var cep = $('[name="cep"]');
    if (!cep.val()) {
        cep.focus();
        alert('Digite um CEP, e click em preencher!');
        return false;
    }
    return true;
};
GerenciaPessoaViewModel.prototype.maskForm = function () {
    var self = this;
    //$("#date").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});
    this.cpf.mask('999.999.999-99');
    this.dataEmissao.mask('99/99/9999');
    this.dataNascimento.mask('99/99/9999');
    this.cnpj.mask('99.999.999/9999-99');

    $(document).on('focus', '[name="numeroTelefone"]', function () {
        var numeroTelefone = $(this);
        var tipoTelefone = numeroTelefone.closest('div[class^="telefoneItem"]').find('[name="tipoTelefone"]');
        if (!tipoTelefone.val()) {
            $(this).keydown(function () {
                return false;
            });
            self.validaInput(false, numeroTelefone, 'Selecione o tipo de telefone primeiro');
            tipoTelefone.focus();
        }
        else if (tipoTelefone.val() === 'Móvel') {
            numeroTelefone.unbind('keydown');
            self.validaInput(true, numeroTelefone);
            numeroTelefone.mask("(99)99999-9999");
        }
        else {
            numeroTelefone.unbind('keydown');
            self.validaInput(true, numeroTelefone);
            numeroTelefone.mask("(99)9999-9999");
        }
    });

};
GerenciaPessoaViewModel.prototype.savePessoa = function (action) {
    var self = this;

    var tipoPessoa = self.tipoPessoa.val();

    if (!self.validaForm(tipoPessoa)) {
        return false;
    }

    // OBTEM DADOS DO FORMULARIO
    var dataToSender = {
        'idPessoa': self.idPessoa.val(),
        'tipo': tipoPessoa,
        'nome': smartCapitalize(self.nomePessoa.val().trim()),
        'emailPrincipal': self.emailPrincipal.val().toLowerCase().trim(),
        'emailAdicional': self.emailAdicional.val().toLowerCase().trim(),

        'cpf': self.cpf.val().replace(/[^\d]+/g, ''),
        'rg': self.rg.val(),
        'dataEmissao': self.dataEmissao.val(),
        'orgaoEmissor': self.orgaoEmissor.val(),
        'idUfOrgaoEmissor': self.ufOrgaoEmissor.val(),
        'idPaisNacionalidade': self.paisNacionalidade.val(),
        'dataNascimento': self.dataNascimento.val(),
        'sexo': self.sexo.val(),

        'cnpj': self.cnpj.val(),
        'nomeFantasia': smartCapitalize(self.nomeFantasia.val()),
        'inscricaoEstadual': self.inscricaoEstadual.val()
    };
    self.customLoading.show();

    // OBTEM TELEFONES
    var telefones = [];
    self.telefoneBlock.find('.telefoneItem').each(function (index) {
        var telefoneItem = {};
        $(this).find(':input').not('.select-dropdown').each(function (index) {
            if (this.name === 'numeroTelefone') {
                telefoneItem[this.name] = this.value.replace(/[^\d]+/g, '');
            }
            else {
                telefoneItem[this.name] = this.value;
            }
        });
        telefones.push(telefoneItem);
    });
    dataToSender['telefones'] = telefones;

    // OBTEM ENDEREÇOS
    var enderecos = [];
    self.enderecoBlock.find('.enderecoItem').each(function (index) {
        var enderecoItem = {};
        $(this).find(':input').not('.select-dropdown, button').each(function (index) {
           var name = this.name; var value = this.value;
            if(name === "validacao"){
                value = value === "true";
            }
            if(name === "divergente"){
                value = value === "true";
            }
            enderecoItem[name] = value;
        });
        enderecos.push(enderecoItem);
    });
    dataToSender['enderecos'] = enderecos;

    console.log(JSON.stringify(dataToSender));

    this.restClient.setWebServiceURL(self.webserviceSissecBaseURL + 'pessoas');
    this.restClient.setMethodPUT();
    if (action === "alterar") {
        this.restClient.setWebServiceURL(self.webserviceSissecBaseURL + 'pessoas/'+self.idPessoa);
    }

    this.restClient.setDataToSender(dataToSender);
    this.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        alert('Mensagem: ' + data['message']);
        location.reload();
    });
    this.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        var exception = "";
        console.log(jqXHR.responseJSON);

        if(jqXHR.responseJSON){
            exception = jqXHR.responseJSON['exception'];
        }

        alert('Mensagem: Não foi possível salvar os dados, verifique se você esta conectado, ou se esta pessoa já foi cadastrada!' + '\n\nDetalhe do erro: ' +exception);
    });
    this.restClient.exec();
    return true;
};
GerenciaPessoaViewModel.prototype.addTelefone = function (empty, numeroTelefone, tipoTelefone) {
    var self = this;

    if (empty === true) {
        self.telefoneBlock.empty();
    }

    var itemCount = self.telefoneBlock.children().length;
    if (itemCount < self.limitTelefones || empty === true) {
        var html = $('<div id="telefoneItem' + itemCount + '" class="telefoneItem"><div class="input-field col s12 m2"><select name="tipoTelefone"><option selected disabled>Tipo</option><option value="Residencial">Residencial</option><option value="Comercial">Comercial</option><option value="Móvel">Móvel</option><option value="Outro">Outro</option></select><label></label></div><div class="input-field col s12 m2"><input type="tel" name="numeroTelefone"><label>Telefone</label></div></div>');

        if (numeroTelefone) {
            html.find('[name="numeroTelefone"]').val(numeroTelefone);
        }
        if (tipoTelefone) {
            html.find('[name="tipoTelefone"]').val(tipoTelefone);
        }
        Materialize.updateTextFields();
        self.updateSelect();

        self.telefoneBlock.append(html);
        self.updateSelect();
    }
};
//Remove um bloco de telefone da tela
GerenciaPessoaViewModel.prototype.removeTelefone = function () {
    var self = this;
    self.telefoneBlock.find('.telefoneItem:last').not('#telefoneItem0').remove();
};
//Adiciona um bloco de endereço na tela
GerenciaPessoaViewModel.prototype.addEndereco = function (empty, enderecoData) {
    var self = this;

    if (empty === true) {
        self.enderecoBlock.empty();
    }

    var itemCount = self.enderecoBlock.children().length;
    if (itemCount < self.limitEnderecos || empty === true) {

        var html = $('<div id="enderecoItem' + itemCount
            + '" class="enderecoItem card customCard">' +
            '<div class="row"><div class="input-field col s12 m2">' +
            '<input name="cep" type="text" maxlength="8" minlength="8" onfocus="preventsLetter(this)">' +
            '<label>CEP</label></div><div class="input-field col ">' +
            '<button class="waves-effect waves-light btn purple lighten-1" type="button" name="btnBuscarEndereco">Preencher</button>  ' +
            '<button class="waves-effect waves-light btn purple lighten-1 " type="button" name="btnShowModalBuscaCEP">Buscar CEP</button>' +
            '</div></div><div class="row">' +
            '<div class="input-field col s12 m3">' +
            '<select name="tipoEndereco">' +
            '<option selected disabled>Tipo de Endereço</option>' +
            '<option value="Residencial">Residencial</option>' +
            '<option value="Comercial">Comercial</option></select><label></label></div><div class="input-field col s12 m3"><select name="pais">' +
            '<option value="" selected disabled>Pais</option></select><label></label>' +
            '</div>' +
            '<div class="input-field col s12 m3">' +
            '<select name="uf"><option value="" selected disabled>Estado</option>' +
            '<option value="">Rio de Janeiro</option>' +
            '<option value="">Brasilia</option></select>' +
            '<label></label></div><div class="input-field col s12 m3">' +
            '<select name="municipio"><option value="" selected disabled>Municipio</option>' +
            '</select><label></label></div><div class="input-field col s12 m3">' +
            '<input name="bairro" type="text" maxlength="70" onfocus=\'preventsNumber(this)\'>' +
            '<label>Bairro</label></div><div class="input-field col s12 m2">' +
            '<select name="tipoLogradouro"><option value="" selected disabled>Tipo de Logradouro</option>' +
            '<option value="Rua">Rua</option><option value="Avenida">Avenida</option><option value="Beco">Beco</option><option value="Estrada">Estrada</option><option value="Praça">Praça</option><option value="Rodovia">Rodovia</option><option value="Travessa">Travessa</option><option value="Largo">Largo</option></select><label></label></div>' +
            '<div class="input-field col s12 m3"><input type="text"  name="logradouro">' +
            '<label>Logradouro</label></div><div class="input-field col s12 m1">' +
            '<input  name="numeroLogradouro" type="text" maxlength="10" onfocus=\'preventsLetter(this)\'>' +
            '<label>Número</label></div>' +
            '<div class="input-field col s12 m3">' +
            '<input type="text"  name="complemento" maxlength="70">' +
            '<label>Complemento</label></div>' +
            '<input type="hidden" name="validacao" value="false"/></div><div class="row">' +
            '<div class="col switch">' +
            '<label>' +
            '<input name="divergente" value="false" onclick="$(this).val(this.checked ? \'true\' : \'false\')" type="checkbox">' +
            '<span class="lever"></span>' +
            'Marque aqui caso o endereço dos correios seja divergente' +
            '</label>' +
            '</div>' +
            '</div>' +
            '</div>');

        self.enderecoBlock.append(html);

        if (enderecoData) {
            html.find('[name="cep"]').val(enderecoData['cep']);
            html.find('[name="tipoEndereco"]').val(enderecoData['tipo']);
            html.find('[name="bairro"]').val(enderecoData['bairro']);
            html.find('[name="tipoLogradouro"]').val(enderecoData['tipoLogradouro']);
            html.find('[name="logradouro"]').val(enderecoData['logradouro']);
            html.find('[name="numeroLogradouro"]').val(enderecoData['numero']);
            html.find('[name="complemento"]').val(enderecoData['complemento']);
            html.find('[name="divergente"]').prop('checked', enderecoData['divergente']);
            html.find('[name="validacao"]').val(enderecoData['validacao']);


            self.getPaises(html.find('[name="pais"]'),enderecoData['idPais']);
            self.getUFs(html.find('[name="uf"]'),enderecoData['idUf']);
            self.getMunicipios(html.find('[name="municipio"]'),enderecoData['idUf'],enderecoData['idMunicipio']);

        }else
        {
            self.getPaises();
            self.getUFs();
            self.getMunicipios();
        }

        Materialize.updateTextFields();
        self.updateSelect();
    }
};
GerenciaPessoaViewModel.prototype.eventos = function () {
    var self = this;

    //seta o valor do tipo de pessoa
    self.btnTabPessoaFisica.on('click', function () {
        self.tipoPessoa.val("Fisica");
        self.nomePessoa.parent().find('label').text('Nome');
    });
    self.btnTabPessoaJuridica.on('click', function () {
        self.tipoPessoa.val("Juridica");
        self.nomePessoa.parent().find('label').text('Razão Social');
    });

    //evento on change do select uf para obter municipios
    $(document).on('change', '[name="' + self.selectUfName + '"]', function (e) {
        var divEndereco = $(this).closest(('div[class^="' + self.enderecoItemClass + '"]'));
        var selectMunicipio = divEndereco.find('[name="' + self.selectMunicipioName + '"]');
        var selectUF = divEndereco.find('[name="' + self.selectUfName + '"]');

        self.getMunicipios(selectMunicipio,selectUF.val());
    });

    //quando selecionar um estado de UfBuscaCEP obtem os municipios deste estado
    self.selectUfBuscaCEP.change(function (e) {
        self.getMunicipios(self.selectMunicipioBuscaCEP,self.selectUfBuscaCEP.val());
    });

    //quando selecionar um pais diferente de Brasil desativa os selects uf e municipio
    $(document).on('change', '[name="pais"]', function (e) {
        var divEndereco = $(this).closest(('div[class^="' + self.enderecoItemClass + '"]'));

        if ($(this).find("option:selected").text() != 'Brasil') {
            divEndereco.find('[name="municipio"]').prop('disabled', true);
            divEndereco.find('[name="uf"]').prop('disabled', true);
        }
        else {
            divEndereco.find('[name="municipio"]').prop('disabled', false);
            divEndereco.find('[name="uf"]').prop('disabled', false);
        }
        self.updateSelect();
    });

    //Abre o modal de busca CEP e grava a referencia do bloco de endereço corrent
    $(document).on('click', '[name="' + self.btnShowModalBuscaCEPName + '"]', function () {
        self.refOfCorrentDivEndereco = $(this).closest(('div[class^="' + self.enderecoItemClass + '"]'));
        self.modalCEP.open();
        console.log(self.refOfCorrentDivEndereco.attr('id'));
    });

    //buscar endeço nos correios pelo cep informado e preencher os campos de endereço
    $(document).on('click', '[name="' + self.btnBuscarEnderecoName + '"]', function (e) {
        var divEndereco = $(this).closest(('div[class^="' + self.enderecoItemClass + '"]'));

        var correntCep = divEndereco.find('[name="cep"]').val();
        if (!correntCep) {
            alert('CEP não pode ser vazio');
        }
        else {
            self.getEnderecoByCEP(correntCep, divEndereco);
        }
    });

    //Buscar CEP pelo endereço nos correios
    self.btnProcurarCEP.click(function (event) {
        self.tableResultCorreios.css('display', 'block');

        var ufBuscaCEP = self.selectUfBuscaCEP.find('option:selected').text();
        var municipioBuscaCEP = self.selectMunicipioBuscaCEP.find('option:selected').text();
        var bairroBuscaCEP = self.inputBairroBuscaCEP.val();
        var logradouroBuscaCEP = self.inputLogradouroBuscaCEP.val();

        var endereco = logradouroBuscaCEP + ',' + bairroBuscaCEP + ',' + municipioBuscaCEP + ',' + converterEstados(ufBuscaCEP);

        self.getCEPbyEndereco(endereco, self.refOfCorrentDivEndereco);

    });

    //salva as alterações ou inclui uma pessoa nova
    self.btnSalvar.click(function (event) {
        self.savePessoa(self.actionIncluirOrEditarPessoa);
    });

    /** VALIDAÇÕES **/
    self.cpf.on('blur', function () {
        if (!(validaCPF(this.value))) {
            self.validaInput(false, self.cpf);
        }
        else {
            self.validaInput(true, self.cpf);
        }
    });
    self.dataNascimento.on('blur', function () {
        if (!(validaData(this.value))) {
            self.validaInput(false, self.dataNascimento);
        }
        else {
            self.validaInput(true, self.dataNascimento);
        }
    });
    self.dataEmissao.on('blur', function () {
        if (!(validaData(this.value))) {
            self.validaInput(false, self.dataEmissao);
        }
        else {
            self.validaInput(true, self.dataEmissao);
        }
    });

    this.btnAddTelefone.click(function () {
        self.addTelefone()
    });
    this.btnRemoveTelefone.click(function () {
        self.removeTelefone()
    });
    this.btnAddEndereco.click(function () {
        self.addEndereco()
    });

    //esconde os botoes flutuantes
    $('.animatedModalCloseBtn').click(function () {
        /*self.floatingActionsBtns.hide(200);*/
    });

    //eventos ações dataTable pessoa fisica
    self.btnAddPessoaFisica.click(function () {
        self.addPessoa('Fisica');
    });
    self.btnUpdatePessoaFisica.click(function () {
        self.updatePessoa()
    });
    // evento click na linha do dataTables pessoa fisica e abre o modal de edição
    self.dataTablePessoaFisica.on('click', 'tbody tr .dataTableClick', function () {
        var data = self.dataTablePessoaFisica.row($(this).closest('tr')).data();
        if (!self.disableFeature) {
            self.editPessoa(data['id'], 'fisica');
        }
    });


    //eventos ações dataTable pessoa juridica
    self.btnAddPessoaJuridica.click(function () {
        self.addPessoa('Juridica');
    });
    // evento click na linha do dataTables pessoa juridica e abre o modal de edição
    self.tablePessoaJuridica.on('click', 'tbody tr .dataTableClick', function () {
        var data = self.dataTablePessoaJuridica.row($(this).closest('tr')).data();
        if (!self.disableFeature) {
            self.editPessoa(data['id'], 'juridica');
        }
    });

};
GerenciaPessoaViewModel.prototype.validaInput = function (status, input, mensagem) {
    if (!mensagem) {
        mensagem = 'Campo ' + input.parent().find('label').text() + ' incorreto!';
    }
    if (!status) {
        input.addClass('invalid');
        input.css('color', 'red');
        input.parent().find('label').css('color', 'red');
        Materialize.toast(mensagem, 3000)
    }
    else {
        input.removeClass('invalid');
        input.addClass('valid');
        input.css('color', 'green');
        input.parent().find('label').css('color', 'green');
    }
};

//disabilita recurso de acordo com o usuario logado
GerenciaPessoaViewModel.prototype.accessControl = function () {
    var self = this;
    //controle de acesso
    if (getPerfilUsuario(PERFIL_VISUALIZADOR) === PERFIL_VISUALIZADOR) {
        $("#btnAddPessoaFisica").remove();
        $("#btnDeletePessoaFisica").remove();

        $("#btnAddPessoaJuridica").remove();
        $("#btnDeletePessoaJuridica").remove();

        self.disableFeature = true;

    }
};