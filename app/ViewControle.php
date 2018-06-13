<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 21/02/2018
 * Time: 12:57
 */

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Contrato;
use App\Controle;

class ViewControle extends Model
{
    //database info
    const TABLE_NAME = 'ViewControles';
    const KEY_ID = 'id';
    const OBJETO = 'objeto';
    const CONCLUIDO = 'concluido';
    const MODALIDADE = 'modalidade';
    const PREVISAO_GASTO = 'previsaoGasto';
    const ID_PESSOA = 'idPessoa';
    const NUMERO_CONTROLE = 'numeroControle';
    const DATA_CADASTRO = 'dataCadastro';
    const VIEW_CONTROLES = 'ViewControles';
    const ID_ORGANOGRAMA = 'idOrganograma';

    protected $table = self::TABLE_NAME;
    public $timestamps = false;
    protected $fillable = [self::ID_ORGANOGRAMA, self::OBJETO, self::CONCLUIDO, self::MODALIDADE, self::PREVISAO_GASTO, self::ID_PESSOA, self::NUMERO_CONTROLE,self::DATA_CADASTRO];
    protected $primaryKey = self::KEY_ID;
    //protected $guarded = [];

    //relação com contratos
    public function contratos()
    {
        //cria o relacionamento com a tabela filha "contratos" um para varios
        //parametro 1: Modelo filho
        //parametro 2: chave estrangeira do modelo filho "Contrato" ou seja "idControle" da tabela "contratos"
        //parametro 3: chave primaria deste modelo ou seja "id"
        return $this->hasMany('App\Contrato', Contrato::ID_CONTROLE, Controle::KEY_ID);
    }
    //relação com ficais
    public function fiscais()
    {
        return $this->hasMany('App\Fiscal', Fiscal::ID_CONTROLE, Controle::KEY_ID);
    }
    //relação com um setor
    public function setor()
    {
        return $this->hasOne('App\OrganogramaHistorico', OrganogramaHistorico::KEY_ID, Controle::ID_ORGANOGRAMA);
    }
    //relação com uma empresa
    public function empresa()
    {
        return $this->hasOne('App\Pessoa', Pessoa::KEY_ID, Controle::ID_PESSOA);
    }

}