'use strict'

var index = require('./index.js');
var component = require('./component.js');
var ent = "auth";


function signin(req, res){

    var m = component.getStringifyMessage(ent, res.name, res.password, "post");

    return index.socket.send([' ',m]);

}

function login(req, res){
    var m = component.getStringifyMessage(ent, res.name, res.password, "post");

    return index.socket.send([' ',m]);
}