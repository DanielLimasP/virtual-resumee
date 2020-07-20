var socket;
var blob;
var id;
var blobs = []; // Arreglo para crear múltiples masas
var zoom = 1;

function setup(){
  createCanvas(windowWidth, windowHeight);
  //Creation of the websocket
  socket = io.connect('http://localhost:3000');
  //Char
  blob = new Blob(10, 0, 0);

  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r
  };

  socket.emit('start', data);

  socket.on('heartbeat',
    function(data){
      //console.log(data)
      blobs = data;
    });
}

function draw(){
  background(255);
  translate(width/2, height/2);
  var newzoom = 32/blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);
  blob.show();

  if(mouseIsPressed){
    blob.update();
  }

  blob.constrain();

  var data = {
    x: blob.pos.x,
    y: blob.pos.y,
    r: blob.r
  };

  socket.emit('update', data);

  //Función para crear nuevos blobs
  blob.multipleBlobs(blobs);
}
