<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Empenho extends Model
{
    //database info
    const TABLE_NAME = 'Empenhos';
    const KEY_ID = 'id';
    const ID_CONTRATO = 'idContrato';
    const NUMERO = 'numero';
    const ANO = 'ano';
    const DATA = 'data';
    const ID_FONTE_RECURSO = 'idFonteRecurso';
    const CANCELADO = 'cancelado';
    const JUSTIFICATIVA = 'justificativa';
    const VALOR = 'valor';

    protected $table = self::TABLE_NAME;
    public $timestamps = false;
    protected $fillable = [self::KEY_ID, self::ID_CONTRATO, self::NUMERO, self::ANO, self::DATA, self::ID_FONTE_RECURSO, self::CANCELADO,self::JUSTIFICATIVA,self::VALOR];
    protected $primaryKey = self::KEY_ID;

    public function recurso()
    {
        return $this->hasOne('App\FonteRecurso', FonteRecurso::KEY_ID, self::ID_FONTE_RECURSO);
    }

    public function contrato()
    {
        return $this->hasOne('App\Contrato', Contrato::KEY_ID, self::ID_CONTRATO);
    }
}
