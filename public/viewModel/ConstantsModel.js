var listaTipoAditivo = ['Prazo', 'Valor', 'Prazo e Valor'];
var listaTipoContrato = ['Contrato', 'Aditivo'];
var listaModalidades = ['Serviço Contínuo', 'Tecnológico', 'Outros'];
var listaStatusContrato = ['Aberto', 'Andamento', 'Anulado', 'Concluido', 'Paralizado', 'Rescindido'];

var listaPerfil = ['Usuário', 'Usuário de Supervisão', 'Administrador','Usuário de Visualização'];

var WEBSERVICE_PMRO_BASE_URL = '/pmroPadrao/';// //laravel.riodasostras.rj.gov.br/pmroPadrao/
var WEBSERVICE_SISCEC_BASE_URL = '/siscec/api/';// //laravel.riodasostras.rj.gov.br/siscec/api/
var WEBSERVICE_JUBARTE_BASE_URL = '/api/';


var MENSAGEM_ERRO_PADRAO = 'Houve um erro ao executar esta ação, verifique se o procedimento executado esta correto, confire se os dados estão corretos, e tenha certeza que você não esta executando uma operação probida, se o erro persistir contate o suporte técnico.';

var MENSAGEM_DE_SUCESSO_PADRAO = 'Operação realizada com sucesso!';


const CONTRATO = 0;
const ADITIVO = 1;

const PERFIL_USUARIO = 0;
const PERFIL_SUPERVISOR = 1;
const PERFIL_ADMINISTRADOR = 2;
const PERFIL_VISUALIZADOR = 3;

const CONTRATO_TIPO_ADITIVO_PRAZO = 0;
const CONTRATO_TIPO_ADITIVO_VALOR = 1;
const CONTRATO_TIPO_ADITIVO_PRAZO_VALOR = 2;

const CONTRATO_MODALIDADE_SERVICO_CONTINUO = 0;
const CONTRATO_MODALIDADE_TECNOLOGICO = 1;
const CONTRATO_MODALIDADE_OUTROS = 2;

const CONTRATO_STATUS_ABERTO = 0;
const CONTRATO_STATUS_ANDAMENTO = 1;
const CONTRATO_STATUS_ANULADO = 2;
const CONTRATO_STATUS_CONCLUIDO = 3;
const CONTRATO_STATUS_PARALIZADO = 4;
const CONTRATO_STATUS_RESCINDIDO = 5;

function getPerfilUsuario () {
    return parseInt(sessionStorage.getItem('idPerfil'));
}

function getSetorUsuario () {
    return parseInt(sessionStorage.getItem('idOrganograma'));
}