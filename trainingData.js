const Twit = require("Twit");
const config = require("./config.js");
var T = new Twit(config);

var SW = require("stopword");
var fs = require("fs");
const alphanumeric = /^[0-9a-zA-Z]+$/;

var bayes = require("bayes");
var classifier = bayes();

var trends = {
    "McGregor": "sports",
    "Matsuyama": "sports",
    "Scott Laughton": "sports",
    "BTS": "music",
    "Brandon Urie": "music",
    "iHeartAwards": "music"

}

var index = 0; //this will keep track as to where we are on the loop
for (var [key,value] of Object.entries(trends)){
T.get('search/tweets', {q: key, count:100}, async function(error,data,response){
    try { //"trying out" the code
        for(var i=0;i<data.statuses.length;i++){
            var temp_text = data.statuses[i].text;
           // console.log(temp_text);
            var cleaned_up_words = cleanup(temp_tweet);
            var final_words = cleaned_up_words.join(", ");
            await classifier.learn(final_words, value);
        }
        index++;
        if(index ==6){//number of values u have on the object (eg.bts, mcgregor, etc)
            
            var try_it = "he won the game";
            try_it = try_it.split(" ").join(", ");
            var try_it2 = "that shit was bussin bussin big hit radio best artist";
            try_it2 = try_it2.split(" ").join(", ");
            console.log(await classifier.categorize(try_it));
            console.log(await classifier.categorize(try_it2));
            var stateJson = classifier.toJson();
            false.writeFile("./");

        }
    } catch(error){
        console.log(error);
    }
});
}


function cleanup(tweet){
    //splits up tweet into individ words
    var temp_split_tweet = tweet.split("");
    const;
    //stores the words we want
    var temp_new_words = [];
    temp_split_tweet = SW.removeStopwords(temp_split_tweet);
    for (var i=0;i<temp_split_tweet; i++){
        //test if word only contains  letters/numbers
        if(alphanumeric.test(temp_split_tweet[i]) && temp_split_tweet[i].length>2) {
        temp_new_words.push(temp_split_tweet[i].toLowerCase());
        }
    }
    //get rid of any duplicate words
    // ... = spread operator
    var uniq = [...new Set(temp_new_words)];
    return temp_new_words;
}