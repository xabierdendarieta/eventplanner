// Utilizar funcionalidades del Ecmascript 6
'use strict'
// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
var zmq = require('zmq');
// *Cargamos el fichero app.js con la configuración de Express
var app = require('./app');

// Connection
var socket = zmq.socket("pull");

// Creamos la variable PORT para indicar el puerto en el que va a funcionar el servidor
var portDB = 1234;
var portApi = 3000;

// Connect to the server instance.
socket.connect('tcp://127.0.0.1:'+ portDB, function(){
        // Cuando se realiza la conexión, lanzamos este mensaje por consola
        console.log("La conexión a la base de datos curso_mean_social se ha realizado correctamente")
    
        // CREAR EL SERVIDOR WEB CON NODEJS
        app.listen(portApi, () => {
            console.log("El servidor está inicializado en el puerto "+ portApi);
        });
})