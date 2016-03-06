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

    //io設定開始
    io
      .set( 'blacklist', [] )
      .of( '/chat' )
      .on( 'connection',
           function( socket ) {
             socket.on( 'adduser', function() {} );
             socket.on( 'updatechat', function () {} );
             socket.on( 'leavechat', function () {} );
             socket.on( 'disconnect', function () {} );
             socket.on( 'updateavater', function () {} );
           }
         );
    //io設定終了

    return io;
  }
};

module.exports = chatObj;
//パブリックメソッド終了
