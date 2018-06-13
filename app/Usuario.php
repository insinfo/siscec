<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 05/12/2017
 * Time: 11:18
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    const TABLE_NAME = 'Usuarios';
    const KEY_ID = 'id';
    const LOGIN = 'login';
    const PERFIL = 'perfil';
    const ATIVO = 'ativo';
    const ID_PESSOA = 'idPessoa';
    const DATA_CADASTRO = 'dataCadastro';
    const ID_ORGANOGRAMA = 'idOrganograma';

    protected $table = self::TABLE_NAME;
    public $timestamps = false;
    protected $fillable = [self::ID_ORGANOGRAMA, self::LOGIN, self::PERFIL,self::ATIVO, self::ID_PESSOA];
    //protected $guarded = [];
    //protected $connection = 'connection-name';
    protected $primaryKey = self::KEY_ID;

    //relação com um setor
    public function setor()
    {
        $relation = $this->hasOne(OrganogramaHistorico::class, OrganogramaHistorico::KEY_ID, Usuario::ID_ORGANOGRAMA);

        $relation->getQuery()->selectRaw(' "'.OrganogramaHistorico::TABLE_NAME.'".* ')
            ->from(Usuario::TABLE_NAME)
            ->leftJoin(OrganogramaHistorico::TABLE_NAME, function ($q)
            {
                $q->on(OrganogramaHistorico::TABLE_NAME.'.'.OrganogramaHistorico::KEY_ID,'=',Usuario::TABLE_NAME.'.'. Usuario::ID_ORGANOGRAMA)
                    ->whereRaw('"'.OrganogramaHistorico::TABLE_NAME.'"."'.OrganogramaHistorico::DATA_INICIO.'"='
                        .'(SELECT max("'.OrganogramaHistorico::TABLE_NAME.'"."'.OrganogramaHistorico::DATA_INICIO.'")
                            FROM "'.OrganogramaHistorico::TABLE_NAME.'" 
                            WHERE "'.Usuario::TABLE_NAME . '"."'.Usuario::ID_ORGANOGRAMA.'" = "'
                        .OrganogramaHistorico::TABLE_NAME.'"."'.OrganogramaHistorico::KEY_ID.'" 
                            AND "' . OrganogramaHistorico::TABLE_NAME . '"."' . OrganogramaHistorico::DATA_INICIO . '" <= "' .
                        Usuario::TABLE_NAME . '"."' . Usuario::DATA_CADASTRO . '")')
                ;
            });

        return $relation;
    }
    //relação com uma pessoa
    public function pessoaFisica()
    {
        return $this->hasOne(PessoaFisica::class, PessoaFisica::KEY_ID, Usuario::ID_PESSOA);
    }

    public function pessoa()
    {
        return $this->hasOne(Pessoa::class, Pessoa::KEY_ID, Usuario::ID_PESSOA);
    }

}
