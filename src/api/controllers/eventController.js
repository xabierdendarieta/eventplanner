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
    
    var eventId = req.params.eventid;
    
    var m = component.getStringifyMessage(ent, eventId, "", "get");
    socket.send([' ',m]);
    console.log("Enviando event... = " + m);

    // Input messages
    socket.on("message", (_,message) => { 
        let mensaje = message.toString();
        var m2 = mensaje.toString();

        if(m2 == "Failed"){
            res.send("ERR");
        }else{
            var mm = JSON.stringify(m2);
            res.send(mm);
        }

        return;
    });
}

module.exports.addEvent = function (req, res)
{
    var id;
    var name = req.params.name;
    var description = req.params.description;
    var datetime = req.params.datetime;
    var organizer = req.params.organizer;

    var m = component.getEventDataInArgs(name, description, datetime, organizer);
    var m2 = component.getStringifyMessage(ent, id, m, "put");
    console.log("MM= " + m2);

    // Input messages
    socket.on("message", (_,message) => { 
        let mensaje = message.toString();
        var m2 = mensaje.toString();

        if(m2 == "Failed"){
            res.send("ERR");
        }else{
            var mm = JSON.stringify(m2);
            res.send(mm);
        }

        return;
    });
}

module.exports.removeEvent = function (req, res){
    var id = res.param.eventid;
    
    var m2 = component.getStringifyMessage(ent, id, "", "remove");
    console.log("MM= " + m2);

    // Input messages
    socket.on("message", (_,message) => { 
        let mensaje = message.toString();
        var m2 = mensaje.toString();

        if(m2 == "Failed"){
            res.send("ERR");
        }else{
            res.send("OK");
        }

        return;
    });
}

module.exports.addAssistant = function (req, res)
{
    var username = res.para.username;
    var id = res.param.eventid;
    
    var m2 = component.getStringifyMessage(ent, username, id, "put");
    console.log("MM= " + m2);

    // Input messages
    socket.on("message", (_,message) => { 
        let mensaje = message.toString();
        var m2 = mensaje.toString();

        if(m2 == "Failed"){
            res.send("ERR");
        }else{
            res.send("OK");
        }

        return;
    });
}

module.exports.removeAssistant = function (req, res)
{
    
}