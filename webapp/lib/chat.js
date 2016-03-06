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
var emitUserList, signIn, chatObj,
    socket = require('socket.io'),
    crud   = require('./crud'),

    makeMongoId = crud.makeMongoId,
    chatterMap  = {};
//モジュールスコープ変数終了

//ユーティリティメソッド開始
//emitUserList - 接続されている全クライアントにユーザリストを配信する
//
emitUserList = function ( io ) {
  crud.read(
    'user',
    { is_online : true },
    {},
    function ( result_list ) {
      io
        .of( '/chat' )
        .emit( 'listchange', result_list );
    }
  );
};

//signIn - is_onlineプロパティとchatterMapを更新する
//
signIn = function ( io, user_map, socket ) {
  crud.update(
    'user',
    { '_id' : user_map.id },
    { is_online : true },
    function ( result_map ) {
      emitUserList( io );
      user_map.is_online = true;
      socket.emit( 'userupdate', user_map );
    }
  );

  chatterMap[user_map._id] = socket;
  socket.user_id = user_map._id;
};
//ユーティリティメソッド終了

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

             // /adduser/メッセージハンドラ開始
             // 概要: サインイン機能を提供する。
             // 引数: 1つのuser_mapオブジェクト。
             //  user_mapは以下のプロパティを持つべき。
             //    name = ユーザの名前
             //    cid  = クライアントID
             // 動作:
             //  指定のユーザ名を持つユーザがMongoDBにすでに存在する場合には、
             //    規定のユーザオブジェクトを使い、他の入力は無視する。
             //  指定のユーザ名を持つユーザがMongoDBに存在しない場合には、
             //    ユーザオブジェクトを作成してそれをつかう。
             //  送信者に「userupdate」メッセージを送信し、
             //    ログインサイクルを完了できるようにする。クライアントIDを戻し、
             //    クライアントがユーザを関連付けられるようにするが、MongoDBには格納しない。
             //  ユーザをオンラインとしてマークし、「adduser」メッセージを発行した
             //    クライアントを含めた全クライアント肉親されたオンラインユーザリストを配信する。
             //
             socket.on( 'adduser', function ( user_map ) {
               crud.read(
                 'user',
                 { name : user_map.name },
                 {},
                 function ( result_list ) {
                   var result_map,
                       cid = user_map.cid;

                   delete user_map.cid;

                   //指定の名前を持つ既存ユーザを使う
                   if ( result_list.length > 0 ) {
                     result_map = result_list[0];
                     result_map.cid = cid;
                     signIn( io, result_map, socket );
                   }

                   //新し名前のユーザを作成する
                   else {
                     user_map.is_online = true;
                     crud.construct(
                       'user',
                       user_map,
                       function ( result_list ) {
                         result_map = result_list[0];
                         result_map.cid = cid;
                         chatterMap[result_map._id] = socket;
                         socket.user_id = result_map._id;
                         socket.emit( 'userupdate', result_map );
                         emitUserList( io );
                       }
                     );
                   }
                 }
               );
             });
             // /adduser/メッセージハンドラ終了

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
