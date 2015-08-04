var consumerConnection = require("./firebaseApi/consumerConnection.js"),
    webConnection = require("./webInterface/httpConnection.js"),
    twitterApi = require("./twitterApi/streamConnection.js"),
    firebaseRepository = consumerConnection.connection(process.env.FIREBASE_API_URL),
    routes = [
          { path: '/', callBack: function(req, res){ res.sendFile(__dirname + '/webInterface/htmlTemplates/index.html'); }},
          { path: '/count', callBack: function(req, res){ res.sendFile(__dirname + '/webInterface/htmlTemplates/count.html'); }}
          ],
    twitterConnectionDetails = {
        consumer_key: process.env.TWIT_CONSUMER_KEY,
        consumer_secret: process.env.TWIT_CONSUMER_SEC,
        access_token_key: process.env.TWIT_ACCESS_KEY,
        access_token_secret: process.env.TWIT_ACCESS_SEC
    },
    newSocket = webConnection.newHttp(process.env.PORT, routes),
    firebaseConnection = consumerConnection.connection(process.env.FIREBASE_API_URL),
    tweetRepository = firebaseConnection.child('tweets'),
    twitterStream = twitterApi.stream(twitterConnectionDetails),
    keyword = '#craftbeerhour';


//link input tweet data to outbound sockets.
 newSocket(function(socketServer){
   twitterStream(keyword, function(data) {
       socketServer.emit('newTweet', data);
       tweetRepository.push(data);
   });
});



