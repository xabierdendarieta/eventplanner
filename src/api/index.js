const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Variables
let usuario = {
 nombre:'',
 apellido: ''
};
let respuesta = {
 error: false,
 codigo: 200,
 mensaje: ''
};


app.get('/', function(req, res) {
    respuesta = {
     error: true,
     codigo: 200,
     mensaje: 'Punto de inicio'
    };
    res.send(respuesta);
   });

   // /List : Le pasas los argumentos:
   app.route('/event/:id')
   .get(function (req, res){

    if(req.params.id == 1){
        evento= {
            id_evento: 1,
            nombre: "Cine Morea",
            descripcion: "Ver pelícuala Spiderman-3",
            Fecha: "30/04/2020 15:00",
            n_asistentes: 2,
            asistentes: [
                usuario= {
                    idusuario:45,
                    nombre:"Juan"
                },
                usuario= {
                    idusuario:45,
                    nombre:"Jorge"
                }
            ]
        }

    }else if(req.params.id == 4){
        evento= {
            id_evento: 4,
            nombre: "Cen antiguos alumnos Informática",
            descripcion: "",
            Fecha: "25/04/2020 22:00",
            n_asistentes: 0,
            asistentes :[]
        }
    }else if(req.params.id == 16){
        evento= {
            id_evento: 16,
            nombre: "Partido fútbol",
            descripcion: "Partido de fútbol entre amigos",
            Fecha: "30/04/2020 157:00",
            n_asistentes: 1,
            asistentes : [
                usuario= {
                    idusuario:100,
                    nombre:"Rosa"
                }
            
            ]
        }
    }
    

    res.send(evento); //res.json(respuesta);

   });


   app.route('/list')
   .get(function (req, res){

        respuesta = {
            idusuario:15,
            usuario: "Pepe",
            eventos: [
                evento= {
                    id_evento: 1,
                    nombre: "Cine Morea",
                    descripcion: "Ver pelícuala Spiderman-3",
                    Fecha: "30/04/2020 15:00",
                    n_asistentes: 2
            
                }, 
                evento= {
                    id_evento: 4,
                    nombre: "Cen antiguos alumnos Informática",
                    descripcion: "",
                    Fecha: "25/04/2020 22:00",
                    n_asistentes: 0
                  
                }, 
                evento= {
                    id_evento: 16,
                    nombre: "Partido fútbol",
                    descripcion: "Partido de fútbol entre amigos",
                    Fecha: "30/04/2020 157:00",
                    n_asistentes: 1
                  
                }
            ]
        }

        res.send(respuesta); //res.json(respuesta);

   });

   app.route('/usuario')
    .get(function (req, res) {
     respuesta = {
      error: false,
      codigo: 200,
      mensaje: ''
     };
     if(usuario.nombre === '' || usuario.apellido === '') {
      respuesta = {
       error: true,
       codigo: 501,
       mensaje: 'El usuario no ha sido creado'
      };
     } else {
      respuesta = {
       error: false,
       codigo: 200,
       mensaje: 'respuesta del usuario',
       respuesta: usuario
      };
     }
     res.send(respuesta);
    })
    .post(function (req, res) {
     if(!req.body.nombre || !req.body.apellido) {
      respuesta = {
       error: true,
       codigo: 502,
       mensaje: 'El campo nombre y apellido son requeridos'
      };
     } else {
      if(usuario.nombre !== '' || usuario.apellido !== '') {
       respuesta = {
        error: true,
        codigo: 503,
        mensaje: 'El usuario ya fue creado previamente'
       };
      } else {
       usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido
       };
       respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Usuario creado',
        respuesta: usuario
       };
      }
     }
     
     res.send(respuesta);
    })
    .put(function (req, res) {
     if(!req.body.nombre || !req.body.apellido) {
      respuesta = {
       error: true,
       codigo: 502,
       mensaje: 'El campo nombre y apellido son requeridos'
      };
     } else {
      if(usuario.nombre === '' || usuario.apellido === '') {
       respuesta = {
        error: true,
        codigo: 501,
        mensaje: 'El usuario no ha sido creado'
       };
      } else {
       usuario = {
        nombre: req.body.nombre,
        apellido: req.body.apellido
       };
       respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Usuario actualizado',
        respuesta: usuario
       };
      }
     }
     
     res.send(respuesta);
    })
    .delete(function (req, res) {
     if(usuario.nombre === '' || usuario.apellido === '') {
      respuesta = {
       error: true,
       codigo: 501,
       mensaje: 'El usuario no ha sido creado'
      };
     } else {
      respuesta = {
       error: false,
       codigo: 200,
       mensaje: 'Usuario eliminado'
      };
      usuario = { 
       nombre: '', 
       apellido: '' 
      };
     }
     res.send(respuesta);
    });

   app.use(function(req, res, next) {
    respuesta = {
     error: true, 
     codigo: 404, 
     mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
   });
   app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
   });

// GET = Obtener
// POST = Crear
// PUT = Actualizar
// DELETE = Eliminar