'use strict'

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const redis = require('redis');

server.listen(3000, function() {
    console.log('server');
});

io.on('connection', function(socket) {
    console.log('new client connected');

    socket.on('create', function(room) {
        socket.join(room);
    });

    const redisClient = redis.createClient();
    
    redisClient.subscribe('chat.item');

    redisClient.on('message', function(channel, message) {
        //Channel is e.g 'score.update'
        console.log('new message in queue', channel, message);

        let data = JSON.parse(message);
        //channel
        let room = data.room;
        /*console.log(data)
        socket.join(room);
        console.log(data.message);*/
        socket.emit(room, data.message);

        //client.emit(channel, message);
    });
     
    /*client.on('disconnect', function() {
        redisClient.quit();
    });*/
});