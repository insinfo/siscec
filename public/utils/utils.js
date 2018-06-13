/**
 * Created by Isaque Neves Sant Ana.
 * Version: 1.0.0
 * Date: 17/01/2018
 * Time: 11:46
 */

/******* FUNÇÕES UTILITARIOS ********/
var LISTA_PRONOMES = ['a', 'o', 'da', 'do', 'das', 'dos', 'á', 'ã', 'â', 'ó', 'õ', 'ô'];
var LISTA_PRONOMES_PESSOAS = ['eu', 'tu', 'ele', 'ela', 'eles', 'elas', 'nós', 'vós'];
var LISTA_PRONOMES_POSSESSIVOS = ['meu', 'meus', 'minha', 'minhas', 'teu', 'teus', 'tua', 'tuas', 'seu', 'seus', 'sua', 'suas', 'nosso', 'nossos', 'nossa', 'nossas', 'vosso', 'vossos', 'vossa', 'vossas', 'seu', 'seus', 'sua', 'sua', 'suas'];


//evento Impede digitação de letras no input com evento
function preventsLetter(dom)
{
    $(dom).off('keydown');
    $(dom).on('keydown', function (e) {
        //e = e || window.event;
        var keyCode = e.which;//(evt.keyCode ? evt.keyCode :evt.which);
        if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || keyCode == 8 || keyCode == 46 || keyCode == 38)
        {

        }
        else
        {
            e.preventDefault();
        }
    });
}

//função Impede digitação de letras no input sem evento
function preventsLetter2(evt)
{
    //evt = evt || window.event;
    var keyCode = evt.which;//(evt.keyCode ? evt.keyCode :evt.which);
    if (!(keyCode > 95 && keyCode < 106 || keyCode == 8 || keyCode == 46 || keyCode == 38))
    {
        evt.preventDefault();
    }
}

//Impede digitação de numeros no input
function preventsNumber(dom)
{
    $(dom).off('keydown');
    $(dom).on('keydown', function (evt) {
        var keyCode = (evt.keyCode ? evt.keyCode : evt.which);
        if ((keyCode > 95))
        {
            evt.preventDefault();
        }
    });
}

//Detecta se digitou numero no input
function detectaNumero(dom, callBack)
{
    $(dom).off('input');
    $(dom).on('input', function (e) {
        if (/[0-9]/g.test(this.value))
        {
            callBack();
        }
    });
}

//prenche os selects
function populateSelect(jquerySelect, data, key, value, selected)
{
    jquerySelect.empty();
    for (var j = 0; j < data.length; j++)
    {
        var id = data[j][key];
        var name = data[j][value];
        var option = '<option value="' + id + '">' + smartCapitalize(name) + '</option>';
        if (name.toLowerCase() === selected.toLowerCase())
        {
            option = '<option value="' + id + '" selected>' + smartCapitalize(name) + '</option>';
        }
        jquerySelect.append(option);
    }
}

//Coloca maiuscula a primeira letra com pronome
function capitalize(str)
{
    str.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function (letter) {
        return letter.toUpperCase();
    });
    return (str);
}

//Coloca maiuscula a primeira letra ignora pronome
function smartCapitalize(text)
{
    var loweredText = text.toLowerCase();
    var words = loweredText.split(" ");
    for (var a = 0; a < words.length; a++)
    {
        var w = words[a];

        var firstLetter = w[0];

        if (w && firstLetter)
        {
            if (a === 0)
            {
                w = firstLetter.toUpperCase() + w.slice(1);
            }
            else if (w.length > 3)
            {
                w = firstLetter.toUpperCase() + w.slice(1);
            }
            else
            {
                w = firstLetter + w.slice(1);
            }
        }

        words[a] = w;
    }
    return words.join(" ");
}


