(function ($) {
    var _gtui = window.gtui;
    
    if (!_gtui) _gtui = { i18n: {} }
    else if (!_gtui.i18n) _gtui.i18n = {}

    _gtui.i18n['en-us'] = {
        "firstPage": "First",
        "prevGroup": "Prev Group",
        "prevPage": "Prev Page",
        "nextPage": "Next Page",
        "nextGroup": "Next Group",
        "lastPage": "Last",
        "totalPages": "Total Pages: ",
        "totalCount": "Total Count: "
    }

    window.gtui = _gtui;
})(jQuery);