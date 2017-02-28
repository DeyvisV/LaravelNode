'use strict'

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const redis = require('redis');

/*redis.subscribe('chat.item');

redis.on('message', function(channel, message) {
    //Channel is e.g 'score.update'
    var data = JSON.parse(message);
    console.log(data)
    var room = data.user;
    console.log(room)
    client.join(room);
    io.listen(server).in(room).emit(channel, message);
    io.emit(channel, message.message);
});*/

server.listen(3000, function() {
    console.log('server');
});
/*

const path = require('path');
const express = require('express');
const http = require('http');
const redis = require('redis');
//const bodyParser = require('body-parser');

const expressServer = express();
const server = http.createServer(expressServer).listen(3000);
const io = require('socket.io').listen(server);*/
io.listen(server).on('connection', function(client) {

    const redisClient = redis.createClient();
    redisClient.subscribe('chat.item');

    redisClient.on('message', function(channel, message) {
        //Channel is e.g 'score.update'
        let data = JSON.parse(message);
        console.log(data)
        let room = data.room;
        console.log(room)
        console.log(message.message)
        client.join(room);
        io.listen(server).in(room).emit(channel, message.message);

        //client.emit(channel, message);
    });
     
    client.on('disconnect', function() {
        redisClient.quit();
    });
});