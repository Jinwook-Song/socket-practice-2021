"use strict";
exports.__esModule = true;
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = (0, express_1["default"])();
var server = http_1["default"].createServer(app);
var io = new socket_io_1.Server(server);
var port = 3000;
// public 경로의 파일들을 static 경로로 접근하여 사용할 수 있다.
// static은 임의의 경로로 설정하여 사용이 가능
app.use('/static', express_1["default"].static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
io.on('connection', function (socket) {
    var id = socket.id;
    console.log('🎉 a user connected:', id);
    socket.on('disconnect', function () {
        console.log('🚀 user disconnected:', id);
    });
    // chat message
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg); // emit event to everyone
    });
});
server.listen(port, function () {
    console.log("\u2705 Listening on http://localhost:".concat(port));
});