function findStringInNumArray(inputValue, inputArray)
{
    var inputArrayLength = inputArray.length;
    for (var i = 0; i < inputArrayLength; i++)
    {
        var item = inputArray[i].toLowerCase().trim();
        inputValue = inputValue.toLowerCase().trim();
        if (item === inputValue)
        {
            return true;
        }
    }
    return false;
}

function converterEstados(val)
{
    var data;

    switch (val)
    {
        /* UFs */
        case "AC" :
            data = "Acre";
            break;
        case "AL" :
            data = "Alagoas";
            break;
        case "AM" :
            data = "Amazonas";
            break;
        case "AP" :
            data = "Amapá";
            break;
        case "BA" :
            data = "Bahia";
            break;
        case "CE" :
            data = "Ceará";
            break;
        case "DF" :
            data = "Distrito Federal";
            break;
        case "ES" :
            data = "Espírito Santo";
            break;
        case "GO" :
            data = "Goiás";
            break;
        case "MA" :
            data = "Maranhão";
            break;
        case "MG" :
            data = "Minas Gerais";
            break;
        case "MS" :
            data = "Mato Grosso do Sul";
            break;
        case "MT" :
            data = "Mato Grosso";
            break;
        case "PA" :
            data = "Pará";
            break;
        case "PB" :
            data = "Paraíba";
            break;
        case "PE" :
            data = "Pernambuco";
            break;
        case "PI" :
            data = "Piauí";
            break;
        case "PR" :
            data = "Paraná";
            break;
        case "RJ" :
            data = "Rio de Janeiro";
            break;
        case "RN" :
            data = "Rio Grande do Norte";
            break;
        case "RO" :
            data = "Rondônia";
            break;
        case "RR" :
            data = "Roraima";
            break;
        case "RS" :
            data = "Rio Grande do Sul";
            break;
        case "SC" :
            data = "Santa Catarina";
            break;
        case "SE" :
            data = "Sergipe";
            break;
        case "SP" :
            data = "São Paulo";
            break;
        case "TO" :
            data = "Tocantíns";
            break;

        /* Estados */
        case "Acre" :
            data = "AC";
            break;
        case "Alagoas" :
            data = "AL";
            break;
        case "Amazonas" :
            data = "AM";
            break;
        case "Amapá" :
            data = "AP";
            break;
        case "Bahia" :
            data = "BA";
            break;
        case "Ceará" :
            data = "CE";
            break;
        case "Distrito Federal" :
            data = "DF";
            break;
        case "Espírito Santo" :
            data = "ES";
            break;
        case "Goiás" :
            data = "GO";
            break;
        case "Maranhão" :
            data = "MA";
            break;
        case "Minas Gerais" :
            data = "MG";
            break;
        case "Mato Grosso do Sul" :
            data = "MS";
            break;
        case "Mato Grosso" :
            data = "MT";
            break;
        case "Pará" :
            data = "PA";
            break;
        case "Paraíba" :
            data = "PB";
            break;
        case "Pernambuco" :
            data = "PE";
            break;
        case "Piauí" :
            data = "PI";
            break;
        case "Paraná" :
            data = "PR";
            break;
        case "Rio de Janeiro" :
            data = "RJ";
            break;
        case "Rio Grande do Norte" :
            data = "RN";
            break;
        case "Rondônia" :
            data = "RO";
            break;
        case "Roraima" :
            data = "RR";
            break;
        case "Rio Grande do Sul" :
            data = "RS";
            break;
        case "Santa Catarina" :
            data = "SC";
            break;
        case "Sergipe" :
            data = "SE";
            break;
        case "São Paulo" :
            data = "SP";
            break;
        case "Tocantíns" :
            data = "TO";
            break;
    }

    return data;
}

