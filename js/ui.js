//alert(1);

//ui-search定义
    $.fn.UiSearch=function(){
        var ui=$(this);
        $('.ui-search-selected',ui).on('click',function(){
            $('.ui-search-select-list').show();
            return false;
        });
        $('.ui-search-select-list a',ui).on('click',function(){
            $('.ui-search-selected').text($(this).text());
            $('.ui-search-select-list').hide();

            return false;
        });
    }
//页面的脚本逻辑
// $(function(){
//     alert(1);
// });
// alert(2);

$(function(){
    $('ui-search').UiSearch();
});



