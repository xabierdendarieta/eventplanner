'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Cargamos el controlador
var UserController = require('../controllers/userController');
// Llamamos al router
var router = express.Router();
// Creamos una ruta para los métodos que tenemos en nuestros controladores
router.get('/user/:username', UserController.existsUser); // Busca si existe el usuario
router.get('/list/:username', UserController.getList); // 

router.post('/add/user/', UserController.addUser); // Signin

// Exportamos la configuración
module.exports = router;
