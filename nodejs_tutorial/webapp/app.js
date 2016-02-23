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
var connectHello, server,
    http = require('http'),
    connect = require('connect'),
    app = connect(),
    bodyText = 'Hello Connect';


connectHello = function (request, response, next) {
    response.setHeader('content-length', bodyText.length);
    response.end(bodyText);
};

app.use(connectHello);
server = http.createServer(app);

server.listen(3000);
console.log('Listening on port %d', server.address().port);
