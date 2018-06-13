<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 31/01/2018
 * Time: 15:17
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class Perfis extends Model
{
    const TABLE_NAME = "Perfis";
    const KEY_ID = "id";
    const NIVEL = "nivel";
    const NOME = "nome";
    const DESCRICAO = "descricao";

    protected $fillable = [self::NIVEL, self::NOME, self::DESCRICAO];

    protected $table = self::TABLE_NAME;
    public $timestamps = false;
    protected $primaryKey = self::KEY_ID;
}