var Twit = require('twit');
var keys = require('./keys');

var T = new Twit({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token: keys.access_token,
    access_token_secret: keys.access_token_secret,
});

T.get('search/tweets', { q: 'hate since:2015-2-18', count:100}, function(err, data, response) {

  if (data === null) {
  	console.log("No Hate!");
  	return;
  }

  var hateCount = 0;

  for (var i=0; i<data.statuses.length; i++) {
  	hateCount += data.statuses[i].retweet_count;
  	hateCount += data.statuses[i].favorite_count;
  }

  console.log( "Hate Score: " + hateCount );

});

/*
var stream = T.stream('statuses/filter', { track: '#apple', language: 'en' })
 
stream.on('tweet', function (tweet) {
  console.log(tweet)
});
*/