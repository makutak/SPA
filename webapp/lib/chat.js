/*
 * chat.js - チャットメッセージを提供するモジュール
 */

/* jslint        node   : true, continue : true,
   devel  : true, indent : true, maxerr   : 50,
   newcap : true, nomen  : true, plusplus : true,
   regexp : true, sloppy : true, vars     : false,
   white  : true
 */

/* global */

//モジュールスコープ変数の宣言
'use strict';
var chatObj,
    socket = require('socket.io'),
    crud   = require('./crud');
//モジュールスコープ変数終了

//パブリックメソッド開始
chatObj = {
  connect : function ( server ) {
    var io = socket.listen(server);
    return io;
  }
};

module.exports = chatObj;
//パブリックメソッド終了
