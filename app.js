var Twit = require('twit');
var keys = require('./keys');
var vocabulary = require('./vocabulary');

var T = new Twit({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token: keys.access_token,
    access_token_secret: keys.access_token_secret,
});

var loveCount = 0;
var hateCount = 0;
var positiveVocabulary = vocabulary.positiveVocabulary;
var negativeVocabulary = vocabulary.negativeVocabulary;
var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ];
var loveStream = T.stream('statuses/filter', { track: positiveVocabulary, language: 'en'});
var hateStream = T.stream('statuses/filter', { track: negativeVocabulary, language: 'en'});

loveStream.on('tweet', function (tweet) {
  loveCount++;
});

hateStream.on('tweet', function (tweet) {
  hateCount++;
});

var myTimeout = setTimeout(function() {

	loveStream.stop();
	hateStream.stop();


	console.log("Love: " + loveCount);
	console.log("Hate: " + hateCount);

	if (loveCount > hateCount) {
		console.log("L'amore vince sempre'");
	} else {
		console.log("Odio. O dio.");
	}

}, 15000);