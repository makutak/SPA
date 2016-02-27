/*
 * app.js - 汎用ルーティングを備えたExpressサーバ
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
    routes = require('./routes'),
    app = express(),
    server = http.createServer( app );

routes();
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


app.all( '/:obj_type/*?', function( request, response, next) {
    response.contentType( 'json' );
    next();
});


app.get( '/:obj_type/list', function( request, response ) {
    response.send( {title: request.params.obj_type + ' list'} );
});


app.post( '/:obj_type/create', function( request, response ) {
    response.send( {title: request.params.obj_type + ' created'} );
});


app.get( '/:obj_type/read/:id([0-9]+)', function( request, response ) {
    response.send({
        title: request.params.obj_type
            + ' with id ' + request.params.id + ' found'
    });
});


app.post( '/:obj_type/update/:id([0-9]+)', function( request, response ) {
    response.send({
        title: request.params.obj_type
            + ' with id ' + request.params.id + ' updated' 
    });
});


app.get( '/:obj_type/delete/:id([0-9]+)', function( request, response ) {
    response.send({
        title: request.params.obj_type
            + ' with id ' + request.params.id + ' deleted'
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
