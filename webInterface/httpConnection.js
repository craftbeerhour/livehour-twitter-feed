var app = require('express')();
var http = require('http').Server(app);

function getRoute(app) {
    return function(path, callBack) {
        app.get(path, callBack);
    };
};

function newHttpConnection(httpConnection, port) {
    
    return function(callBack) {
        httpConnection.listen(port, callBack);
    }
};


exports.newHttp = function(port) {
    var newRoute = getRoute(app),
        newHttp = newHttpConnection(http, port);
        
        //todo change this shit so more routes can be init from the off..
        newRoute('/', function(req, res){
            res.send('<h1>Hello world</h1>');
        });
        
        return newHttp;
};