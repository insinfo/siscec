<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 31/01/2018
 * Time: 11:22
 */

namespace App\Utils;

class StatusMessage
{
    const SUCCESS = "Processo concluído com sucesso!";
    const ERROR = "Ocorreu um erro desconhecido, tente mais tarde!";
    const REQUIRED_PARAMETERS = "È nessessario o preenchimento correto dos parametros!";
    const NO_CONTENT = "Sem registros para essa consulta";
    const MENSAGEM_ERRO_PADRAO = 'Houve um erro ao executar esta ação, verifique se o procedimento executado esta correto, confire se os dados estão corretos, tenha certeza que você não esteja tentando cadastrar algo que já foi cadastrado, e tenha certeza que você não esta executando uma operação probida, se o erro persistir contate o suporte técnico.';
    const MENSAGEM_DE_SUCESSO_PADRAO = 'Operação realizada com sucesso!';
    const TODOS_ITENS_DELETADOS = 'Todos os itens foram deletados com sucesso';
    const NEM_TODOS_ITENS_DELETADOS = 'Nem todos os itens foram deletados com sucesso';
    const NENHUM_ITEM_DELETADO = 'Nenhum dos itens foram deletados';
    const CREDENCIAL_INVALIDA = 'Credencial Invalida';
    const ACESSO_AUTORIZADO = 'Acesso autorizado!';
    const ACESSO_NAO_AUTORIZADO = 'Acesso não autorizado!';
    const PARAMETRO_ID_NAO_E_VALIDO = 'Parametro id não é um número valido!';


    const NAO_E_POSIVEL_CADASTRAR_NOVO_CONTRATO = 'Você não pode cadastrar um novo contrato enquanto houver contrato aberto ou em andamento!';

    const SO_PODE_UM_CONTRATO_DO_TIPO_CONTRATO = 'Só pode haver um contrato do tipo "Contrato" os posteriores tem que ser do tipo "Aditivo"';

}