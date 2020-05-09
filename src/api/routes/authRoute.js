'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var UserController = require('../controllers/userController');
// Llamamos al router
var api = express.Router();
//var md_auth = require('../middlewares/authenticated');
// Creamos una ruta para los métodos que tenemos en nuestros controladores
api.get('/login/:name/:password', req, UserController.getUser);
api.get('/signin/:name/:password', req, UserController.getList);
// Exportamos la configuración
module.exports = api;
