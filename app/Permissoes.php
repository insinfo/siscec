<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 31/01/2018
 * Time: 15:19
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permissoes extends Model
{
    const TABLE_NAME = "Permissoes";
    const KEY_ID = "id";
    const ID_PERFIL = "idPerfil";
    const ID_MENU = "idMenu";

    protected $fillable = [self::ID_PERFIL, self::ID_MENU];

    protected $table = self::TABLE_NAME;
    public $timestamps = false;
    protected $primaryKey = self::KEY_ID;

}