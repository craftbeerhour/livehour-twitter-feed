var consumerConnection = require("./firebaseApi/consumerConnection.js"),
    webConnection = require("./webInterface/httpConnection.js"),
    firebaseRepository = consumerConnection.connection(process.env.FIREBASE_API_URL),
    routes = [
          { path: '/', callBack: function(req, res){ res.sendFile(__dirname + '/webInterface/htmlTemplates/index.html'); }}
          ],
    newSocket = webConnection.newHttp(process.env.PORT, routes);




//link input tweet data to outbound sockets.
 newSocket(function(socketServer){
   newStream(keyword, function(data) {
       socketServer.emit('newTweet', data.text);
   });
});



