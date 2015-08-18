
function getFilteredStream(filterTweetData) {
    return function(tweet) {
        return filterTweetData(tweet);
    };
}


function filterTweetData() {
    return function(rawTweet) {
        return {
            text: rawTweet.text,
            isRetweet:'',
            userImage:'',
            images:[{},{}],
            userName: '',
            userHandle:''
        }
    }
}

module.exports = function(TwitterStream, SocketConnection) {
    
}