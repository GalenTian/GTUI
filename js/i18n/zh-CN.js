(function ($) {
    var _gtui = window.gtui;
    
    if (!_gtui) _gtui = { i18n: {} }
    else if (!_gtui.i18n) _gtui.i18n = {}

    _gtui.i18n['zh-cn'] = {
        "firstPage": "首页",
        "prevGroup": "前一组",
        "prevPage": "前一页",
        "nextPage": "后一页",
        "nextGroup": "后一组",
        "lastPage": "末页",
        "totalPages": "总页数: ",
        "totalCount": "总条数: "
    }

    window.gtui = _gtui;
})(jQuery);