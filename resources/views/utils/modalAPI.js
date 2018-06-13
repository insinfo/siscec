function ModalAPI() {
    // Propriedades
    this.iconeModal = null;
    this.tituloModal = null;
    this.mensagem = null;
    this.botoes = [];
    this.modal = null;
    this.botaoFechar = null;
    // Funções de auxílio
    this.removerAcentos = function (s) {
        var map={"â":"a","Â":"A","à":"a","À":"A","á":"a","Á":"A","ã":"a","Ã":"A","ê":"e","Ê":"E","è":"e","È":"E","é":"e","É":"E","î":"i","Î":"I","ì":"i","Ì":"I","í":"i","Í":"I","õ":"o","Õ":"O","ô":"o","Ô":"O","ò":"o","Ò":"O","ó":"o","Ó":"O","ü":"u","Ü":"U","û":"u","Û":"U","ú":"u","Ú":"U","ù":"u","Ù":"U","ç":"c","Ç":"C"};
        return s.replace(/[\W\[\] ]/g, function(a){
            return map[a]||a
        });
    };
    this.fechar = function () {
        var self = this;
        self.modal.find('.customModalContent').slideUp("fast");
        self.modal.fadeOut("fast");
    };
    this.abrir = function () {
        var self = this;
        self.modal.fadeIn('fast');
        self.modal.find('.customModalContent').slideDown("fast");
        self.modal.on('click', function (e) {
            if (e.target !== this) return;
            self.fechar();
        });
    };
    this.verDetalhes = function () {
        this.modal.find('.detail-block').slideDown("fast");
    };
    this.ocultarDetalhes = function () {
        this.modal.find('.detail-block').slideUp("fast");
    };
    this.iniciar = function (tipo, config) {
        var self = this;
        $('div#modal-api-5478').remove();

        switch (tipo) {
            case ModalAPI.ALERTA:
                self.iconeModal =  '<span class="customModalIcon">'+
                                        '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"'+
                                        'xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"'+
                                        'width="16px" height="16px" viewBox="216.884 0 973.665 868.436"'+
                                        'enable-background="new 216.884 0 973.665 868.436"'+
                                        'xml:space="preserve">'+
                                            '<path fill="#FFFFFF" d="M704.655,860.583c-120.985,0-241.971,0.02-362.953-0.025c-9.23,0-18.535,0.293-27.678-0.703'+
                                            'c-77.555-8.473-109.386-67.111-70.674-135.027C368.612,505.072,495.058,285.994,621.472,66.9'+
                                            'c7.267-12.594,17.178-24.175,27.735-34.267C684.221-0.84,725.18-0.638,759.754,33.315c10.399,10.205,19.487,22.371,26.793,35.019'+
                                            'c125.63,217.411,251.29,434.812,376.005,652.745c43.006,75.156,6.295,138.143-81.098,139.014'+
                                            'c-125.589,1.256-251.2,0.318-376.8,0.318C704.655,860.472,704.655,860.531,704.655,860.583z M705.99,559.902'+
                                            'c12.953-1.369,31.123,8.416,34.667-17.158c10.37-74.807,22.588-149.356,33.196-224.133c4.609-32.497-4.319-61.204-33.747-78.881'+
                                            'c-24.899-14.954-51.473-14.554-75.581,2.576c-27.805,19.758-34.982,47.787-29.671,80.598'+
                                            'c11.043,68.198,22.76,136.342,31.314,204.866C669.475,554.244,677.523,567.007,705.99,559.902z M774.802,673.705'+
                                            'c-0.28-38.475-31.904-69.389-70.96-69.361c-38.478,0.025-70.478,31.334-71.049,69.504c-0.581,38.918,32.936,71.686,72.646,71.023'+
                                            'C743.871,744.238,775.077,712.218,774.802,673.705z"/>'+
                                        '</svg>'+
                                    '</span>';
                break;
            case ModalAPI.INFO:
                self.iconeModal =  '<span class="customModalIcon">'+
                                        '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"'+
                                        'width="16px" height="16px" viewBox="315.775 0 874.774 874.86" enable-background="new 315.775 0 874.774 874.86"'+
                                        'xml:space="preserve">'+
                                            '<g>'+
                                            '<path fill="#FFFFFF" d="M326.149,461.151c0-15.814,0-31.63,0-47.444c0.346-1.922,0.881-3.832,1.011-5.77'+
                                        'c3.522-52.594,15.454-103.262,38.731-150.521C434.694,117.723,546.448,36.334,700.712,13.75c9.529-1.396,19.141-2.228,28.714-3.32'+
                                        'c15.815,0,31.629,0,47.445,0c1.721,0.335,3.43,0.75,5.163,0.992c20.32,2.841,40.889,4.488,60.931,8.662'+
                                        'c189.153,39.387,330.511,207.509,336.939,400.475c2.935,88.109-17.905,170.316-65.744,244.474'+
                                        'c-72.281,112.045-175.134,177.385-307.375,195.973c-9.937,1.396-19.941,2.295-29.914,3.426c-15.815,0-31.63,0-47.445,0'+
                                        'c-1.714-0.34-3.415-0.869-5.144-0.984c-64.488-4.363-125.391-21.57-181.138-54.227c-122.36-71.674-193.697-178.119-213.632-318.71'+
                                        'C328.131,480.759,327.258,470.938,326.149,461.151z M680.502,532.276c0.042,0,0.083,0,0.125,0'+
                                        'c0,50.406-0.001,100.812,0.003,151.218c0.001,3.359-0.027,6.723,0.077,10.08c0.922,29.617,16.904,51,45.075,60.031'+
                                        'c4.869,1.563,9.931,2.656,14.982,3.49c48.867,8.064,87.944-29.121,86.5-72.949c-1.34-40.678-0.45-81.432-0.46-122.15'+
                                        'c-0.013-62.857,0.002-125.716,0.107-188.576c0.024-14.684-3.55-28.154-12.371-40.014c-20.016-26.911-53.015-36.634-86.43-25.543'+
                                        'c-29.896,9.922-47.638,35.924-47.617,69.639C680.525,429.095,680.502,480.687,680.502,532.276z M831.785,194.745'+
                                        'c0.038-43.625-34.626-78.501-78.149-78.627c-44.185-0.128-79.253,34.768-79.226,78.837c0.025,43.518,35.343,78.794,78.871,78.782'+
                                        'C796.926,273.722,831.746,238.686,831.785,194.745z"/>'+
                                        '</g>'+
                                        '</svg>'+
                                    '</span>';


                break;
            case ModalAPI.SUCESSO:
                self.iconeModal =  '<span class="customModalIcon">'+
                                        '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"'+
                                            'width="16px" height="16px" viewBox="321.775 0 868.774 868.86" enable-background="new 321.775 0 868.774 868.86"'+
                                            'xml:space="preserve">'+
                                                '<path fill="#FFFFFF" d="M778.175,860.493c-14.676,0-29.352,0-44.027,0c-0.967-0.34-1.926-0.943-2.906-0.98'+
                                            'c-18.076-0.701-35.934-3.195-53.691-6.48c-35.264-6.52-69.115-17.455-101.583-32.664c-34.116-15.984-65.565-36.119-94.338-60.475'+
                                            'c-21.918-18.555-41.862-39.008-59.648-61.531c-27.604-34.959-49.291-73.289-64.813-115.062'+
                                            'c-15.24-41.016-24.169-83.334-26.092-127.092c-0.059-1.354-0.639-2.684-0.976-4.025c0-11.834,0-23.668,0-35.504'+
                                            'c0.335-1.094,0.874-2.169,0.975-3.282c0.998-11.034,1.709-22.1,2.913-33.11c2.209-20.209,6.406-40.051,11.859-59.625'+
                                            'c16.741-60.097,45.272-113.935,85.628-161.537c19.034-22.453,40.113-42.768,63.338-60.798'+
                                            'c40.151-31.171,84.418-54.616,132.951-69.901c34.494-10.863,69.75-17.452,105.906-19.073c1.355-0.062,2.688-0.644,4.031-0.985'+
                                            'c11.834,0,23.668,0,35.504,0c1.225,0.335,2.432,0.87,3.672,0.97c4.115,0.333,8.273,0.271,12.359,0.788'+
                                            'c15.889,2.013,31.869,3.558,47.605,6.426c49.088,8.946,94.9,26.781,137.693,52.366c40.525,24.229,75.98,54.453,106.527,90.467'+
                                            'c20.65,24.346,38.348,50.667,53.076,78.97c19.264,37.022,32.727,76.085,40.434,117.097c3.551,18.903,6.047,37.955,6.676,57.214'+
                                            'c0.045,1.348,0.639,2.677,0.977,4.014c0,11.835,0,23.668,0,35.504c-0.326,0.982-0.867,1.947-0.947,2.949'+
                                            'c-0.553,6.936-0.596,13.936-1.58,20.805c-2.508,17.48-4.67,35.063-8.326,52.318c-8.453,39.889-23.223,77.503-43.023,113.138'+
                                            'c-15.092,27.154-32.932,52.387-53.602,75.566c-15.123,16.961-31.422,32.732-49.047,47.127'+
                                            'c-21.572,17.617-44.572,33.072-69.133,46.178c-37.982,20.266-78.113,34.523-120.43,42.52c-17.969,3.396-36.053,5.916-54.348,6.709'+
                                            'C780.572,859.545,779.378,860.149,778.175,860.493z M482.216,434.237c70.438,70.352,140.659,140.485,211.079,210.816'+
                                            'c0.73-0.68,1.965-1.756,3.123-2.91c50.338-50.25,100.666-100.509,151.002-150.761c60.051-59.95,120.109-119.895,180.164-179.844'+
                                            'c3.426-3.42,3.432-3.44,0.006-6.866c-25.605-25.608-51.209-51.222-76.834-76.81c-5.256-5.249-4.297-5.175-9.457-0.018'+
                                            'c-81.869,81.817-163.725,163.648-245.59,245.47c-0.889,0.889-1.85,1.703-3.387,3.111c-1.074-1.387-1.832-2.619-2.826-3.613'+
                                            'c-39.898-39.939-79.816-79.855-119.738-119.771c-3.385-3.385-3.415-3.389-6.638-0.16c-26.326,26.386-52.646,52.776-78.96,79.175'+
                                            'C483.344,432.874,482.62,433.782,482.216,434.237z"/>'+
                                        '</svg>'+
                                    '</span>';
                break;
            default:
                self.iconeModal = '';
                break;
        }
        self = $.extend(self, config);

        // Faz o tratamento das mensagens adicionando os detalhes SE necessário
        var linkDetalhes = '<span class="detailText">[detalhes]</span>'; '<p>'+ self.mensagem;
        if (typeof self.mensagem !== 'object') {
            self.mensagem = {message:self.mensagem};
            linkDetalhes = '';
        } else if (Object.keys(self.mensagem).length === 1) linkDetalhes = '';

        var msg, detalhes = '';
        for (var key in self.mensagem) {
            if ( key === 'message' ) {
                msg = self.mensagem[key] + linkDetalhes;
            } else detalhes += '<p><span class="text-pink">'+ key +': </span>'+ self.mensagem[key] +'</p>';
        }

        var html =  '<div id="modal-api-5478" class="customModal">' +
                        '<div class="customModalContent ">' +
                            '<div class="customModalHeader">' +
                                '<span id="ico-close" class="customModalCloseBtn"></span>' +
                                '<h6>'+ self.iconeModal +' '+ self.tituloModal +'</h6>' +
                            '</div>' +
                            '<div class="customModalSection">' +
                                '<div class="modalContainer">' +
                                    '<p>'+ msg +'</p>' +

                                    '<div class="detail-block" style="display:none">'+ detalhes +'</div>'+

                                '</div>' +
                                '<div class="customModalFooter"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

        $('body').append(html);
        self.modal = $('div#modal-api-5478');
        self.botaoFechar = $('span#ico-close');
        self.botaoFechar.on('click', function () {
            self.fechar();
        });
        self.modal.on('click', '.detailText', function () {
            var bloco = self.modal.find('.detail-block');
            if ( bloco.css('display') == 'none' ) self.verDetalhes();
            else self.ocultarDetalhes();
        });


        // Prepara os botões diretamente com classes DOM
        var modal = document.getElementById('modal-api-5478');
        var rodape = modal.getElementsByClassName("customModalFooter")[0];
        $.each(self.botoes.reverse(), function (idx, btn) {
            var botao = document.createElement('A');
            botao.setAttribute("id", self.removerAcentos(btn.label.replace(" ","").toLowerCase()));
            botao.classList.add("btn");
            if (idx === self.botoes.length-1) botao.classList.add('btnCustom');
            var rotulo = document.createTextNode(btn.label);
            botao.appendChild(rotulo);
            rodape.appendChild(botao);
        });

        // Abre modal
        self.abrir();
    };
}
// CONSTANTES
ModalAPI.ALERTA = 1;
ModalAPI.INFO = 2;
ModalAPI.SUCESSO = 3;
// METODOS MODAIS
ModalAPI.prototype.showAlert = function (mensagem, botao) {
    var self = this;
    var config = {tituloModal:'Alerta', mensagem:mensagem, botoes:[ {label:botao?botao:"OK",callback:"callback"} ]};
    self.iniciar(ModalAPI.ALERTA, config);
    // Retorno da função
    return {
        onClick: function (callback) {
            $( "#"+self.removerAcentos(botao.replace(" ","").toLowerCase()) ).click(function () {
                self.fechar();
                setTimeout(function () { // Timeout usado para 'esperar' a animação de fechar o modal
                    callback();
                },200);
            });
        }
    };
};
ModalAPI.prototype.showModal = function (tipo, titulo, mensagem, botao) {
    var self = this;
    var config = { tituloModal:titulo, mensagem:mensagem, botoes:[ {label:botao,callback:"callback"} ]};
    self.iniciar(tipo, config);
    // Retorno da função
    return {
        onClick: function (callback) {
            $( "#"+self.removerAcentos(botao.replace(" ","").toLowerCase()) ).click(function () {
                self.fechar();
                setTimeout(function () { // Timeout usado para 'esperar' a animação de fechar o modal
                    callback();
                },200);
            });
        }
    };
};
ModalAPI.prototype.showConfirmation = function (tipo, titulo, mensagem, botaoPositivo, botaoNegativo) {
    var self = this;
    var config = { tituloModal:titulo, mensagem:mensagem, botoes:[{label:botaoPositivo,callback:"callback"},{label:botaoNegativo,callback:"callback"}] };
    self.iniciar(tipo, config);
    // Retorno da função
    return {
        onClick: function (objectId, callback) {
            $("#"+self.removerAcentos(objectId.replace(" ","").toLowerCase())).click(function () {
                self.fechar();
                setTimeout(function () { // Timeout usado para 'esperar' a animação de fechar o modal
                    callback();
                },200);
            });
            return this; // Garante a recursividade para pegar o callback de cada botão inserido
        }
    };
};
ModalAPI.prototype.showCustom = function (tipo, config) {
    var self = this;
    self.iniciar(tipo, config);
    // Retorno da função
    return {
        onClick: function (objectId, callback) {
            $("#"+self.removerAcentos(objectId.replace(" ","").toLowerCase())).click(function () {
                self.fechar();
                setTimeout(function () { // Timeout usado para 'esperar' a animação de fechar o modal
                    callback();
                },200);
            });
            return this; // Garante a recursividade para pegar o callback de cada botão inserido
        }
    };
};

