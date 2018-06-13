/**
 * Created by Isaque on 24/07/2017.
 */

function RESTClient()
{
    this.appkey = null;
    this.method = 'POST';
    this.webserviceURL = null;
    this.successCallbackFunction = null;
    this.errorCallbackFunction = null;
    this.dataTypeFormat = 'json';
    this.dataToSender = null;
    this.senderDataFormat = 'application/json; charset=utf-8';
    this.header = null;
}
RESTClient.prototype.setHeader = function (header) {
    this.header = header;
};
RESTClient.prototype.setMethod = function (method) {
    this.method = method;
};
RESTClient.prototype.setMethodGET = function () {
    this.method = 'GET';
};
RESTClient.prototype.setMethodPOST = function () {
    this.method = 'POST';
};
RESTClient.prototype.setMethodDELETE = function () {
    this.method = 'DELETE';
};
RESTClient.prototype.setMethodPUT = function () {
    this.method = 'PUT';
};
RESTClient.prototype.setSenderDataFormat = function (dataFormat) {
    this.senderDataFormat = dataFormat;
};
RESTClient.prototype.setSenderMultipartFormat = function () {
    this.senderDataFormat = 'multipart/form-data';
};
RESTClient.prototype.setSenderFormUrlEncodedFormat = function () {
    this.senderDataFormat = 'application/x-www-form-urlencoded; charset=UTF-8';
};
RESTClient.prototype.setSenderJsonFormat = function () {
    this.senderDataFormat = 'application/json; charset=utf-8';
};
RESTClient.prototype.setSenderTextPlainFormatFormat = function () {
    this.senderDataFormat = 'text/plain';
};
RESTClient.prototype.setWebServiceURL = function (webserviceURL) {
    this.webserviceURL = webserviceURL;
};
RESTClient.prototype.setSuccessCallbackFunction = function (successCallbackFunction) {
    this.successCallbackFunction = successCallbackFunction;
};
RESTClient.prototype.setErrorCallbackFunction = function (errorCallbackFunction) {
    this.errorCallbackFunction = errorCallbackFunction;
};
RESTClient.prototype.setDataTypeFormat = function (dataTypeFormat) {
    this.dataTypeFormat = dataTypeFormat;
};
RESTClient.prototype.setReceiverDataTypeFormat = function (dataTypeFormat) {
    this.dataTypeFormat = dataTypeFormat;
};
RESTClient.prototype.setDataToSender = function (dataToSender) {
    this.dataToSender = dataToSender;
};
RESTClient.prototype.exec = function () {
    var self = this;
    var sendData;
    if (self.dataToSender != null)
    {
        sendData = JSON.stringify(this.dataToSender);
    }
    var token = sessionStorage.getItem('YWNjZXNzX3Rva2Vu');//access_token
    var cabecario = { 'Authorization': 'Bearer ' + token };//headers: cabecario,
    if (self.header)
    {
        cabecario = self.header
    }
    $.ajax({
        type: self.method,
        url: self.webserviceURL,
        headers: cabecario ,
        dataType: self.dataTypeFormat,// data type of response
        data: sendData,
        contentType: self.senderDataFormat,
        //traditional: self,
        success: self.successCallbackFunction,
        error: self.errorCallbackFunction
    });
};