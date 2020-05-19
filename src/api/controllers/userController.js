'use strict'
// Cargamos los modelos para usarlos posteriormente
var User = require('../models/user');
var component = require('./component.js');
var ent = "user";

// Conseguir datos de un usuario
function getUser(req, res){
    var name = req.params.name;
    var m = component.getStringifyMessage(ent, res.name, "", "get");
    var result = index.socket.send([' ',m]);

    return JSON.stringify(result);
}

// lista de eventos que gestiona el usuario
function getList(req, res){
    var name = req.params.name;
    // Buscar los eventos por u
    var m = component.getStringifyMessage(ent, name, "", "get");
    return index.socket.send([' ',m]);
}
