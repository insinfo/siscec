<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 19/10/2017
 * Time: 15:45
 */

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organograma extends Model
{
    const TABLE_NAME = "organograma";
    const KEY_ID = "id";
    const ID_PAI = "idPai";
    const COR = "cor";
    const ATIVO = "ativo";

    public $id;
    public $idPai;
    public $cor;
    public $ativo;
    public $setoresFilhos;

    /**
     * @return mixed
     */
    public function getSetoresFilhos()
    {
        return $this->setoresFilhos;
    }

    /**
     * @param mixed $setoresFilhos
     */
    public function setSetoresFilhos($setoresFilhos)
    {
        $this->setoresFilhos = $setoresFilhos;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getIdPai()
    {
        return $this->idPai;
    }

    /**
     * @param mixed $idPai
     */
    public function setIdPai($idPai)
    {
        $this->idPai = $idPai;
    }

    /**
     * @return mixed
     */
    public function getCor()
    {
        return $this->cor;
    }

    /**
     * @param mixed $cor
     */
    public function setCor($cor)
    {
        $this->cor = $cor;
    }

    /**
     * @return mixed
     */
    public function getAtivo()
    {
        return $this->ativo;
    }

    /**
     * @param mixed $ativo
     */
    public function setAtivo($ativo)
    {
        $this->ativo = $ativo;
    }


    public static function getClassName()
    {
        return get_called_class();
    }

}