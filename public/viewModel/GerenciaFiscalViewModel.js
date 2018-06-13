$(document).ready(function ()
{
    var gerenciaFiscalViewModel = new GerenciaFiscalViewModel();
    gerenciaFiscalViewModel.init();
});

function GerenciaFiscalViewModel()
{
    this.webservicePmroBaseURL = WEBSERVICE_PMRO_BASE_URL;
    this.webserviceSiscecBaseURL = WEBSERVICE_SISCEC_BASE_URL;
    this.customLoading = new CustomLoading('loading');
    this.restClient = new RESTClient();
    this.inputNomeFiscal = $('#inputNomeFiscal');
    this.btnAddFiscal = $('#btnAddFiscal');
    this.btnSalvarFiscal = $('#btnSalvarFiscal');

    //modal pessoa fisica
    this.modalPessoaFisica = new CustomModal('modalPessoaFisica');
    this.tablePessoaFisica = $('#tablePessoaFisica');
    this.dataTablesPessoaFisica = null;

}
GerenciaFiscalViewModel.prototype.init = function () {
    var self = this;

    // INICIALIZAÇÃO MATERIALIZE
    $('ul.tabs').tabs();
    $('select').material_select();
    $('.modal').modal();
    // FIM INICIALIZAÇÃO MATERIALIZE
    self.eventos();
};

GerenciaFiscalViewModel.prototype.getPessoaFisicas = function (inputElement) {
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
        }, bAutoWidth: false, responsive: true, processing: true, serverSide: true, ordering: false, ajax: {
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
        inputElement.val(data['nome']);
        inputElement.attr('data-content', data['id']);
        self.modalPessoaFisica.close();
    });

};

GerenciaFiscalViewModel.prototype.eventos = function () {
    var self = this;
    self.inputNomeFiscal.click(function () {
        self.getPessoaFisicas(this);
    });
    self.btnAddFiscal.click(function () {
        $('.collapsible').collapsible('open', 0);
    });
    self.btnSalvarFiscal.click(function () {
        $('.collapsible').collapsible('open', 1);
    });
};