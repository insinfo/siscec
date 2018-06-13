<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Parcela extends Model
{
    //database info
    const TABLE_NAME = 'Parcelas';
    const KEY_ID = 'id';
    const ID_MEDICAO = 'idMedicao';
    const ID_EMPENHO = 'idEmpenho';
    const VALOR = 'valor';

    const TABLE_FIELDS = [
        self::ID_MEDICAO,
        self::ID_EMPENHO,
        self::VALOR
    ];

    protected $table = self::TABLE_NAME;
    public $timestamps = false;
    protected $fillable = self::TABLE_FIELDS;
    protected $primaryKey = self::KEY_ID;


    //relação "pertence a" = "belongsTo"
    //relação "tem um" = "hasOne"
    //relação com empenho
    public function empenho()
    {
        return $this->hasOne('App\Empenho', Empenho::KEY_ID, Parcela::ID_EMPENHO);
    }

}
