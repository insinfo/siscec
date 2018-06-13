function MenuAPI(idMenuContainer,webserviceURL,method)
{
    this._webserviceURL = webserviceURL;
    this._method = method ? method : 'GET';
    this._menuContainer = $('#'+idMenuContainer);
    this.restClient = new RESTClient();
    this._iframeTargetId = null;
    this.init();
}
MenuAPI.prototype.init = function () {
    var self = this;
    self.eventos();
};
MenuAPI.prototype.eventos = function () {
    var self = this;
    this._menuContainer.on('click','a',function (e) {
        e.preventDefault()
        //if(self._iframeTargetId){
            $('#'+self._iframeTargetId).attr('src', $(this).attr('data-rota'));
        //}
    });
};
MenuAPI.prototype.setMethod = function (method) {
    this._method = method;
};
MenuAPI.prototype.setIframeID = function (iframeTargetId) {
    this._iframeTargetId = iframeTargetId;
};
MenuAPI.prototype.setURL = function (webserviceURL) {
    this._webserviceURL = webserviceURL;
};
MenuAPI.prototype.load = function () {
    var self = this;

    self.restClient.setWebServiceURL(self._webserviceURL);
    self.restClient.setMethod(self._method);
    self.restClient.setSuccessCallbackFunction(function (dados) {
        self._menuContainer.empty();
        var menu = '';
        $.each(dados, function (idx, item) {
            menu += '<li class="navigation-header">' +
                '<span>' + item['label'] + '</span>' +
                '<i class="icon-menu"></i>' +
                '</li>';
            menu += self.drawItems(item['nodes']);
        });
        self._menuContainer.append(menu);
    });
    self.restClient.exec();

};
MenuAPI.prototype.drawItems = function (subItens) {
    var self = this;

    var html = '';

    $.each(subItens, function (idx, item) {
        var rota = item['rota'] === null ? 'vazio' : item['rota'];
        var hasUl = item['nodes'] ? 'has-ul ' : 'hide-dynamic ';

        html += '<li>' +
            '<a data-rota="'+rota+'"  class="' + hasUl + 'legitRipple">' +
            '<i class="' + item['icone'] + '">' +
            '</i><span>' + item['label']
            + '</span>' +
            '</a>';

        if (item['nodes'])
        {
            html += '<ul class="hidden-ul">' + self.drawItems(item['nodes']) + '</ul>';
        }
        html += '</li>';
    });

    return html;
};