'use strict'
// Cargamos los modelos para usarlos posteriormente
var User = require('../models/user');
var component = require('./component.js');
var ent = "user";


function existsUser(req, res) {
    res.send("OK");

};

// lista de eventos que gestiona el usuario
function getList(req, res){
    var name = req.params.name;
    // Buscar los eventos por u
    var m = component.getStringifyMessage(ent, name, "", "get");
    //return index.socket.send([' ',m]);
    res.send("OK");

}

function addUser(req, res){
    res.send("OK");
}


