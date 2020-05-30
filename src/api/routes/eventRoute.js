'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var EventController = require('../controllers/eventController');
// Llamamos al router
var router = express.Router();
//// Creamos una ruta para los métodos que tenemos en nuestros controladores

router.get('/event/:eventid', EventController.getEvent); // Devuelve la info del evento
router.post('/add/event', EventController.addEvent); // Crea el evento
router.post('/remove/event', EventController.removeEvent); // Borra el evento

router.post('/add/assistant', EventController.addAssistant); 
router.post('/remove/assistant', EventController.removeAssistant); 

// Exportamos la configuración
module.exports = router;