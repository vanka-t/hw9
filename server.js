const bayes = require("bayes");
const  SW = require("stopword");
const fs = require("fs");

//express application
const express = require("express");
var app = express();

var server = app.listen(3000);

app.use(express.static("public"));
var awesomeClassifier;
const alphanumeric = /^[0-9a-zA-Z]+$/;

fs.readFile("./classifier.json", downloadedFile);
function downloadedFile(error,data){
        if(error){
            console.log(error);
        } else {
            awesomeClassifier = bayes.fromJson(data);
            io.sockets.on("connection", newConnection);
            console.log("yaaay");
        }

 }

var socket = require("socket.io");
var io = socket(server);



function newConnection(socket){
    console.log("new connection" + socket.id);
    
    socket.on("guess", guessMsg);

    async function guessMsg(data){
       // "hey babey what's up"
       ml_ready_data = cleanup(data);

       var category = await awesomeClassifier.categorize(ml_ready_data);
       socket.emit("guess",category);
    }                                                                                                                                                                                                                                                                                                                                                                                                                                       
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