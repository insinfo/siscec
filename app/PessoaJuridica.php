<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 19/10/2017
 * Time: 17:23
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class PessoaJuridica extends Model
{
    const TABLE_NAME = "pessoas_juridicas";
    const ID_PESSOA = "idPessoa";
    const CNPJ = "cnpj";
    const NOME_FANTASIA = "nomeFantasia";
    const INSCRICAO_ESTADUAL = "inscricaoEstadual";

    //protected $connection = 'pmroPadrao';
    protected $table = self::TABLE_NAME;
    protected $primaryKey = self::ID_PESSOA;
    public $timestamps = false;

    protected $fillable = [self::ID_PESSOA, self::CNPJ, self::NOME_FANTASIA, self::INSCRICAO_ESTADUAL];


}