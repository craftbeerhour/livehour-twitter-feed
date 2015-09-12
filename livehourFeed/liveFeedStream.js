
function getFilteredStream(filterTweetData, socketConnection, channel) {
    return function(tweet) {
        socketConnection.emit(channel, filterTweetData(tweet));
    };
}


function filterTweetData() {
    return function(rawTweet) {
        return {
            text: rawTweet.text,
            isRetweet:rawTweet.hasOwnProperty('retweeted_status'),
            userProfileImageUrl:rawTweet.user.profile_image_url,
            images:[],
            links:[],
            userName: rawTweet.user.name,
            userHandle:rawTweet.user.screen_name
        }
    }
}

exports.filter = function(socketConnection, channel) {
    
    return getFilteredStream(
        filterTweetData(),
        socketConnection,
        channel
    );
}