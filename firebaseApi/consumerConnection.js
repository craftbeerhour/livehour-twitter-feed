var firebase = require("firebase");

function createNewConnection(firebase) {
     return function(firebaseAppUrl) {
       return new firebase(firebaseAppUrl);
     };
}


exports.connection = function(firebaseAppUrl)
{
    return createNewConnection(firebase)(firebaseAppUrl);
}