/*jslint設定*/
/*jslint browser :true, continue :true;
  devel  : true, indent : 2,      maxerr : 50;
  newcap : true, nomen  : true, plusplus : true;
  regexp : true, sloppy : true, vars     : true;
  while  : true
*/

/*gloval jQuery spa: true*/
// モジュール/spa/
// チャットスライダー機能を提供する

var spa = (function ($) {
    // モジュールスコープ変数
    var
    // 定数を設定する
    configMap = {
        extend_height : 434,
        extend_title : 'Click to Retract',
        retracted_height : 16,
        retracted_title : 'Click to extend',
        template_html : '<div class="spa-slider"><\/div>'
    },
    // その他のすべてのモジュールスコープ変数を宣言する
    $chatSlider,
    toggleSlider, onClickSlider, initModule;

    // DOMメソッド/toggleSlider/
    // スライダーの高さを切り替える
    toggleSlider = function () {
        var slider_height = $chatSlider.height();
        
        //完全に格納されている場合はスライダーを拡大する
        if (slider_height === configMap.retracted_height) {
            $chatSlider
                .animate({height : configMap.extend_height})
                .attr( 'title', configMap.extend_title);
            return true;
        }
        //完全に拡大されている場合は格納する
        else if (slider_height === configMap.extend_height) {
            $chatSlider
                .animate({height : configMap.retracted_height})
                .attr('title', configMap.retracted_title);
            return true;
        }
        
        //スライダーから移行中の場合は何もしない
        return faluse;
    }
    
    // イベントハンドラ /onClickSlider/
    // クリックイベントを受け取り、toggleSliderを呼び出す
    onClickSlider = function (event) {
        toggleSlider();
        return false;
    };

    // パブリックメソッド/initModule/
    //初期状態を設定し、機能を提供する
    initModule = function($container) {
        //HTMLをレンダリングする
        $container.html(configMap.template_html);
        $chatSlider = $container.find('.spa-slider');
        //スライダーの高さとタイトルを初期化する
        //ユーザクリックイベントをイベントハンドラにバインドする
        $chatSlider
            .attr('title', configMap.retracted_title)
            .click(onClickSlider);
        return true;
    };
    
    return {initModule : initModule};
}(jQuery));
//DOMの準備ができたらspaを開始する
jQuery(document).ready(
    function () {spa.initModule( jQuery('#spa') ); }
);
