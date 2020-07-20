//Crearemos un arreglo con todos los blobs que entren al servers
var blobs = [];
function Blob(id, x, y, r){
  this.x = x;
  this.y = y;
  this.id = id;
  this.r = r;
}

// --------------> Aquí empieza el código funcional
//Uso de la librería Express para crear el server en LH:3000
var server = ExpressObject(3000, 'express', 'public');
//Uso de los websockets para algo
var sock = new SocketObject('socket.io', server);
sock.listening();
sock.setInter();
// --------------> Aquí se termina




// Función para crear el server
function ExpressObject(port, environment, folder ){
  var express = require(environment); //environment = express, folder = public
  var app = express(); // Express Mumbo Jumbo para crear el server
  var server = app.listen(port); // Creación de un servidor local en el puerto 3000
  app.use(express.static(folder)); //Uso de los recursos en la carpeta public
  console.log("---> Socket server running at localhost: "+port+ " <---"); //Simple console.log
  return server;
}
// Función o clase o constructor o lo que sea que crea el objeto SocketObject (o websockets)
function SocketObject(env, server){
  this.env = env;
  this.server = server;
  var socket = require(this.env);//'socket.io'
  var io = socket(this.server);//server

  this.heartbeat = function(){
    io.sockets.emit('heartbeat', blobs);
  }

  this.setInter = function(){
    setInterval(this.heartbeat, 30);
  }

  this.listening = function(){
    //En teoría, el objeto de la clase SocketObj que llame a esta función, estará escuchando
    //los diferentes mensajes mientras dure la conexión
    //Conexión al websocket
    //Al conectarse un nuevo cliente, se ejecutará la función anónima que manejará
    //todos los eventos en el servidor.
    io.sockets.on('connection',
      function(socket){
        //Función anónima que se ejecutará cuando al server le llegue un mensaje 'start'
        socket.on('start',
          function(data){
            console.log("New connection: " + socket.id + " " + data.x + " " + data.y + " " + data.r);
            //Se crea un nuevo blob al conectarse al server
            var blob = new Blob(socket.id, data.x, data.y, data.r);
            blobs.push(blob);
          }
        ); //Cuando le llegue el mensaje start al servidor, ejecutamos la función anónima con el parámetro data
        //Lo mismo de arriba pero con el mensaje update
        socket.on('update',
          function(data){
            var blob;
            for(var i = 0; i < blobs.length; i++){
              if(socket.id == blobs[i].id){
                blob = blobs[i];
              }
            }
            blob.x = data.x;
            blob.y = data.y;
            blob.r = data.r;
          }
        );
      }
    );
  }
}
