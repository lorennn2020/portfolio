jQuery(document).ready(function() {

    // 一鍵複製
    $(".js_copy").click(function() {
        $(this).next().next().select();
        console.log($(this).parent().next().next());
        document.execCommand("copy");

        // 複製提示動畫
        $(this).toggleClass('active');
        setTimeout(function(){
            $(this).toggleClass('active');
        }, 250);
    });

    // 展開 & 收合
    $(".js_expand").click(function() {
        $(this).addClass('expand');
        
    });

    // ----------- 功能 ----------- //
    // 3 select
    $('.item-selected').click(function() {
        // 判斷目前抽屜是否開啟
        if($(this).next().hasClass('select_open')){
            var isOpen = 1;
        }
        // 關閉所有抽屜
        $('.select_open').removeClass('select_open');
        $(this).parent().parent().removeClass('open');
        // 若目前抽屜開啟則關，反之亦然
        if(isOpen !== 1){
            $(this).next().addClass('select_open');
            $(this).parent().parent().addClass('open');
        }
    });
    // 取值
    $('.item-option').click(function() {
        $(this).parent().toggleClass('select_open');
        var val = $(this).text();
        $(this).parent().prev().text(val);
    });
    // 點選背景關閉所有抽屜
    $('.group-close').click(function() {
        $('.select_open').removeClass('select_open');
        $('.open').removeClass('open');
    });
});