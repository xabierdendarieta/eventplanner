'use strict'

var index = require('./index.js');
var component = require('./component.js');
var ent = "auth";


function signin(req, res){

    //var m = component.getStringifyMessage(ent, res.name, res.password, "post");

    return true; //index.socket.send([' ',m]);

}

function login(req, res){
    // Obtener los usuarios y comprobar la contraseña aquí
    var pass = res.password;

    var m = component.getStringifyMessage(ent, res.name, "", "get");

    var result = index.socket.send([' ',m]);
    if(typeof result === "string" ){
        return true;
    }

    return false;
}