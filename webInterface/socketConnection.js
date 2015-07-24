var io = require('socket.io');

exports.newSocket = function(httpServer) {
    var ioConnection = io(httpServer);
    
    ioConnection.on('connection', function(socket){console.log('user connected')});
};