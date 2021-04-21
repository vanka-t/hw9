const Twit = require("Twit");
const config = require("./config.js");
var T = new Twit(config);

var SW = require("stopword");
var fs = require("fs");
const alphanumeric = /^[0-9a-zA-Z]+$/;

var bayes = require("bayes");
var classifier = bayes();

var trends = {
    "homemade": "food",
    "cook": "food",
    "frozen": "food",
    "healthy": "food",
    "fasting": "food",
    "keto": "food",
    "recipe": "food",
    "calories": "food",
    "vegan": "food",
    "vegetarian": "food",
    "yummy": "food",
    "sweet": "food",
    "sour": "food",

    "sequel": "movie",
    "watched": "movie",
    "film": "movie",
    "actress": "movie",
    "emma stone": "movie",
    "hollywood": "movie",
    "netflix": "movie",
    "hbo": "movie",
    "hulu": "movie",
    "tv show": "movie",
    "shrek": "movie",
    "rupaul": "movie",
    "oscars": "movie",
    "plot twist": "movie",
    "camera": "movie",
    "acting": "movie",
    "director": "movie",
    "golden globe": "movie",
    "blockbuster": "movie",
    "award winning": "movie",

    "BTS": "music",
    "Brandon Urie": "music",
    "Grammys": "music",
    "hit": "music",
    "iHeartAwards": "music",
    "band": "music",
    "song": "music",
    "pop": "music",
    "lyrics": "music",
    "guitar": "music",
    "piano": "music",
    "vocals": "music",
    "listened": "music",
    "microphone": "music",
    "singing": "music",
    "performance": "music",
    "performing": "music",

    "plant": "nature",
    "garden": "nature",
    "sky": "nature",
    "sea": "nature",
    "ocean": "nature",
    "forest": "nature",
    "sun": "nature",
    "sunny": "nature",
    "rain": "nature",
    "outside": "nature",
    "leaves": "nature",
    "leaf": "nature",
    "flower": "nature",
    "tree": "nature",

    "president": "politics",
    "debt": "politics",
    "trump": "politics",
    "voting": "politics",
    "george floyd": "politics",
    "bernie": "politics",
    "capitalism": "politics",
    "news": "politics",
    "socialism": "politics",
    "corrupt": "politics",
    "vaccine": "politics",
    "stock market": "politics",
    "war": "politics",
    "socialism": "politics",

    "dog": "animals",
    "pet": "animals",
    "fish": "animals",
    "baby": "animals",
    "petting": "animals",
    "meow": "animals",
    "bark": "animals",
    "cat": "animals",
    "housepet": "animals",
    "bird": "animals",
    "horse": "animals",
    "duck": "animals",
    "wolf": "animals",
    "turtle": "animals",
    "frog": "animals",
    "animal": "animals"
}

var index = 0; //this will keep track as to where we are on the loop
for (let [key, value] of Object.entries(trends)){
T.get('search/tweets', {q: key, count:100}, async function(error,data,response){
    try{ //"trying out" the code
        for(var i=0;i<data.statuses.length;i++){
            var temp_tweet = data.statuses[i].text;
            
           // console.log(temp_text);
            var cleaned_up_words = cleanup(temp_tweet);
           // var final_words = cleaned_up_words.join(", ");
            await classifier.learn(cleaned_up_words, value);//value);
        }
        index++;
        if(index ==92){//number of values u have on the object (eg.bts, mcgregor, etc)
            
            var try_it = "he won the game";
            try_it.split(" ").join(", ");
            var try_it2 = "that shit was bussin bussin big hit radio best artist";
            try_it2.split(" ").join(", ");
            console.log(await classifier.categorize(try_it));
            //console.log(await classifier.categorize(try_it2));
            var stateJson = classifier.toJson();
            fs.writeFile("./classifier.json", stateJson, function(error,data){
                if(error){
                    console.log(error + "awoooooga!!!!!!!!!");
                }else {
                    console.log("ur super cool!!");
                }
            })
            //false.writeFile("./");
        }
    } catch(error){
        console.log(error);
    }
});
}




function cleanup(tweet){
    //splits up tweet into individ words
    var temp_split_tweet = tweet.split(" ");
   // const;
    //stores the words we want
    var temp_new_words = [];
    temp_split_tweet = SW.removeStopwords(temp_split_tweet);

    for (var i=0;i<temp_split_tweet.length; i++){
        //test if word only contains  letters/numbers
        if(alphanumeric.test(temp_split_tweet[i]) && temp_split_tweet[i].length>2) { //">2" FOR TWEETS ONLY
            temp_new_words.push(temp_split_tweet[i].toLowerCase());
        }
    }
    //get rid of any duplicate words
    // ... = spread operator
    var uniq = [...new Set(temp_new_words)];
    var final_words = uniq.join(", ");
    return final_words;
}