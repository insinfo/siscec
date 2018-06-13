<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fiscal extends Model
{
    const TABLE_NAME = 'Fiscais';
    const KEY_ID = 'id';
    const ID_CONTROLE = 'idControle';
    const MATRICULA = 'matricula';
    const NUMERO_PORTARIA = 'numeroPortaria';
    const ANO_PORTARIA = 'anoPortaria';
    const DATA_PORTARIA = 'dataPortaria';
    const ID_PESSOA = 'idPessoa';

    protected $table = self::TABLE_NAME;
    public $timestamps = false;
    protected $fillable = [self::KEY_ID,self::ID_CONTROLE, self::MATRICULA, self::NUMERO_PORTARIA, self::ANO_PORTARIA, self::DATA_PORTARIA, self::ID_PESSOA];
    //protected $guarded = [];
    //protected $connection = 'connection-name';
    protected $primaryKey = self::KEY_ID;

    public function controle()
    {
        return $this->belongsTo('App\Controle', self::ID_CONTROLE, Controle::KEY_ID);
    }

    //relação com uma pessoa
    public function pessoa()
    {
        return $this->hasOne('App\Pessoa', Pessoa::KEY_ID, Fiscal::ID_PESSOA);
    }

}
