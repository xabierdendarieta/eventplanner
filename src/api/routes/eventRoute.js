'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var EventController = require('../controllers/evetnController');
// Llamamos al router
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
//// Creamos una ruta para los métodos que tenemos en nuestros controladores

api.get('/event/:eventid', EventController.getEvent); // Devuelve la info del evento
api.post('/add/event', EventController.addEvent); // Crea el evento
api.post('/remove/event', EventController.removeEvent); // Borra el evento

api.post('/add/assistant', EventController.addAssistant); 
api.post('/remove/assistant', EventController.removeAssistant); 

// Exportamos la configuración
module.exports = api;