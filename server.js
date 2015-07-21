var streamConnection = require("./twitterApi/streamConnection.js"),
    keyword = '#craftbeerhour',
      connectionDetails = {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret: process.env.TWITTER_ACCESS_SECRET
      },
      newStream = streamConnection.stream(connectionDetails);
      
newStream(keyword, function(data){
    console.log('\n',data.text);
});
      


