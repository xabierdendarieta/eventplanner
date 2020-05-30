'use strict'
// Cargamos los modelos para usarlos posteriormente
var Event = require('../models/event');
var component = require('./component.js');
var ent = "event";


// Conseguir datos de un evento
function getEvent(req, res){
    var eventId = req.params.id;
    var m =  component.getStringifyMessage(ent, name, "", "get");
    return index.socket.send([' ',m]);
    //buscar un evento por un  id

}

function addEvent(id, name, description, datetime, organizer)
{

    var m = component.getEventDataInArgs(name, description, datetime, organizer);
    var m2 = component.getStringifyMessage(ent, id, args, "put");
    var data = index.socket.send([' ',m]);
    var mensaje = JSON.parse(data.toString());

    return mensaje['id'];
}

function removeEvent(){
    
}


/*function addUser(req, res){
    var eventId = req.params.id;
    var m =  component.getStringifyMessage(ent, name, "", "get");
    return index.socket.send([' ',m]);
    //buscar un evento por un  id
}*/


function addAssistant(req, res){
    var name = req.params.name;
    var m = component.getStringifyMessage(ent, res.name, "", "put");
    var result = index.socket.send([' ',m]);

    return result;
}

function removeAssistant(){
    
}

// Conseguir datos de un usuario
/*function getUser(req, res){
    var name = req.params.name;
    var m = component.getStringifyMessage(ent, res.name, "", "get");
    var result = index.socket.send([' ',m]);

    return JSON.stringify(result);
}
*/