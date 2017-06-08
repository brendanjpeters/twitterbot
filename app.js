// app.js

var Twitter = require('twitter');  
var config = require('./config.js');

var T = new Twitter(config);


// Set up your search parameters
var params = {
  q: '#cantstopwontstop',
  count: 20,
  result_type: 'recent',
  lang: 'en'
}

T.get('search/tweets', params, function(err, data, reponse){
	'use strict';
	if(!err){
		//thisis where we will put stuff
		//looping through tweets
		for(let i = 0; i<data.statuses.length; i++){
			// get tweet ID from returned data
			let id = {id: data.statuses[i].id_str}
			console.log(id);
			//favorite that shit
			T.post('favorites/create', id, function(err, response){
				'use strict';
				console.log(response);
				if(err){
					console.log(err[0].message);
				} else {
					let username = response.user.screen_name;
					let tweetId = response.id_str;
					console.log('Favorited: ', 'https://twitter.com/${username}/status/${tweetId}')
				}
			});
		}
	} else {
		console.log(err);
	}
})