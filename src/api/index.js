// Utilizar funcionalidades del Ecmascript 6
'use strict'
// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
// var zmq = require('zeromq');
//const database = require('./bbdd/database');

// *Cargamos el fichero app.js con la configuración de Express
var app = require('./app');



// Creamos la variable PORT para indicar el puerto en el que va a funcionar el servidor
var portApi = 3000;
 

// Cuando se realiza la conexión, lanzamos este mensaje por consola
///console.log("La conexión a la base de datos curso_mean_social se ha realizado correctamente");
  
// CREAR EL SERVIDOR WEB CON NODEJS
app.listen(portApi, () => {
    console.log("El servidor está inicializado en el puerto "+ portApi);
});