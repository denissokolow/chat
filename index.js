var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app
    .get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
            io.emit('chat message', {name: data.name, msg: data.msg});
    });
    socket.on('change', (data) => {
            io.emit('change', data);
    });

});

http.listen(3000, () => {
    console.log('listening on *:3000');
});