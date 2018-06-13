<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FonteRecurso extends Model
{
    const TABLE_NAME = 'FonteRecursos';
    const KEY_ID = 'id';
    const CODIGO = 'codigo';
    const DESCRICAO = 'descricao';

    protected $table = self::TABLE_NAME;
    public $timestamps = false;
    protected $fillable = [self::KEY_ID,self::CODIGO, self::DESCRICAO];
    //protected $guarded = [];
    //protected $connection = 'connection-name';
    protected $primaryKey = self::KEY_ID;

}
