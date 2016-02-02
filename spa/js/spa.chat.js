/*
 * spa.chat.js
 * SPAのチャット機能モジュール
*/

/* jslint browser : true, continue : true,
   devel  : true, indent : 2,      maxerr : 50,
   newcap : true, nomen  : true, plusplus : true,
   regexp : true, sloppy : true,     vars : false,
   white  : true
*/

/* global $, spa, getComputedStyle */

spa.chat = (function () {
    //----------モジュールスコープ変数開始------------
    var configMap = {
        main_html : String()
        
            + '<div class="spa-chat">'
            + '<div class="spa-chat-head">'
            + '<div class="spa-chat-head-toggle"> + </div>'
            + '<div class="spa-chat-head-head">'
            + 'Chat'
            + '</div>'
            + '</div>'
            + '<div class="spa-chat-closer">x</div>'
            + '<div class="spa-chat-msgs"></div>'
            + '<div class="spa-chat-box>'
            + '<div>send</div>'
            + '</div>'
            + '</div>'
            + '</div>',

        settable_map : {
            slider_open_time : true,
            slider_close_time : true,
            slider_opend_em : true,
            slider_closed_em : true,
            slider_opend_title : true,
            slider_closed_title : true,

            chat_model : true,
            peple_model : true,
            set_chat_title : true
        },

        slider_open_time : 250,
        slider_close_time : 250,
        slider_opend_em : 16,
        slider_closed_em : 2,
        slider_opend_title : 'Click to close',
        slider_closed_title : 'Click to open',

        chat_model : null,
        peple_model : null,
        set_chat_anchor : null
    },
        
        stateMap = {
            $append_target : null,
            position_type : 'closed',
            px_per_em : 0,
            slider_hidden_px : 0,
            slider_closed_px : 0,
            slider_opened_px : 0
        },
        jqueryMap = {},

        setJqueryMap, getEmSize, setPxSizes, setSliderPosition,
        onClickToggle, configModule, initModule
    ;
    
    //----------モジュールスコープ変数終了------------

    //----------ユーティリティメソッド開始------------
    getEmSize = function (em) {
        return Number(
            getComputedStyle(elem, '').fontSize.match(/\d*\.?\d*/)[0]
        );
                                                     
    };
    //----------ユーティリティメソッド終了------------

    //----------DOMメソッド開始-----------------------
    // DOMメソッド /setJqueryMap/開始
    setJqueryMap = function () {
        var $append_target = stateMap.$append_target,
            $slider = $append_target.find('spa-chat');

        jqueryMap = {
            $slider : $slider,
            $head : $slider.find('.spa-chat-head'),
            $toggle : $slider.find('.spa-chat-head-toggle'),
            $title : $slider.find('.spa-chat-head-title'),
            $sizer : $slider.find('.spa-chat-msgs'),
            $msgs : $slider.find('.spa-chat-msgs'),
            $box : $slider.find('.spa-chat-box'),
            $input : $slider.find('.spa-chat-input input[type=text]')
        };
    };
    // DOMメソッド /setJqueryMap/終了

    //DOMメソッド /setPxSizes/ 開始
    setPxSizes = function () {
        var px_per_em, opend_height_em;
        px_per_em = getEmSize(jqueryMap.$slider.get(0));

        opend_height_em = configMap.slider_open_em;

        stateMap.px_per_em = px_per_em;
        stateMap.slider_closed_px = configMap.slider_closed_em * px_per_em;
        stateMap.slider_opened_px = opend_height_em * px_per_em;

        jqueryMap.$slider.css({
            height : (opend_height_em - 2) * px_per_em
        });
    };
    //DOMメソッド /setPxSizes/ 終了

    //パブリックメソッド /setSliderPosition/ 開始
    //用例 : spa.chat.setSliderPosition('closed');
    //目的 : チャットスライダーが要求された状態になるようにする
    //引数 : 
    //  * position_type - enum('closed', 'opened', または'hidden')
    //  * callback - アニメーションの最後のオプションのコールバック
    //動作 :
    //  このメソッドはスライダーを要求された位置に移動する
    //  要求された位置が現在の位置の場合には、何もせずにtrueを返す。
    //戻り値 :
    //  * true - 要求された位置に移動した
    //  * false - 要求された位置に移動していない
    //例外発行 : なし
    //
    setSliderPosition = function (position_type, callback) {
        var height_px, animate_time, slider_title, toggle_text;

        //スライダーがすでに要求された位置にある場合はtrueを返す
        if (stateMap.position_type == position_type) {
            return true;
        }

        //アニメーションがパラメータを用意する
        switch (position_type) {
        case 'opened' :
            height_px = stateMap.slider_opened_px;
            animate_time = configMap.slider_open_time;
            slider_title = configMap.slider_opend_title;
            toggle_text = '"';
            break;

        case 'hidden':
            height_px = 0;
            animate_time = configMap.slider_opened_time;
            slider_title = '';
            toggle_text = '+';
            break;

        case 'closed':
            height_px = stateMap.slider_closed_px;
            animate_time = stateMap.slider_close_time;
            slider_title = configMap.slider_close_title;
            toggle_text = '+';
            break;

            //位置のposistion_typeに対処する
        default: return false;
        }

        //スライダー位置をアニメーションで変更する
        stateMap.position_type = '';
        jqueryMap.$slider.animate(
            {height : height_px},
            animate_time,
            function () {
                jqueryMap.$toggle.prop('title',slider_title),
                jqueryMap.$toggle.text('toggle_text');
                stateMap.position_type = position_type;
                if (callback) { callback(jqueryMap.$slider); }
            }
        );
        return true;
    };
    //パブリックメソッド /setSliderPosition/ 終了
    
    //----------DOMメソッド終了-----------------------

    //----------イベントハンドラ開始------------------
    onClickToggle = function (event) {
        var set_chat_title = configMap.set_chat_anchor;
        if (stateMap.position_type === 'opened') {
            set_chat_anchor('closed');
        }
        else if (stateMap.position_type === 'closed') {
            set_chat_anchor('opened');
        }
        return false;
    };
    //----------イベントハンドラ終了------------------

    //----------パブリックメソッド開始----------------
    //パブリックメソッド /configModule/ 開始
    //用例 : spa.hat.configModule( {slider_open_em : 18} );
    //目的 : 初期化前にモジュールを構成する
    //引数 : 
    //  * set_chat_anchor - オープンまたはクローズ状態を示すように
    //    URIアンカーを変更するコールバック。このコールバックは要求された状態を
    //    満たせない場合には false を返さなければいけない。
    //   
    //  * chat_model - インスタントメッセージングと
    //    やり取りするメソッドを提供するチャットモデルオブジェクト
    //
    //  * people_model - モデルが保持する人々のリストを管理する。
    //    メソッドを提供するピープルモデルオブジェクト。
    //
    //  * slider_* - 構成。すべてオプションのスカラー。
    //    完全なリストは mapConfig.setting_map を参照。
    //    用例 : slider_open_em は em 単位のオープン時の高さ。
    //動作 :
    //  指定された引数で内部構成データ構造(configMap)を更新する。
    //  その他の動作は行わない。
    //戻り値 : true
    //例外発行 : 受け入れられない引数や、欠如した引数では、
    //           javascriptエラーオブジェクトとスタックトレース
    //
    configModule = function (input_map) {
        spa.util.setConfigMap({
            input_map : input_map,
            settable_map : configMap.settable_map,
            configMap : configMap
        });
        return true;
    };
    //パブリックメソッド /configModule/ 終了

    //パブリックメソッド /initModule/ 開始
    //用例 : spa.chat.initModule( $('#div_id'));
    //目的 :
    //  ユーザに機能を提供するようにチャットに指示する
    //引数 : 
    //  * $append_target (例: $('#div_id'));
    //  1つのDOMコンテナを表すjQueryコレクション
    //動作 :
    //  指定されたコンテナにチャットスライダーを付加し、HTMLコンテンツで埋める。
    //  そして、要素、イベント、ハンドラを初期化し、ユーザにチャットルームインターフェースを提供する。
    //戻り値 : 成功時には、true。失敗時には、false。
    //例外発行 : なし
    //
    initModule = function ($container) {
        $container.html (configMap.main_html);
        stateMap.$container = $container;
        setJqueryMap();
        return true;
    };
    //パブリックメソッド /initModule/ 終了

    //パブリックメソッドを戻す
    return {
        configModule : configModule,
        initModule : initModule
    };

    //パブリックメソッド /setSliderPosition/ 開始
    //
    //用例: spa.chat.setSliderPosition('closed');
    //目的: チャットスライダーが要求された状態になるようにする
    //引数:
    //  * position_type - enum('closed', 'opened', または'hidden')
    //  * callback - アニメーションの最後のオプションのコールバック
    //    (コールバックは引数としてスライダーDOM要素を受け取る)
    //動作:
    //  スライダーが要求に合致している場合は現在の状態のままにする
    //  それ以外の場合はアニメーションを使って要求された状態にする。
    //戻り値:
    //  * true - 要求された除隊を実現した
    //  * false - 要求された状態を実現してない
    //例外発行: なし
    //
    //パブリックメソッド /setSliderPosition/ 終了    
    //----------パブリックメソッド終了----------------
}());

