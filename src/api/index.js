// Utilizar funcionalidades del Ecmascript 6
'use strict'
// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
//var zmq = require('zmq');
//const database = require('./database');

// *Cargamos el fichero app.js con la configuración de Express
var app = require('./app');

// Connection
//var ident = 'ident';
//var socket = zmq.socket("dealer");

// Creamos la variable PORT para indicar el puerto en el que va a funcionar el servidor
var portDB = "1234";
var ipDB = "127.0.0.1"
var portApi = 3000;


var host = "tcp://" + ipDB + ":" + portDB; 
//socket.identity = ident;

// Connect to the server instance.
/*socket.bind(host, function(){
        module.exports = socket;
        // Cuando se realiza la conexión, lanzamos este mensaje por consola
        console.log("La conexión a la base de datos curso_mean_social se ha realizado correctamente");
    
        // CREAR EL SERVIDOR WEB CON NODEJS
        app.listen(portApi, () => {
            console.log("El servidor está inicializado en el puerto "+ portApi);
        });
});*/

//module.exports = socket;
// Cuando se realiza la conexión, lanzamos este mensaje por consola
console.log("La conexión a la base de datos curso_mean_social se ha realizado correctamente");

// CREAR EL SERVIDOR WEB CON NODEJS
app.listen(portApi, () => {
    console.log("El servidor está inicializado en el puerto "+ portApi);
});