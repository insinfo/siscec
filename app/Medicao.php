<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medicao extends Model
{
    //database info
    const TABLE_NAME = 'Medicoes';
    const KEY_ID = 'id';
    const ID_CONTRATO = 'idContrato';
    const DATA_INICIO = 'dataInicio';
    const DATA_FIM = 'dataFim';
    const PAGO = 'pago';

    protected $table = self::TABLE_NAME;
    public $timestamps = false;
    protected $fillable = [self::ID_CONTRATO, self::DATA_INICIO, self::DATA_FIM, self::PAGO];
    protected $primaryKey = self::KEY_ID;

    //relação com parcelas
    public function parcelas()
    {
        return $this->hasMany('App\Parcela', Parcela::ID_MEDICAO, Medicao::KEY_ID);
    }

    //relação com contrato
    public function contrato()
    {
        //cria o relacionamento com a tabela pai  um para um
        //parametro 1: Modelo pai
        //parametro 2: chave estrangeira deste modelo ou seja "idControle" da tabela "contratos"
        //parametro 3: chave primaria do pai
        return $this->belongsTo('App\Contrato', Medicao::ID_CONTRATO, Contrato::KEY_ID);
    }

    /*public function delete()
    {
        DB::transaction(function ()
        {
            $this->parcelas()->delete();
            parent::delete();
        });
    }*/
}
