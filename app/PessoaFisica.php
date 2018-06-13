<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 19/10/2017
 * Time: 17:23
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class PessoaFisica extends Model
{
    const TABLE_NAME = "pessoas_fisicas";
    const KEY_ID = "idPessoa";
    const CPF = "cpf";
    const RG = "rg";
    const DATA_EMISSAO = "dataEmissao";
    const ORGAO_EMISSOR = "orgaoEmissor";
    const ID_UF_ORGAO_EMISSOR = "idUfOrgaoEmissor";
    const ID_PAIS_NACIONALIDADE = "idPaisNacionalidade";
    const DATA_NASCIMENTO = "dataNascimento";
    const SEXO = "sexo";

    //protected $connection = 'pmroPadrao';
    protected $table = self::TABLE_NAME;
    protected $primaryKey = self::KEY_ID;
    public $timestamps = false;

    protected $fillable = [self::KEY_ID, self::CPF, self::RG, self::DATA_EMISSAO, self::ORGAO_EMISSOR, self::ID_UF_ORGAO_EMISSOR, self::ID_PAIS_NACIONALIDADE, self::DATA_NASCIMENTO, self::SEXO];


}