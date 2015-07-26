var io = require('socket.io');

function newConnectionEvent(ioConnection) {
    return function(eventCallBack) {
        ioConnection.on('connection', eventCallBack);
    };
}

exports.newSocket = function(httpServer) {
    var ioConnection = io(httpServer);
    
    return newConnectionEvent(ioConnection);
};