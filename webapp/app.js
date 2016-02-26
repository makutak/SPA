/*
 * app.js - 高度なルーティングを備えたExpressサーバ
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
var http = require( 'http' ),
    express = require( 'express' ),
    app = express(),
    server = http.createServer( app );
//モジュールスコープ変数終了

//サーバ構成開始
app.configure( function () {
    app.use( express.bodyParser() );
    app.use( express.methodOverride() );
    app.use( express.static(__dirname + '/public') );
    app.use( app.router );
} );


app.configure( 'development', function () {
    app.use( express.logger() );
    app.use( express.errorHandler({
        dumpExceptions :true,
        showStack : true
    }) );
});


app.configure( 'production', function () {
    app.use( express.errorHandler() );
});

//以下の設定はすべてルート用
app.get( '/', function( request, response ) {
    response.redirect( '/spa.html' );
});


app.get('/user/list', function( request, response ) {
    response.contentType( 'json' );
    response.send( {title: 'user list'} );
});


app.post('/user/create', function( request, response ) {
    response.contentType( 'json' );
    response.send( {title: 'user created'} );
});

app.get( '/user/read/:id', function( request, response ) {
    response.contentType( 'json' );
    response.send({
        title: 'user with id ' + request.params.id + 'found'
    });
});
//サーバ構成終了

//サーバ起動開始
server.listen( 3000 );
console.log(
    'Express Server listning on port %d in %s mode',
    server.address().port, app.settings.env
);
//サーバ起動終了
