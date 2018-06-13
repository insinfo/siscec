<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 19/10/2017
 * Time: 17:23
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pessoa extends Model
{
    const TABLE_NAME = "pessoas";
    const KEY_ID = "id";
    const CGM = "cgm";
    const NOME = "nome";
    const EMAIL_PRINCIPAL = "emailPrincipal";
    const EMAIL_ADICIONAL = "emailAdicional";
    const TIPO = "tipo";
    const DATA_INCLUSAO = "dataInclusao";
    const DATA_ALTERACAO = "dataAlteracao";

    //protected $connection = 'pmroPadrao';
    protected $table = self::TABLE_NAME;
    protected $primaryKey = self::KEY_ID;
    public $timestamps = false;

    protected $fillable = [self::KEY_ID, self::CGM, self::NOME, self::EMAIL_PRINCIPAL, self::EMAIL_ADICIONAL, self::TIPO, self::DATA_INCLUSAO, self::DATA_ALTERACAO];


}