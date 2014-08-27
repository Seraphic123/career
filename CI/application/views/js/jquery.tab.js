/*
    本外掛由黯雲（AnYun）撰寫，歡迎修改，
    但是記得到我網誌分享修改結果喔！

    教學網址：http://coding.anyun.idv.tw/2012/03/03/jquery-tab/
	
    版本：1.0.0
*/
(function ($) {

    $.fn.tab = function (options) {

        var settings = $.extend({
            'tabbtn': '.TabBtn li a',   // Tab 按鈕
            'tabcontent': '.TabBlock div',  // 內文區塊
            'activecss': 'active',  // 點選中的樣式
            'event': 'click'    // 事件。可以改成 mouseenter ，就是滑鼠移過去的事件
        }, options);

        return this.each(function () {
            $this = $(this);
            $tabbtn = $this.find(settings.tabbtn);
            $tabcontent = $this.find(settings.tabcontent);
            $activecss = settings.activecss;
            $event = settings.event;

            $tabcontent.hide().eq(0).show();    // 顯示第一則內文
            $tabbtn.eq(0).parent().attr('class', $activecss);   // 設定第一個 Tab 按鈕樣式

            // 設定 Tab 按鈕事件
            $tabbtn.bind($event, function (i) {
                var i = $tabbtn.index(this);
                $tabcontent.hide().eq(i).show();    // 顯示點選的內容
                $tabbtn.parent().removeClass().eq(i).attr('class', $activecss);     // 設定點選的頁籤內容
            });

        });
    };
})(jQuery);