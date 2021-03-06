require('dotenv').config({silent:true});

var consumerConnection = require("./firebaseApi/consumerConnection.js"),
    webConnection = require("./webInterface/httpConnection.js"),
    twitterApi = require("./twitterApi/streamConnection.js"),
    filterStream = require("./livehourFeed/liveFeedStream.js"),
    routes = [
          { path: '/', callBack: function(req, res){ res.sendFile(__dirname + '/webInterface/htmlTemplates/index.html'); }},
          { path: '/count', callBack: function(req, res){ res.sendFile(__dirname + '/webInterface/htmlTemplates/count.html'); }},
          { path: '/feed', callBack: function(req, res){ res.sendFile(__dirname + '/webInterface/htmlTemplates/livefeed.html'); }},
          { path: '/timeline', callBack: function(req, res){ res.sendFile(__dirname + '/webInterface/htmlTemplates/timeline.html'); }}
          
          ],
    twitterConnectionDetails = {
        consumer_key: process.env.TWIT_CONSUMER_KEY,
        consumer_secret: process.env.TWIT_CONSUMER_SEC,
        access_token_key: process.env.TWIT_ACCESS_KEY,
        access_token_secret: process.env.TWIT_ACCESS_SEC
    },
    newSocket = webConnection.newHttp(process.env.PORT, routes),
    firebaseConnection = consumerConnection.connection(process.env.FIREBASE_API_URL),
    tweetRepository = firebaseConnection.child('xfactor-test-tweets'),
    twitterStream = twitterApi.stream(twitterConnectionDetails),
    keyword = '#craftbeerhour',
    channel = 'newTweet';


//link input tweet data to outbound listening sockets.

newSocket(function(socketServer){
    twitterStream(
        keyword,
        filterStream.filter(socketServer, channel)
        );
});


//todo pipe tweet data to firebase





