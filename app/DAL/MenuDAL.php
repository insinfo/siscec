<?php
/**
 * Created by PhpStorm.
 * User: isaque
 * Date: 31/01/2018
 * Time: 11:23
 */

namespace App\DAL;

use Illuminate\Support\Facades\DB;
use \Exception;

use App\Utils\Utils;
use App\Exceptions\Messages;
use App\Menu;
use App\Perfis;
use App\Permissoes;
use App\Utils\StatusMessage;
use App\Utils\StatusCode;

class MenuDAL
{
    public function getHierarchyChildren($pId, $idSistema =null,$idPerfil=2)
    {
        $idPai = '';
        if ($pId == null)
        {
            $idPai = ' is NULL';
        }
        else
        {
            $idPai = " ='" . $pId . "'";
        }

        $idSistem = $idSistema == null ? '' : ' AND "' . Menu::ID_SISTEMA . '"=' . $idSistema . '';

        $query = Menu::query();
        $query->whereRaw('"' . Menu::ID_PAI . '" ' . $idPai . $idSistem)
            ->where(Menu::ATIVO, '=', true)
            ->whereRaw("id IN (SELECT \"" . Permissoes::ID_MENU .
                "\" FROM \"" . Permissoes::TABLE_NAME . "\" WHERE \"" .
                Permissoes::ID_PERFIL . "\"='$idPerfil')")
            ->orderBy(Menu::ORDEM, 'asc');

        $data = $query->get();
        //$result['sql'] = $query->toSql();

        $result = array();

        if ($data != null)
        {
            foreach ($data as $item)
            {
                $idP = $item[Menu::KEY_ID];
                $menuItem = array();
                $menuItem[Menu::KEY_ID] = $item[Menu::KEY_ID];
                $menuItem[Menu::ID_PAI] = $item[Menu::ID_PAI];
                $menuItem[Menu::ROTA] = $item[Menu::ROTA];
                $menuItem[Menu::LABEL] = $item[Menu::LABEL];
                $menuItem[Menu::ICONE] = $item[Menu::ICONE];
                $menuItem[Menu::COR] = $item[Menu::COR];
                $menuItem[Menu::ORDEM] = $item[Menu::ORDEM];
                $menuItem[Menu::ATIVO] = $item[Menu::ATIVO];
                $menuItem[Menu::ID_SISTEMA] = $item[Menu::ID_SISTEMA];

                $filhos = $this->getHierarchyChildren($idP,$idSistema,$idPerfil);

                if ($filhos != null)
                {
                    $menuItem['nodes'] = $filhos;
                }
                array_push($result, $menuItem);
            }
        }
        return $result;
    }
}