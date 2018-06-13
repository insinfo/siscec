<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 31/01/2018
 * Time: 11:07
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    const TABLE_NAME = "Menus";
    const KEY_ID = "id";
    const ID_PAI = "idPai";
    const ID_SISTEMA = "idSistema";
    const ICONE = "icone";
    const LABEL = "label";
    const ROTA = "rota";
    const COR = "cor";
    const ORDEM = "ordem";
    const ATIVO = "ativo";

    protected $fillable = [self::ID_PAI, self::ID_SISTEMA, self::ICONE, self::LABEL, self::ROTA, self::COR, self::ORDEM, self::ATIVO];

    protected $table = self::TABLE_NAME;
    public $timestamps = false;
    protected $primaryKey = self::KEY_ID;

}