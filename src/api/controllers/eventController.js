'use strict'
// Cargamos los modelos para usarlos posteriormente
var Event = require('../models/event');
var component = require('./component.js');
var ent = "event";

// Conseguir datos de un usuario
function getEvent(req, res){
    var eventId = req.params.id;
    var m =  component.getStringifyMessage(ent, name, "", "get");
    return index.socket.send([' ',m]);
    //buscar un evento por un  id

}

function addUser(req, res){
    var eventId = req.params.id;
    var m =  component.getStringifyMessage(ent, name, "", "get");
    return index.socket.send([' ',m]);
    //buscar un evento por un  id
}
