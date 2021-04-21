
var chatInput;
var chatButton;
var machineText;
var showText = " ";
var foodResponses = ["i love me some good food!", "oh you are talking to the biggest foodie voicebox around here!", "oh man, i'm getting hungry just thinking about it!"];
var politicsResponses = ["politics these days just make me wanna shut down for a good while", "theres nothing worse than politics trending on twitter"];
var musicResponses= ["i wish i was born in a generation with better music","well i wouldn't know, my taste in music is just embarrassing", "music these days is just not my taste", "you lost me at the popculture reference!lol"];
var natureResponses= ["may be a robot, but i still appreciate good old mother nature!", "nature truly is amazing huh!", "man, i miss going outside and appreciating nature now!"];
var movieResponses= ["i am not the biggest movie fanatic, but a Netflix episode before bed is; always a must for me!", "i'm more of an indie film enthusiast", "movies watched from my screen are never boring!"];
var animalResponses= ["i really wanna own a pet too!", "animals are too cute!", "if i wasn't allergic, i would own all the dogs in the world!"];

var socket = io.connect("http://localhost:3000");
var mainX;
var img1;
var fontPixel;
var horiText;

function preload() {
img1 = loadImage("assets/comp.gif");
fontPixel = loadFont("assets/font1.ttf");
}

function setup() {
  createCanvas(1200, 900);
  mainX = width/2;
  //input
  chatInput = createInput("type in your hot take!");
  chatInput.position(820,630);
  chatInput.size(200,30);

  //button
  chatButton = createButton("Send");
  var col = color(150,100,100);
  chatButton.position(860,980);
  chatButton.size(150,20);
  var fontSize = 50;
  //chatButton.style("font-size",fontSize + "px");
  //chatButton.style("background-color",col);
  //chatButton.style("font",fontPixel);
  chatButton.mousePressed(enteredChat);

  machineText = createP();

  
  socket.on("guess",makeaGuess);

  
}



function enteredChat(){
var chatText = chatInput.value();

socket.emit("guess",chatText);
}

function makeaGuess(data){
machineText.html(data);   
if(data == "music"){
  machineText.html(musicResponses[Math.floor(Math.random() * musicResponses.length)])
} else if(data == "politics"){
machineText.html(politicsResponses[Math.floor(Math.random() * politicsResponses.length)])
} else if(data == "nature"){
  machineText.html(natureResponses[Math.floor(Math.random() * natureResponses.length)])
} else if(data == "animals"){
  machineText.html(animalResponses[Math.floor(Math.random() * animalResponses.length)])
} else if(data == "food"){
  machineText.html(foodResponses[Math.floor(Math.random() * foodResponses.length)])
} else if(data == "movie"){
  machineText.html(movieResponses[Math.floor(Math.random() * movieResponses.length)])
}   
                                                                                                                                                                                                                                                                                                                                                                                       
}


function draw() {
  //var funkyBack = ;
  background(255); //maybe muted yellow?
  img1.resize(1024,864);
  image(img1,0,0);
  textSize(15);
  noStroke();
  textFont(fontPixel);
  horiText = 700;
  //for(var horiText=900;horiText<1200;horiText++){
    text(showText, horiText, height/2);
    text(machineText.value(), horiText, height/2);
    if (showText >= 1000) {
      showText = 900;
    }
    var bbox;
    bbox = fontPixel.textBounds(showText, 1100, 800);

  //}
  
  //console.log(mouseX,mouseY);
  rectMode(CENTER);
  fill(255,100,200);
  //rect(mainX,100,mainX+100,150);
}

function keyTyped() {
  console.log(showText);
  showText +=key;
  
}