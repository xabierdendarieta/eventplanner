'use strict'
// Cargamos los modelos para usarlos posteriormente
var User = require('../models/user');

// Conseguir datos de un usuario
function getUser(req, res){
    var name = req.params.name;
    //buscar un documento por un  id
    /*User.findById(userId, (err, user) => {
        if(err)return res.status(500).send({message: 'Error en la petición'});
        if(!user) return res.status(404).send({message: 'EL usuario no existe'});
        followThisUser(req.user.sub, userId).then((value) => {
            user.password = undefined;
            return res.status(200).send({
                user,
                following: value.following,
                followed: value.followed
            });
        });
        
    });*/
}

// lista de eventos que gestiona el usuario
function getList(req, res){
    var name = req.params.name;
    // Buscar los eventos por u

}
