$(document).ready(function ()
{
    var gerenciaUsuarioViewModel = new GerenciaUsuarioViewModel();
    gerenciaUsuarioViewModel.init();
});
function GerenciaUsuarioViewModel()
{
    this.webservicePmroBaseURL = WEBSERVICE_PMRO_BASE_URL;
    this.webserviceSiscecBaseURL = WEBSERVICE_SISCEC_BASE_URL;
    this.customLoading = new CustomLoading('loading');
    this.restClient = new RESTClient();

    //formulario de cadastro de usuario
    this.inputNome = $('#inputNome');
    this.inputLogin = $('#inputLogin');
    this.inputOrganograma = $('#inputOrganograma');
    this.selectPerfil = $('#selectPerfil');
    this.checkboxAtivo = $('#checkboxAtivo');
    this.btnSalvarUsuario = $('#btnSalvarUsuario');
    this.idUsuario = null;

    //lista usuarios do sistema
    this.tableUsuarioSistema = $('#tableUsuarioSistema');
    this.dataTablesUsuarioSistema = null;
    this.btnAddUsuarioSistema = $('#btnAddUsuarioSistema');
    this.btnDeleteUsuarioSistema = $('#btnDeleteUsuarioSistema');
    this.listUsuarioSistemaRowsSelected = [];

    //modal pessoa fisica
    this.modalPessoaFisica = new CustomModal('modalPessoaFisica');
    this.tablePessoaFisica = $('#tablePessoaFisica');
    this.dataTablesPessoaFisica = null;

    //modal LDAP
    this.modalLDAP = new CustomModal('modalLDAP');
    this.tableUsuarioLDAP = $('#tableUsuarioLDAP');
    this.dataTablesUsuarioLDAP = null;

    //modal setor
    this.modalSetor = new CustomModal('modalSetor');
    this.treeViewModalBuscaSetor = $('#treeViewModalBuscaSetor');
    this.inputModalBuscaSetor = $('#inputModalBuscaSetor');
}
GerenciaUsuarioViewModel.prototype.init = function () {
    var self = this;

    // INICIALIZAÇÃO MATERIALIZE
    $('ul.tabs').tabs();
    $('select').material_select();
    $('.modal').modal();
    // FIM INICIALIZAÇÃO MATERIALIZE
    self.getUsuarios();
    self.eventos();
};
GerenciaUsuarioViewModel.prototype.getPessoaFisicas = function (inputElement) {
    var self = this;
    self.modalPessoaFisica.open();
    inputElement=$(inputElement);

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
        }, bAutoWidth: false, responsive: true, processing: true,
        serverSide: true, ordering: false,
        ajax: {
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

    self.tablePessoaFisica.off('click', 'tbody tr', function () {});
    self.tablePessoaFisica.on('click', 'tbody tr', function () {
        var data = self.dataTablesPessoaFisica.row(this).data();
        inputElement.val(data['nome']);
        inputElement.attr('data-content', data['id']);
        self.modalPessoaFisica.close();
    });

};
GerenciaUsuarioViewModel.prototype.getUsuarios = function () {
    var self = this;

    if (self.dataTablesUsuarioSistema !== null)
    {
        self.dataTablesUsuarioSistema.destroy();
    }

    // inicializa dataTables usuarios
    self.dataTablesUsuarioSistema = self.tableUsuarioSistema.DataTable({
        'order': [[1, 'asc']],
        oLanguage: {
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Digite aqui palavras-chave",
            "sInfo": "_START_ -_END_ de _TOTAL_",
            "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        },
        bAutoWidth: false,
        responsive: true,
        processing: true,
        serverSide: true,
        ordering: false,
        ajax: {
            url: self.webserviceSiscecBaseURL + "usuarios",
            type: "POST"
        },
        columns: [
            {"data": "id", width: "50px",
                'render': function (data, type, full, meta) {
                    return '<div class="dataTableCheckBox"><input type="checkbox" id="checkRowUsuarioSistema' + data + '"/><label for="checkRowUsuarioSistema' + data + '"></label></div>';
                }
            },
            {"data": "idPessoa", 'class': 'dataTableClick',"render":function (data, type, row) {
                   return row['pessoa'] ? row['pessoa']['nome'] : '';
                }},
            {"data": "login", 'class': 'dataTableClick'},
            {"data": "idOrganograma", 'class': 'dataTableClick',"render":function (data, type, row)
                {
                    if(row['setor'])
                    {
                        return row['setor']['sigla'];
                    }
                    return  data;
                }},
            {"data": "perfil", 'class': 'dataTableClick',"render":function (data, type, row) {
                    return listaPerfil[data];
                }},
            {"data": "ativo", 'class': 'dataTableClick',"render":function (data, type, row) {
                    return data ? 'Ativo' : 'Inativo';
                }}

        ]
    });

    // evento de click do checkbox das linhas do dataTables pessoa juridica
    dataTableSelectAll(self.tableUsuarioSistema, self.dataTablesUsuarioSistema, self.listUsuarioSistemaRowsSelected);

    dataTableSelect(self.tableUsuarioSistema, self.dataTablesUsuarioSistema, self.listUsuarioSistemaRowsSelected);


};
GerenciaUsuarioViewModel.prototype.getLDAPLogins = function (inputElement) {
    var self = this;
    self.modalLDAP.open();
    inputElement=$(inputElement);

    if (self.dataTablesUsuarioLDAP !== null)
    {
        self.dataTablesUsuarioLDAP.destroy();
    }

    // inicializa dataTables pessoa fisica
    self.dataTablesUsuarioLDAP = self.tableUsuarioLDAP.DataTable({
        'order': [[0, 'asc']],
        oLanguage: {
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Digite aqui palavras-chave",
            "sInfo": "_START_ -_END_ de _TOTAL_",
            "sLengthMenu": '<span>Linhas:</span><select class="browser-default">' + '<option value="10">10</option>' + '<option value="20">20</option>' + '<option value="30">30</option>' + '<option value="40">40</option>' + '<option value="50">50</option>' + '<option value="-1">All</option>' + '</select></div>'
        },
        bAutoWidth: false,
        responsive: true,
        processing: true,
        serverSide: true,
        ordering: false,
        ajax: {
            url: self.webserviceSiscecBaseURL + "usuarios/ldap",
            type: "POST"
        },
        columns:
            [
            {"data": "nome", 'class': 'dataTableClick'},
            {"data": "login", 'class': 'dataTableClick'}
        ]
    });
    self.tableUsuarioLDAP.off('click', 'tbody tr', function () {});
    self.tableUsuarioLDAP.on('click', 'tbody tr', function () {
        var data = self.dataTablesUsuarioLDAP.row(this).data();
        inputElement.val(data['login']);
        self.modalLDAP.close();
    });

};
GerenciaUsuarioViewModel.prototype.validaForm = function () {
    var self = this;

    if (!self.inputNome.val())
    {
        self.inputNome.focus();
        alert('Selecione uma pessoa!');
        return false;
    }
    if (!self.inputLogin.val())
    {
        self.inputLogin.focus();
        alert('Selecione um login!');
        return false;
    }
    if (!self.inputOrganograma.val())
    {
        self.inputOrganograma.focus();
        alert('Selecione o organograma!');
        return false;
    }
    if (!self.selectPerfil.val())
    {
        self.selectPerfil.focus();
        alert('Selecione um perfil!');
        return false;
    }

    return true;
};
GerenciaUsuarioViewModel.prototype.getSetores = function (inputDOM) {
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
        self.inputModalBuscaSetor.off('keyup', search);
        self.inputModalBuscaSetor.on('keyup', search);
        self.modalSetor.open();
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro em obter setores');
    });
    self.restClient.exec();
};
GerenciaUsuarioViewModel.prototype.saveUsuario = function () {
    var self = this;

    if (!self.validaForm())
    {
        return false;
    }

    /** OBTEM DADOS DO FORMULARIO **/
    var dataToSender = {
        'idPessoa': self.inputNome.attr('data-content'),
        'login': self.inputLogin.val(),
        'perfil': self.selectPerfil.val(),
        'idOrganograma': self.inputOrganograma.attr('data-content'),
        'ativo': self.checkboxAtivo.is(':checked'),
        'dataCadastro': moment().format("YYYY-MM-DD")
    };

    //console.log(JSON.stringify(dataToSender));
    self.customLoading.show();
    var idURL = self.idUsuario === null ? '' : '/' + self.idUsuario;

    self.restClient.setDataToSender(dataToSender);
    self.restClient.setWebServiceURL(self.webserviceSiscecBaseURL + 'usuarios' + idURL);
    self.restClient.setMethodPUT();
    self.restClient.setSuccessCallbackFunction(function (data) {
        self.customLoading.hide();
        alert('Salvo com sucesso!');
        location.reload();
    });
    self.restClient.setErrorCallbackFunction(function (jqXHR, textStatus, errorThrown) {
        self.customLoading.hide();
        alert('Erro ao salvar o usuário');
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    });
    self.restClient.exec();
};
GerenciaUsuarioViewModel.prototype.eventos = function () {
    var self = this;
    self.inputNome.click(function () {
        self.getPessoaFisicas(this);
    });
    self.inputLogin.click(function () {
        self.getLDAPLogins(this);
    });

    self.btnSalvarUsuario.click(function () {
        //$('.collapsible').collapsible('open', 1);
        self.saveUsuario();
    });
    self.inputOrganograma.click(function () {
        self.getSetores(this);
    });

    self.btnAddUsuarioSistema.click(function () {
        $('.collapsible').collapsible('open', 0);
    });

    self.btnDeleteUsuarioSistema.click(function () {
    });

    self.tableUsuarioSistema.on('click', 'tbody tr', function () {
        var data = self.dataTablesUsuarioSistema.row(this).data();
       // console.log(data);
        self.fillForm(data);
    });
};
GerenciaUsuarioViewModel.prototype.fillForm = function (data) {
    var self = this;
    //formulario de cadastro de usuario
    self.inputNome.val(data['pessoa']['nome']);
    self.inputNome.attr('data-content', data['idPessoa']);
    self.inputLogin.val(data['login']);
    self.inputOrganograma.val(data['setor']['sigla']);
    self.inputOrganograma.attr('data-content', data['idOrganograma']);
    self.selectPerfil.val(data['perfil']);
    self.checkboxAtivo.prop('checked', data['ativo']);
    self.idUsuario = data['id'];
    $('.collapsible').collapsible('open', 0);
    self.updateInputs();
};
GerenciaUsuarioViewModel.prototype.updateInputs = function () {
    Materialize.updateTextFields();
    $('select').material_select();
};