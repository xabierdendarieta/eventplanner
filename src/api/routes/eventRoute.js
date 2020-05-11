'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var EventController = require('../controllers/evetnController');
// Llamamos al router
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get('/event/:name', md_auth.ensureAuth, EventController.getEvent);
// Exportamos la configuración
module.exports = api;