//dispara evento
function eventFire(el, etype)
{
    if (el.fireEvent)
    {
        el.fireEvent('on' + etype);
    }
    else
    {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

//limpa a seleção de um Select
function clearSelected(select)
{
    if (select instanceof jQuery)
    {
        var optionsOffSelect = select[0].options;
        for (var j = 0; j < optionsOffSelect.length; j++)
        {
            optionsOffSelect[j].selected = false;
        }
    }
    else if (select instanceof HTMLCollection)
    {
        var elements = select.options;
        for (var i = 0; i < elements.length; i++)
        {
            elements[i].selected = false;
        }
    }
}

//verifica se um objeto é uma instancia de um elemento DOM
function isDomElem(obj)
{
    if (obj instanceof HTMLCollection && obj.length)
    {
        for (var a = 0, len = obj.length; a < len; a++)
        {
            if (!checkInstance(obj[a]))
            {
                return false;
            }
        }
        return true;

    }
    else
    {
        return checkInstance(obj);
    }

    function checkInstance(elem)
    {
        if ((elem instanceof jQuery && elem.length) || elem instanceof HTMLElement)
        {
            return true;
        }
        return false;
    }
}

/************* VALIDAÇÃO DE FORMULARIO *************/
//Validação
function validaCPF(numCpf)
{
    //remove a mascara
    var cpf = numCpf.replace(/[^\d]+/g, '');
    //Verifica se um número foi informado
    if (!cpf)
    {
        return false;
    }

    //Eliminapossivel mascara
    cpf.replace('[^0-9]', '');
    cpf.lpad('0', 11);
    //Verifica se o numero de digitos informados é iguala 11
    if (cpf.length != 11)
    {
        return false;
    }
    //Verifica se nenhuma das sequências invalidas abaixo
    //foi digitada+Caso afirmativo,retorna falso
    if (cpf == '00000000000' || cpf == '11111111111' || cpf == '22222222222' || cpf == '33333333333' || cpf == '44444444444' || cpf == '55555555555' || cpf == '66666666666' || cpf == '77777777777' || cpf == '88888888888' || cpf == '99999999999')
    {
        return false;
    }
    // Calcula os digitos verificadores para verificar se o
    // CPF é válido
    else
    {
        for (var t = 9; t < 11; t++)
        {
            for (var d = 0, c = 0; c < t; c++)
            {
                d += cpf[c] * ((t + 1) - c);
            }
            d = ((10 * d) % 11) % 10;
            if (cpf[c] != d)
            {
                return false;
            }
        }
        return true;
    }
}

function validaEmail(email)
{
    var nomeEmail = email.value.substring(0, email.value.indexOf("@"));
    var dominioEmail = email.value.substring(email.value.indexOf("@") + 1, email.value.length);

    if ((nomeEmail.length >= 1) && (dominioEmail.length >= 3) && (nomeEmail.search("@") === -1) && (dominioEmail.search("@") === -1) && (nomeEmail.search(" ") === -1) && (dominioEmail.search(" ") === -1) && (dominioEmail.search(".") !== -1) && (dominioEmail.indexOf(".") >= 1) && (dominioEmail.lastIndexOf(".") < dominioEmail.length - 1))
    {
        return true;
    }
    return false;
}

function isEmail(email)
{
    var er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;

    if (er.exec(email))
    {
        return true;
    }
    return false;
}

function validaData(data)
{
    if (data.length == 10)
    {
        var er = /(0[0-9]|[12][0-9]|3[01])[-\.\/](0[0-9]|1[012])[-\.\/][0-9]{4}/;

        if (er.exec(data))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

function validaHora(hora)
{
    var er = /(0[0-9]|1[0-9]|2[0123]):[0-5][0-9]/;

    if (er.exec(hora))
    {
        return true;
    }
    return false;
}

//faz um LEFT PAD de uma string
String.prototype.lpad = function (padString, length) {
    var str = this;
    while (str.length < length) str = padString + str;
    return str;
};

//converte data no formato SQL para o formato de data Brasileiro
function sqlDateToBrasilDate(input)
{
    if(isDate(input))
    {
        var datePart = input.match(/\d+/g);
        var year = datePart[0];
        var month = datePart[1];
        var day = datePart[2];
        var result = day + '/' + month + '/' + year;
        return result;
    }
    return input;
}

function isDate (date) {
    if(!date){
        return false;
    }
    return (new Date(null) !== "Invalid Date" && !isNaN(new Date(null)) );
}

/** Remove itens duplicados de um array de objetos, passa 2
 * propriedades dos objetos para serem coparadas
 **/
function removeDuplicateItem(arr, prop1, prop2)
{
    return arr.reduce(function (p, c) {
        var key = [c[prop1], c[prop2]].join('|');

        if (p.temp.indexOf(key) === -1)
        {
            p.out.push(c);
            p.temp.push(key);
        }
        return p;
    }, {temp: [], out: []}).out;
}

/** obtem a primeira propriedade de um objeto**/
function firstProp(obj)
{
    return Object.keys(obj)[0]
    //for (var key in obj) return obj[key]
}

//formata data do javascript ano-mes-dia para dia/mes/ano
function formatJsDateToBrasilDate(date)
{
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + '/' + monthIndex + '/' + year;
}

//formata data do javascript  dia/mes/ano para ano-mes-dia
function formatBrasilDateToJsDate(stringDate)
{
    stringDate = stringDate.split('/');
    var day = stringDate[0];
    var monthIndex = stringDate[1];
    var year = stringDate[2];
    return year + '-' + monthIndex + '-' + day;
}

//função que adiciona ou remove todas os ids em um array quando check um checkbox de um datatable
//parametros: jquery instance de table, dataTable instance, array para armazenar os ids
function dataTableSelectAll(jqueryTableObject, dataTable, array)
{
    jqueryTableObject.off('click', 'thead tr input[type="checkbox"]');
    jqueryTableObject.on('click', 'thead tr input[type="checkbox"]', function () {
        if (this.checked)
        {
            jqueryTableObject.find('tbody tr input[type="checkbox"]').each(function (index) {
                var checkbox = $(this);
                checkbox.prop('checked', true);
                var tr = checkbox.closest('tr');
                var rowId = dataTable.row(tr).data()['id'];
                array.push(rowId);
                //console.log(array);
            });
        }
        if (!this.checked)
        {
            jqueryTableObject.find('tbody tr input[type="checkbox"]').each(function (i) {
                var checkbox = $(this);
                checkbox.prop('checked', false);
                emptyArray(array);
            });

        }
    });
}

//função que adiciona ou remove um id em um array quando check um checkbox de uma row de um dataTable
//parametros: jquery instance de table, dataTable instance, array para armazenar os ids
function dataTableSelect(jqueryTableObject, dataTable, array)
{
    jqueryTableObject.off('click', 'tbody tr input[type="checkbox"]');
    jqueryTableObject.on('click', 'tbody tr input[type="checkbox"]', function (e) {
        var checkbox = $(this);
        var tr = checkbox.closest('tr');
        var rowId = dataTable.row(tr).data()['id'];

        // Determine se o ID da linha está na lista de IDs de linhas selecionadas
        var index = $.inArray(rowId, array);
        // Se a caixa de seleção estiver marcada e a
        // identificação da linha não estiver na lista de IDs de linha selecionadas
        if (this.checked && index === -1)
        {
            array.push(rowId);
            //console.log(array);
        }
        // Caso contrário, se a caixa de verificação não estiver marcada e
        // a identificação da linha estiver na lista das IDs de linha selecionadas
        else if (!this.checked && index !== -1)
        {
            array.splice(index, 1);
        }
        e.stopPropagation();
    });
}

//função para esvaziar um array
function emptyArray(array)
{
    //array.length = 0;
    if (array !== null)
    {
        if (array instanceof Array)
        {
            if (array.length > 0)
            {
                array.splice(0, array.length);
            }
        }
    }
}

//função limita a quatidade de caracteres de um input
function limitaInput(inputElem, maxLength)
{
    var input = $(inputElem);
    var nativeInputElem = input[0];
    if (nativeInputElem.value.length > maxLength)
    {
        nativeInputElem.value = nativeInputElem.value.slice(0, maxLength);
    }
}

//evento limita a quatidade de caracteres
function limitaInputEvent(inputElem, maxLength)
{
    var input = $(inputElem);
    var nativeInputElem = input[0];
    input.off('input');
    input.on('input', function () {
        if (nativeInputElem.value.length > maxLength)
        {
            nativeInputElem.value = nativeInputElem.value.slice(0, maxLength);
        }
    });
}

//Polyfill
//Para adicionar suporte Object.keys compatíveis em ambientes mais antigos
//que não têm suporte nativo para isso, copie o seguinte trecho:
// De https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys)
{
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'), dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'], dontEnumsLength = dontEnums.length;

        return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null))
            {
                throw new TypeError('Object.keys chamado de non-object');
            }

            var result = [], prop, i;

            for (prop in obj)
            {
                if (hasOwnProperty.call(obj, prop))
                {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug)
            {
                for (i = 0; i < dontEnumsLength; i++)
                {
                    if (hasOwnProperty.call(obj, dontEnums[i]))
                    {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}

//extende um objeto compativel com internet explorer 8
function extend(obj, src)
{
    for (var key in src)
    {
        if (src.hasOwnProperty(key))
        {
            obj[key] = src[key];
        }
    }
    return obj;
}

//extende um objeto não compativel com internet explorer 8
function extend2(obj, src)
{
    Object.keys(src).forEach(function (key) {
        obj[key] = src[key];
    });
    return obj;
}

//function to remove any special characters from a string using Javascript
/*
1st regex /(?!\w|\s)./g remove any character that is not a word or whitespace. \w is equivalent to [A-Za-z0-9_]
2nd regex /\s+/g find any appearance of 1 or more whitespaces and replace it with one single white space
3rd regex /^(\s*)([\W\w]*)(\b\s*$)/g trim the string to remove any whitespace at the beginning or the end.

option 2
var str = "abc's test#s";
alert(str.replace(/[^a-zA-Z ]/g, ""));
*/
function removeSpecialChars(str)
{
    /*return str.replace(/(?!\w|\s)./g, '')
        .replace(/\s+/g, ' ')
        .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');*/
    return str.replace(/[^a-zA-Z]/g, "");
}

//IMPLEMENTAÇÃO DE UMA ESCUTA DE EVENTO PARA OUVIR MODIFICAÇÕES DO DOM
//COMPATIVEL COM IE 5.5+, FF 2+, Chrome, Safari 3+ and Opera 9.6+
/*
(function (window) {
    var last = +new Date();
    var delay = 100; // default delay

    // Manage event queue
    var stack = [];

    function callback() {
        var now = +new Date();
        if (now - last > delay) {
            for (var i = 0; i < stack.length; i++) {
                stack[i]();
            }
            last = now;
        }
    }

    // Public interface
    var onDomChange = function (fn, newdelay) {
        if (newdelay) delay = newdelay;
        stack.push(fn);
    };

    // Naive approach for compatibility
    function naive() {

        var last = document.getElementsByTagName('*');
        var lastlen = last.length;
        var timer = setTimeout(function check() {

            // get current state of the document
            var current = document.getElementsByTagName('*');
            var len = current.length;

            // if the length is different
            // it's fairly obvious
            if (len != lastlen) {
                // just make sure the loop finishes early
                last = [];
            }

            // go check every element in order
            for (var i = 0; i < len; i++) {
                if (current[i] !== last[i]) {
                    callback();
                    last = current;
                    lastlen = len;
                    break;
                }
            }

            // over, and over, and over again
            setTimeout(check, delay);

        }, delay);
    }

    //
    //  Check for mutation events support
    //

    var support = {};

    var el = document.documentElement;
    var remain = 3;

    // callback for the tests
    function decide() {
        if (support.DOMNodeInserted) {
            window.addEventListener("DOMContentLoaded", function () {
                if (support.DOMSubtreeModified) { // for FF 3+, Chrome
                    el.addEventListener('DOMSubtreeModified', callback, false);
                } else { // for FF 2, Safari, Opera 9.6+
                    el.addEventListener('DOMNodeInserted', callback, false);
                    el.addEventListener('DOMNodeRemoved', callback, false);
                }
            }, false);
        } else if (document.onpropertychange) { // for IE 5.5+
            document.onpropertychange = callback;
        } else { // fallback
            naive();
        }
    }

    // checks a particular event
    function test(event) {
        el.addEventListener(event, function fn() {
            support[event] = true;
            el.removeEventListener(event, fn, false);
            if (--remain === 0) decide();
        }, false);
    }

    // attach test events
    if (window.addEventListener) {
        test('DOMSubtreeModified');
        test('DOMNodeInserted');
        test('DOMNodeRemoved');
    } else {
        decide();
    }

    // do the dummy test
    var dummy = document.createElement("div");
    el.appendChild(dummy);
    el.removeChild(dummy);

    // expose
    window.onDomChange = onDomChange;
})(window);
 */
/*
//IMPLEMENTAÇÃO DE UMA ESCUTA DE EVENTO PARA OUVIR MODIFICAÇÕES DO DOM
//COMPATIVEL COM IE9+, FF, Webkit:
// Observe a specific DOM element:
onDOMChangeEvent( document.getElementById('dom_element') ,function(){
    console.log('dom changed');
});

var onDOMChangeEvent = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    };
})();

*/

//--------------Formatar td editavel do tipo MOEDA-------------//
function currencyFormatEditableElement(jqueryElement, milSep, decSep, e)
{
    jqueryElement = $(jqueryElement);
    var sep = 0;
    var key = '';
    var i = 0;
    var j = 0;
    var stringLength = 0;
    var len2 = 0;
    var strCheck = '0123456789';
    var aux = '';
    var aux2 = '';
    var whichCode = (window.Event) ? e.which : e.keyCode;

    //window.alert(whichCode);
    if ((whichCode == 8) || (whichCode == 13) || (whichCode == 0))
    {
        return true;  // Enter
    }
    key = String.fromCharCode(whichCode);  // Get key value from key code
    if (strCheck.indexOf(key) == -1)
    {
        return false;  // Not a valid key
    }

    stringLength = jqueryElement.text().length;
    var elementText = jqueryElement.text();
    for (i = 0; i < stringLength; i++)
    {
        if ((elementText.charAt(i) != '0') && (elementText.charAt(i) != decSep))
        {
            break;
        }
    }

    aux = '';
    for (; i < stringLength; i++)
    {
        if (strCheck.indexOf(elementText.charAt(i)) != -1)
        {
            aux += elementText.charAt(i);
        }
    }
    aux += key;

    stringLength = aux.length;
    if (stringLength == 0)
    {
        jqueryElement.text('')
    }
    else if (stringLength == 1)
    {
        jqueryElement.text('0' + decSep + '0' + aux);
    }
    else if (stringLength == 2)
    {
        jqueryElement.text('0' + decSep + aux);
    }
    else if (stringLength > 2)
    {
        aux2 = '';

        for (j = 0, i = stringLength - 3; i >= 0; i--)
        {
            if (j == 3)
            {
                aux2 += milSep;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        jqueryElement.text('');
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
        {
            var val = jqueryElement.text();
            val += aux2.charAt(i);
            jqueryElement.text(val);
        }
        val = jqueryElement.text();
        val += decSep + aux.substr(stringLength - 2, stringLength);
        jqueryElement.text(val);
    }
    return false;
}

//verifica se um array contem um determinado numero
function arrayContainsThisNumber(arrayOfIntegers, number)
{
    for (var i = 0; i <= arrayOfIntegers.length; i++)
    {
        if (number === arrayOfIntegers[i])
        {
            return i;
        }
    }
    return -1;
}

//checa se um objeto esta vazio {} = true
function isEmptyObject(obj)
{
    for (var prop in obj)
    {
        if (obj.hasOwnProperty(prop))
        {
            return false;
        }
    }
    //return JSON.stringify(obj) === JSON.stringify({});
    return true;
}

//polyfill para redirecionamento de URL
// Internet Explorer 8 or lower
function redirect(url)
{
    var ua = navigator.userAgent.toLowerCase(), isIE = ua.indexOf('msie') !== -1, version = parseInt(ua.substr(4, 2), 10);

    // Internet Explorer 8 and lower
    if (isIE && version < 9)
    {
        var link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
    }

    // All other browsers can use the standard window.location.href (they don't lose HTTP_REFERER like Internet Explorer 8 & lower does)
    else
    {
        window.location.href = url;
    }
}

// Função para retornar iniciais de um nome passado
function retornarIniciais(pNome)
{
    if (pNome)
    {
        var iniciais;
        var nomes = pNome.split(' ');
        if (nomes.length > 1)
        {
            iniciais = nomes[0].charAt(0).toUpperCase() + nomes[nomes.length - 1].charAt(0).toUpperCase();
        }
        else
        {
            iniciais = nomes[0].substr(0, 2).toUpperCase();
        }
        return iniciais;
    }
    return ' ';
}

// gera um hash de uma string // java String#hashCode
function hashCode(str)
{
    if (str)
    {
        var hash = 0;
        for (var i = 0; i < str.length; i++)
        {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }
    return ' ';
}

//convert um int para color hex
function intToRGB(i)
{
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return '#' + "00000".substring(0, 6 - c.length) + c;
}

function stringToColour(stringIn)
{
    return intToRGB(hashCode(stringIn));
}

//converte "R$ 50,00" tipo moeda brasileiro para float
function brCurrencyToFloat(brasilCorrency)
{
    var data = brasilCorrency != null ? brasilCorrency : '0';
    data = data.replace(',', ".");
    return parseFloat(data.replace(/[R$]+/g, ""));
}

function findValueInArray(key, value, array)
{
    for (var i = 0; i < array.length; i++)
    {
        if (array[i][key] === value)
        {
            return array[i];
        }
    }
    return null;
}

//ordenar matriz de objetos por valor de propriedade de string em JavaScript
//função de classificação dinâmica que classifica objetos pelo seu valor que você passa:
//funcionará quando você fizer isso:
//People.sort(dynamicSort("Surname"));
//People.sort(dynamicSort("-Surname"));
function dynamicSort(property)
{
    var sortOrder = 1;
    if (property[0] === "-")
    {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

// função abaixo para ordenação com múltiplos parâmetros de classificação.
//O que lhe permitiria fazer algo como isto:
//arrayObject.sort(dynamicSortMultiple("Name", "-Surname"));
function dynamicSortMultiple()
{
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while (result === 0 && i < numberOfProperties)
        {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

function padDate(num)
{
    return ("0" + num).slice(-2);
}

function secondsToHoursMinSec(secs)
{
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return padDate(hours) + ":" + padDate(minutes) + ":" + padDate(secs);
}

// VALIDAÇÃO DE FORMULÁRIOS
// Função que varre campos requeridos do formulário resetando-os ao estado inicial
function resetarValidacao(pFormulario) {
    var inputs = pFormulario.find('[required]');
    $.each(inputs, function () {
        // Limpa CSS da coluna
        var coluna = $(this).closest('div[class*=col-lg-]');
        coluna.children('div.form-control-feedback').remove();
        coluna.children('span.help-block').remove();
        // Remove classe do negrito do label
        var grupo = coluna.parent('div[class*=form-group]');
        grupo.children('label[class*=control-label]').removeClass('text-semibold');
        // Limpa classes do grupo mantendo apenas o 'form-group'
        grupo.removeClass();
        grupo.addClass('form-group');
    });
}
// Função que varre campos requeridos do formulário e retorna false se algum deles estiver vazio
function validarCamposRequeridos(pFormulario) {
    var retorno = true;

    var inputs = pFormulario.find('[required]');//[required]
    $.each(inputs, function () {
        var status = !$(this).val() ? false : true;
        var icone = status ? 'icon-checkmark-circle' : 'icon-cancel-circle2';
        var mensagem = status ? 'Sucesso' : 'Campo requerido';
        var classe = status ? 'has-success' : 'has-error';

        // Adiciona ícone do feedback
        var coluna = $(this).closest('div[class*=col-lg-]');
        if (!$(this).is('select')) {
            coluna.children('div.form-control-feedback').remove();
            coluna.append('<div class="form-control-feedback"><i class="'+ icone +'"></i></div>');
        }
        // Adiciona a mensagem de alerta
        coluna.children('span.help-block').remove();
        coluna.append('<span class="help-block">'+ mensagem +'</span>');
        // Deixa o label em negrito
        var grupo = coluna.parent('div[class*=form-group]');
        grupo.children('label[class*=control-label]').addClass('text-semibold');
        // Adiciona classes da notificação a alinhamento
        grupo.removeClass();
        grupo.addClass('form-group has-feedback '+ classe);

        if (!status) retorno = false;
    });

    return retorno;
}

/**
 * Get the user IP throught the webkitRTCPeerConnection
 * @param onNewIP {Function} listener function to expose the IP locally
 * @return undefined
 */
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;

    if(myPeerConnection === undefined){
        return '';
    }
    var pc = new myPeerConnection({
            iceServers: []
        }),
        noop = function() {},
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
        // An error occurred, so handle the failure to connect
    });

    //listen for candidate events
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}
/*
Detalhe dos parametros
n = numero a converter
c = numero de casas decimais
d = separador decimal
t = separador milhar
*/
function numberToCurrency (n, c, d, t,addCurrencySymbol)
{
    c = c ? c : 2;
    d = d ? d : ',';
    t = t ? t : '.';
    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    var result = s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    addCurrencySymbol = addCurrencySymbol ? addCurrencySymbol : '';
    return addCurrencySymbol + result ;
}

function numberToBrasilReal(number){
    return numberToCurrency(number, 2, ',', '.','R$ ')
}

function currencyToNumber(valor)
{
    return isNaN(valor) == false ? parseFloat(valor) :   parseFloat(valor.replace("R$","").replace(".","").replace(",","."));
}
//remove acentos
function removerAcentos(s) {
    var map = {"â": "a", "Â": "A", "à": "a", "À": "A", "á": "a", "Á": "A", "ã": "a", "Ã": "A", "ê": "e", "Ê": "E", "è": "e", "È": "E", "é": "e", "É": "E", "î": "i", "Î": "I", "ì": "i", "Ì": "I", "í": "i", "Í": "I", "õ": "o", "Õ": "O", "ô": "o", "Ô": "O", "ò": "o", "Ò": "O", "ó": "o", "Ó": "O", "ü": "u", "Ü": "U", "û": "u", "Û": "U", "ú": "u", "Ú": "U", "ù": "u", "Ù": "U", "ç": "c", "Ç": "C"};
    return s.replace(/[\W\[\] ]/g, function (a) {
        return map[a] || a
    });
}
//seta uma option de um select se a option contiver o texto passado (case insentive)
function setSelectIsContain(selectInput,text)
{
    var result = false;
    selectInput = $(selectInput);
    selectInput.find("option").each(function () {
        var option = $(this);
        if(option.text().toLowerCase() === text.toLowerCase()){
            selectInput.val(option.val());
            selectInput.trigger('change');
            //console.log(selectInput[0]);
            result = true;
        }
    });
    return result;
}