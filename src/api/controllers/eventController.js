'use strict'
// Cargamos los modelos para usarlos posteriormente
var component = require('../controllers/component');
var ent = "event";

// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
var zmq = require('zeromq');
var ident = 'ident';
var socket = zmq.socket("dealer");
socket.identity = ident;
// Creamos la variable PORT para indicar el puerto en el que va a funcionar el servidor
var portDB = "1234";
var ipDB = "127.0.0.1"
var host = "tcp://" + ipDB + ":" + portDB; 
// Connect to the server instance.
socket.bind(host);

// Conseguir datos de un evento
module.exports.getEvent = function (req, res){
    var eventId = req.params.id;
    
    var m = component.getStringifyMessage(ent, eventId, "", "get");
    socket.send([' ',m]);
    console.log("Enviando... = " + m);

    // Input messages
    socket.on("message", (_,message) => { 
        let mensaje = message.toString();
        var m2 = mensaje.toString();

        if(m2 == "Failed"){
            res.send("ERR EVENT");
        }else{

            res.send("OK EVENT");
        }

        return;
    });
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