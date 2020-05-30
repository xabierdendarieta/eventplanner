'use strict'
// Cargamos los modelos para usarlos posteriormente
var component = require('./component.js');
var ent = "user";

module.exports.existsUser = function (req, res) {
    res.send("OK");

};

// lista de eventos que gestiona el usuario
module.exports.getList = function (req, res){
    var name = req.params.name;
    // Buscar los eventos por u
    var m = component.getStringifyMessage(ent, name, "", "get");
    //return index.socket.send([' ',m]);
    res.send("OK");

}

module.exports.addUser = function (req, res){
    res.send("OK");
}


