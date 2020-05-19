'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var EventController = require('../controllers/evetnController');
// Llamamos al router
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get('/putevent/:name/:description/:datetime/:organizer', res, EventController.putEvent);
api.get('/event/:name', res, EventController.getEvent);
// Exportamos la configuración
module.exports = api;