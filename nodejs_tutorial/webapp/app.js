/*
 * app.js - Hello World
 */

/* jslint        node   : true, continue : true,
   devel  : true, indent : true, maxerr   : 50,
   newcap : true, nomen  : true, plusplus : true,
   regexp : true, sloppy : true, vars     : false,
   white  : true
 */

/* global */

//モジュールスコープ変数の宣言
var http, server;

http = require('http');
server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-type': 'text/plain'} );
    response.end('Hello World');
}).listen(3000);

console.log('Listening on port %d', server.address().port);
