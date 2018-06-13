<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    const TABLE_NAME = 'Contratos';
    const KEY_ID = 'id';
    const ID_CONTROLE = 'idControle';
    const NUMERO_PROCESSO = 'numeroProcesso';
    const ANO_PROCESSO = 'anoProcesso';
    const NUMERO_CONTRATO = 'numeroContrato';
    const ANO_CONTRATO = 'anoContrato';
    const DATA_INICIO = 'dataInicio';
    const DATA_FIM = 'dataFim';
    const VALOR = 'valor';
    const PRAZO_LIMITE_ADITIVO = 'prazoLimiteAditivo';
    const TIPO_CONTRATO = 'tipoContrato';
    const TIPO_ADITIVO = 'tipoAditivo';
    const SITUACAO = 'situacao';
    const DATA_ADITIVO = 'dataAditivo';
    const JUSTIFICATIVA_ADITIVO = 'justificativaAditivo';
    const DATA_LIMIT_ADITIVO = 'dataLimitAditivo';

    const VIEW_CONTRATOS = 'ViewContratos';

    protected $table = self::TABLE_NAME;

    public $timestamps = false;

    protected $fillable = [
        self::ID_CONTROLE,
        self::NUMERO_PROCESSO,
        self::ANO_PROCESSO,
        self::NUMERO_CONTRATO,
        self::ANO_CONTRATO,
        self::DATA_INICIO,
        self::DATA_FIM,
        self::VALOR,
        self::PRAZO_LIMITE_ADITIVO,
        self::TIPO_CONTRATO,
        self::TIPO_ADITIVO,
        self::SITUACAO,
        self::DATA_ADITIVO,
        self::JUSTIFICATIVA_ADITIVO,
        self::DATA_LIMIT_ADITIVO];

    //protected $guarded = [];
    //protected $connection = 'connection-name';
    protected $primaryKey = self::KEY_ID;

    public function controle()
    {
        //cria o relacionamento com a tabela pai controles um para um
        //parametro 1: Modelo pai
        //parametro 2: chave estrangeira deste modelo ou seja "idControle" da tabela "contratos"
        //parametro 3: chave primaria do pai
        return $this->belongsTo('App\Controle', Contrato::ID_CONTROLE, Controle::KEY_ID);
    }


}
