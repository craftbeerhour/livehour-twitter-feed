var io = require('socket.io');

function newConnectionEvent(ioConnection) {
    return function(eventCallBack) {
        ioConnection.on('connection', eventCallBack);
    };
}

function callServer(ioConnection) {
    return function(callBack) {
        callBack(ioConnection);
    };
}

exports.newSocket = function(httpServer) {
    var ioConnection = io(httpServer);
    
    return callServer(ioConnection);
};