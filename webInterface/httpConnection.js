var express = require("express");
var app = express();
var http = require('http').Server(app);
var socketConn = require("./socketConnection.js");

function getRoute(app) {
    return function(path, callBack) {
        app.get(path, callBack);
    };
};

function newHttpConnection(httpConnection, port, createRoutes) {
    
    return function(routes, callBack) {
        createRoutes(routes);
        httpConnection.listen(port, callBack);
    }
};

function createGetRoutes(newRoute) {
    var createRoute = function(routes) {
        var route = routes.pop();
        newRoute(route.path, route.callBack);
        return routes.length > 0 ?
            createRoute(routes) :
            true;
    };
    
    return createRoute;
}

exports.newHttp = function(port, routes) {
    var newRoute = getRoute(app),
        createRoutes = createGetRoutes(newRoute),
        newHttp = newHttpConnection(http, port, createRoutes),
        socketConnection = socketConn.newSocket(http);
        
        //set static public dir
        app.use(express.static('public'));
        
        newHttp(routes, function(){ console.log('connected!!') }); //todo allow for callback to be passed in for new connection.
        
        return socketConnection;
};