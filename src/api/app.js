// Cargamos los módulos de express y body-parser
var express = require('express');
var bodyParser = require('body-parser');
// Llamamos a express para poder crear el servidor
var app = express();
// Importamos las rutas
var user_routes = require('./routes/userRoute'); 
var event_routes = require('./routes/eventRoute'); 
//cargar middlewares
//un metodo que se ejecuta antes que llegue a un controlador
//Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Cargamos las rutas
app.use('/api', user_routes);
app.use('/api', event_routes);
// exportamos este módulo para poder usar la variable app fuera de este archivo
module.exports = app;


