<?php
/**
 * Created by PhpStorm.
 * User: Isaque
 * Date: 10/10/2017
 * Time: 11:33
 */

namespace App\Utils;

use \DateTime;
use \NumberFormatter;

class Utils
{
    public static function getserial()
    {
        $fn = '/var/www/html/siscec/sequences/serial.dat';
        $fp = fopen($fn, "r+");
        if (flock($fp, LOCK_EX))
        {
            $serial = fgets($fp);
            $serial++;
        }
        else
        {
            print('lock error, ABORT');
            exit;
        }
        $h = fopen($fn . '.tmp', 'w');
        fwrite($h, $serial);
        fclose($h);
        if (filesize($fn . '.tmp') > 0)
        {
            system('rm -f ' . $fn . '.tmp');
            fseek($fp, 0);
            fwrite($fp, $serial);
        }
        flock($fp, LOCK_UN);
        fclose($fp);
        @chmod($fn, 0777);
        return $serial;
    }

    /** Obtem a data e hora atual no horario de brasilia **/
    public static function GetDateTimeNow()
    {
        // DEFINE O FUSO HORARIO COMO O HORARIO DE SÃO PAULO
        date_default_timezone_set('America/Sao_Paulo');

        // CRIA UMA VARIAVEL E ARMAZENA A HORA ATUAL DO FUSO-HORÀRIO DEFINIDO (BRASÍLIA)
        return date('d/m/Y H:i:s', time());
    }

    /** Obtem a data atual **/
    public static function GetDateNow()
    {
        // DEFINE O FUSO HORARIO COMO O HORARIO DE SÃO PAULO
        date_default_timezone_set('America/Sao_Paulo');
        return date('d/m/Y');
    }

    //converte data no formato SQL para o formato de data Brasileiro
    public static function SQLDateToBrasilDate($source)
    {
        if (self::isDate($source))
        {
            date_default_timezone_set('America/Sao_Paulo');
            //$date = DateTime::createFromFormat('Y-m-d', $source);
            $date = new DateTime($source);
            return $date->format('d/m/Y');
        }
        return $source;

        /*$pattern = '/\d+/';
        preg_match_all($pattern, $source, $matches, PREG_SET_ORDER);
        return $matches[2][0] . '/' . $matches[1][0] . '/' . $matches[0][0];*/
        // return date('d/m/Y',strtotime($source));
    }

    public static function isDate($value)
    {
        if (!$value)
        {
            return false;
        }

        try
        {

            if (DateTime::createFromFormat('Y-m-d', $value) !== false)
            {
                return true;
            }

            new \DateTime($value);
            return true;
        }
        catch (\Exception $e)
        {
            return false;
        }
    }

    /** retira acento da string e deixa o caractere sem acento **/
    public static function removeAccents($string)
    {
        return preg_replace(array("/(á|à|ã|â|ä)/", "/(Á|À|Ã|Â|Ä)/", "/(é|è|ê|ë)/", "/(É|È|Ê|Ë)/", "/(í|ì|î|ï)/", "/(Í|Ì|Î|Ï)/", "/(ó|ò|õ|ô|ö)/", "/(Ó|Ò|Õ|Ô|Ö)/", "/(ú|ù|û|ü)/", "/(Ú|Ù|Û|Ü)/", "/(ñ)/", "/(Ñ)/"), explode(" ", "a A e E i I o O u U n N"), $string);
    }

    // Function for basic field validation (present and neither empty nor only white space
    public static function isNullOrEmptyString($string)
    {
        return (!isset($string) || trim($string) === "" || trim($string) === 'null' || $string == null);
    }

    //converte moéda brasileira para float
    public static function brasilRealToFloat($brlCurrency)
    {

        $region = 'pt_BR';
        setlocale(LC_MONETARY, $region);
        $currency = 'BRL';
        $formatter = new NumberFormatter($region, NumberFormatter::CURRENCY);
        $result = $formatter->parse(str_replace(' ', '', $brlCurrency));
        //$valorContrato = money_format('%.2n', $contrato[Contrato::VALOR]);
        return $result;
    }

    //verifica quantos dias tem entre uma data e outra
    public static function daysBetweenDates($dataInit, $dataEnd)
    {
        date_default_timezone_set('America/Sao_Paulo');
        $region = 'pt_BR';
        setlocale(LC_MONETARY, $region);
        $medicaoDataIni = new DateTime($dataInit);
        $medicaoDataFim = new DateTime($dataEnd);
        $dias = $medicaoDataIni->diff($medicaoDataFim)->days;

        return $dias;
    }

    //Coloca maiuscula a primeira letra ignorando pronome
    public static function smartCapitalize($text)
    {
        $loweredText = strtolower($text);
        //separa uma string por espaços/tabs/newlines
        $listWords = preg_split('/\s+/', $loweredText);
        $listWordsLength = count($listWords);
        for ($a = 0; $a < $listWordsLength; $a++)
        {
            $w = $listWords[$a];

            $firstLetter = $w[0];
            //obtem o tamanho de uma string
            $stringLength = strlen($w);
            if ($stringLength > 2)
            {
                $w = strtoupper($firstLetter) + substr($w, 1);
            }
            else
            {
                $w = $firstLetter + substr($w, 1);
            }
            $listWords[$a] = $w;
        }
        return implode(" ", $listWords);
    }

    public static function objToArray($obj, &$arr)
    {

        if (!is_object($obj) && !is_array($obj))
        {
            $arr = $obj;
            return $arr;
        }

        foreach ($obj as $key => $value)
        {
            if (!empty($value))
            {
                $arr[$key] = array();
                Utils::objToArray($value, $arr[$key]);
            }
            else
            {
                $arr[$key] = $value;
            }
        }
        return $arr;
    }

    /** filtra um array atravez de outro array **/
    public static function filterArrayByArray($arrayToBeFiltered,$arrayFilter)
    {
        $result = array();
        foreach ($arrayFilter as $item)
        {
            if (array_key_exists($item,$arrayToBeFiltered))
            {
                $result[$item] = $arrayToBeFiltered[$item];
            }
        }
        return $result;
    }
}
