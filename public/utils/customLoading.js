function CustomLoading(idLoading)
{
    this.loading = $('#' + 'loading');
    if (idLoading)
    {
        this.loading = $('#' + idLoading);
    }
    this.processing = 0;
}

CustomLoading.prototype.show = function () {
    // loading.css('display', 'block');
    this.loading.fadeIn(500);
    this.processing++;

};
CustomLoading.prototype.hide = function () {
    // loading.css('display', 'none');
    this.loading.fadeOut(500);
    this.processing--;
};
CustomLoading.prototype.isProcessing = function () {
   return this.processing <= 0 ? false : true;
};