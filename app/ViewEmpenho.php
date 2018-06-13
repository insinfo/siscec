<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 06/02/2018
 * Time: 10:54
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class ViewEmpenho extends Model
{
    //database info
    const TABLE_NAME = 'ViewEmpenhos';
    const KEY_ID = 'id';
    const ID_CONTRATO = 'idContrato';
    const NUMERO = 'numero';
    const ANO = 'ano';
    const DATA = 'data';
    const ID_FONTE_RECURSO = 'idFonteRecurso';
    const CANCELADO = 'cancelado';
    const JUSTIFICATIVA = 'justificativa';
    const VALOR = 'valor';
    const ID_CONTROLE = 'idControle';
    const TOTAL_PAGO = 'totalPago';
    const SALDO = 'saldo';
    const NUMERO_CONTRATO = 'numeroContrato';
    const ANO_CONTRATO = 'anoContrato';
    const OBJETO = 'objeto';
    const ID_ORGANOGRAMA = 'idOrganograma';

    protected $table = self::TABLE_NAME;
    public $timestamps = false;
    protected $fillable = [
        self::KEY_ID,
        self::ID_CONTRATO,
        self::NUMERO,
        self::ANO,
        self::DATA,
        self::ID_FONTE_RECURSO,
        self::CANCELADO,
        self::JUSTIFICATIVA,
        self::VALOR,
        self::ID_CONTROLE,
        self::TOTAL_PAGO,
        self::SALDO,
        self::NUMERO_CONTRATO,
        self::ANO_CONTRATO,
        self::OBJETO
    ];

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