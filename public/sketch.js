var chatInput;
var chatButton;
var machineText;
function setup() {
  createCanvas(400, 400);
  //input
  chatInput = createInput("Chat with me bb!");
  chatInput.position(0,0);
  chatInput.size(100);

  //button
  chatButton = createButton("Enter");
  chatButton.mousePressed(enteredChat);

  machineText = createP();

  socket = io.connect("http://localhost:3000");
  socket.on("guess",makeaGuess);
}
function enteredChat(){
var chatText = chatInput.value();

socket.emit("guess",chatText);
}

function makeaGuess(data){
machineText.html(data);                                                                                                                                                                                                                                                                                                                                                                               
}

function draw() {
  background(220);
}
