<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 19/10/2017
 * Time: 15:45
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrganogramaHistorico extends Model
{
    const TABLE_NAME = "organograma_historico";
    const KEY_ID = "idOrganograma";
    const DATA_INICIO = "dataInicio";
    const SIGLA = "sigla";
    const NOME = "nome";
    const NUMERO_LEI = "numeroLei";
    const IS_OFICIAL = "isOficial";
    const ANO_LEI = "anoLei";
    const DATA_DIARIO = "dataDiario";
    const NUMERO_DIARIO = "numeroDiario";

    //protected $connection = 'pmroPadrao';
    protected $table = self::TABLE_NAME;
    protected $primaryKey = self::KEY_ID;
    public $timestamps = false;
    protected $fillable = [self::KEY_ID, self::DATA_INICIO, self::SIGLA, self::NOME, self::NUMERO_LEI, self::IS_OFICIAL, self::ANO_LEI, self::DATA_DIARIO, self::NUMERO_DIARIO];


}