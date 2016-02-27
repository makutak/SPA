/*
 * routes.js - ルーティングを提供するモジュール
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
var configRoutes;
//モジュールスコープ変数終了

//パブリックメソッド開始
configRoutes = function (app, server) {
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
};

module.exports = {configRoutes : configRoutes};
//パブリックメソッド終了
