'use strict'
// Cargamos los modelos para usarlos posteriormente
var component = require('../controllers/component');
var ent = "user";
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
 socket.bind(host, function(){
     console.log("Conectado a la BBDD");
 });


module.exports.existsUser = function (req, res) 
{
   try{
      
        var username = req.params.username;
        
        var m = component.getStringifyMessage(ent, username, "", "get");
        socket.send([' ',m]);
        console.log("Enviando...: " + m);

        // Input messages
        socket.on("message", (_,message) => { 
            let mensaje = message.toString();
            var m2 = mensaje.toString();
            console.log("Recibiendo...: " + m2);

            if(m2 == "Failed"){
                res.send("ERR");
            }else{
                res.send("OK");
            }
            //socket.close();

            return;
        });

   }catch(e) {
    console.log("entering catch block");
    console.log(e);
   }
};

// lista de eventos que gestiona el usuario
module.exports.getList = function (req, res)
{

    var m = component.getStringifyMessage("list", "", "", "get");
    socket.send([' ',m]);

    // Input messages
    socket.on("message", (_,message) => { 
        let mensaje = message.toString();
        var m2 = mensaje.toString();
        console.log(m2);

        if(m2 == "Failed"){
            res.send("ERR");
        }else{
            var mm = JSON.stringify(m2);

            res.send(mm);
        }
        //devuelve JSON con la lista (puede estar vacía)
        // de eventos filtrada por (organizer === :username)
         // o ERR (si no existe usuario

        return;
    });

}

module.exports.addUser = function (req, res)
{

    var username = req.params.username;
    
    var m = component.getStringifyMessage(ent, username, "", "put");
    socket.send([' ',m]);

    // Input messages
    socket.on("message", (_,message) => { 
        let mensaje = message.toString();
        var m2 = mensaje.toString();
        console.log(m2);

        if(m2 == "Failed"){
            res.send("ERR");
        }else{
            res.send("OK");
        }

        return;
    });
}


