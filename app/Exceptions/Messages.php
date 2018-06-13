<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 14/12/2017
 * Time: 11:39
 */

namespace App\Exceptions;


class Messages
{
    const MENSAGEM_ERRO_PADRAO = 'Houve um erro ao executar esta ação, verifique se o procedimento executado esta correto, confire se os dados estão corretos, tenha certeza que você não esteja tentando cadastrar algo que já foi cadastrado, e tenha certeza que você não esta executando uma operação probida, se o erro persistir contate o suporte técnico.';

    const NAO_E_POSIVEL_CADASTRAR_NOVO_CONTRATO = 'Você não pode cadastrar um novo contrato enquanto houver contrato aberto ou em andamento!';

    const SO_PODE_UM_CONTRATO_DO_TIPO_CONTRATO = 'Só pode haver um contrato do tipo "Contrato" os posteriores tem que ser do tipo "Aditivo"';

    const MENSAGEM_DE_SUCESSO_PADRAO = 'Operação realizada com sucesso!';
}