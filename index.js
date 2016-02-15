var app = require("express")();
var express = require("express");

app.use(express.static(__dirname + '/public'));

var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function(req, res){
	res.sendfile("index.html");
});

var mySocket;

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var mySerial = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

mySerial.on("open", function () {
  //console.log("Porta Aberta.");
});


mySerial.on('button', function(data){
    console.log(data);
    //serialPort.write(data);
})

mySerial.on("data", function(data){
	io.emit("arduinoData", data);
});


io.on('client_data', function(data){
    console.log(data.letter);
});

io.on("connection", function(socket){
	console.log("connection");
});

io.on('disconnect', function () {
	console.log('user disconnected');
});

http.listen(80, function(){
	//console.log("O sorvidor esta")
});
