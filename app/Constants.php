<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 20/12/2017
 * Time: 10:03
 */

namespace App;


class Constants
{
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

    const LISTA_PERFIL = ['Usuário', 'Usuário de Supervisão', 'Administrador','Usuário de Visualização'];
    const LISTA_TIPO_ADITIVO = ['Prazo', 'Valor', 'Prazo e Valor'];
    const LISTA_TIPO_CONTRATO = ['Contrato', 'Aditivo'];
    const LISTA_MODALIDADE = ['Serviço Contínuo', 'Tecnológico', 'Outros'];
    const LISTA_STATUS_CONTRATO = ['Aberto', 'Andamento', 'Anulado', 'Concluido', 'Paralizado', 'Rescindido'];

    const ID_ORGANOGRAMA_SEMFAZ = 54;

}