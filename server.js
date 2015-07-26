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
          ];
          
          
   var   newWebConn = webConnection.newHttp(
          process.env.PORT,
          function(socket){ 
              socket.broadcast.emit('hi');
              
          });
      
      
/*
newStream(keyword, function(data){
    console.log('\n',data.text);
});
*/

newWebConn(routes, function(){
    console.log('connected!!');
})



