'use strict'
// Cargamos los modelos para usarlos posteriormente
var component = require('./component.js');
var ent = "event";


// Conseguir datos de un evento
module.exports.getEvent = function (req, res){
    var eventId = req.params.id;
    var m =  component.getStringifyMessage(ent, name, "", "get");
    //return index.socket.send([' ',m]);
    //buscar un evento por un  id
    res.send("OK");
}

module.exports.addEvent = function (req, res)
{
    var id, name, description, datetime, organizer;

    var m = component.getEventDataInArgs(name, description, datetime, organizer);
    var m2 = component.getStringifyMessage(ent, id, args, "put");
    var data = index.socket.send([' ',m]);
    var mensaje = JSON.parse(data.toString());

    //return mensaje['id'];
    res.send("OK");
}

module.exports.removeEvent = function (req, res){
    res.send("OK");

}

module.exports.addAssistant = function (req, res)
{
    var name = req.params.name;
    var m = component.getStringifyMessage(ent, res.name, "", "put");
    var result = index.socket.send([' ',m]);

    return result;
}

module.exports.removeAssistant = function (req, res)
{
    
}

// Conseguir datos de un usuario
/*function getUser(req, res){
    var name = req.params.name;
    var m = component.getStringifyMessage(ent, res.name, "", "get");
    var result = index.socket.send([' ',m]);

    return JSON.stringify(result);
}
*/