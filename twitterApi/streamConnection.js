var Twitter = require('twitter');

function newTwitterClient(Twitter) {
    return function(pubKey, secKey, accessToken, accessSec) {
        return new Twitter({
            consumer_key: pubKey,
            consumer_secret: secKey,
            access_token_key: accessToken,
            access_token_secret: accessSec
        });
    };
}

function newStream(client) {
    return function(keyword, outputCallback) {
        client.stream(
            'statuses/filter',
            {track: keyword},
            function(stream) {
                stream.on('data', function(data){
                    if(data.text){
                        outputCallback(data);
                    }
                });
                
                stream.on('error', function(error){
                    console.log('broken stream: ', error);
                });
                
                stream.on('end', function(response){
                    console.log('stream ended');
                    console.log(stream.buffer);
                });
                
            });
    };
}

exports.stream = function(connDetails) {
    
    var getClient = newTwitterClient(Twitter),
        getStream = newStream(getClient(
            connDetails.consumer_key,
            connDetails.consumer_secret,
            connDetails.access_token_key,
            connDetails.access_token_secret
            ));
    return getStream;
}