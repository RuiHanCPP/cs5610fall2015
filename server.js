var express = require('express');
var app = express();
var http = require('http');

var port = normalizePort(process.env.PORT || '80');
app.set('port', port);
var server = http.createServer(app);
server.listen(port);

