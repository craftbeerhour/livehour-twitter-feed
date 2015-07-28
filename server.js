var streamConnection = require("./twitterApi/streamConnection.js"),
    webConnection = require("./webInterface/httpConnection.js"),
    keyword = '#craftbeerhour',
      connectionDetails = {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret: process.env.TWITTER_ACCESS_SECRET
      },
    newStream = streamConnection.stream(connectionDetails),
    routes = [
          {path: '/', callBack: function(req, res){ res.sendFile(__dirname + '/webInterface/htmlTemplates/index.html'); }}
          ],
    newSocket = webConnection.newHttp(process.env.PORT, routes);


//link input tweet data to outbound sockets.
 newSocket(function(socketServer){
   newStream(keyword, function(data) {
       socketServer.emit('newTweet', data.text);
   });
});



