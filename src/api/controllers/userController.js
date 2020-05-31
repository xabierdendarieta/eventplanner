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
socket.bind(host);


module.exports.existsUser = function (req, res) 
{


    //var username = ;
    
   // var m = component.getStringifyMessage(ent, "Paul", "", "put");
    //console.log("Enviando 1...: " + m);
   // socket.send([' ',m]);

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

   }catch{

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
            res.send("OK");
        }

        return;
    });

}

module.exports.addUser = function (req, res)
{

    var username = "Paul";
    
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


