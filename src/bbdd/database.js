"use strict"

// Importar librerias
let level = require('level');
let zmq = require('zmq');

// Crear base de datos
let db = level('./eventplanner');

// Dos tipos de elementos (JSON en forma de strings)
// evento = {"id":int, "titulo":string, "fechaHora":timestamp, "descripcion":string, "organizador":string, "asistentes":string[]}
// usuario = {"mail":string,"id":string, "nombre":string}

// Ip y puerto en los que escucha la base de datos
let ip = '127.0.0.1';
let puerto = '1234';

// Realizar conexion
let bdSocket = zmq.socket('dealer');
let host = 'tcp://' + ip + ':' + puerto;
bdSocket.identity = "bd";
bdSocket.connect(host);
console.log("Escuchando en... "+host);

// Escuchar peticiones
bdSocket.on('message', async (_, message) => {
	// Mensaje a JSON
	let mensaje = JSON.parse(message.toString());
	let id = mensaje["id"];
    console.log("Mensaje de: "+id);
    console.log(mensaje);

	// Comprobar operacion a realizar
	let op = mensaje['op'];
	let cuerpo = mensaje['arg']; // variara segun la operacion
	let res;
	if (op == 'put') {
		// Introducir valores
		await db.put(cuerpo['clave'], cuerpo['valor'], function(err) {
			if (err) {
				res = 'error';
			} else {
				res = 'ok';
			}
			responder(res,id);
		});
	} else if (op == 'get') {
		// Consultar valores
		let promesa = db.get(cuerpo['clave']);
		await promesa.then((value) => {
			res = value;
            responder(res,id);
		});
	} else if (op == 'del') {
		// Eliminar valores
		await db.del(cuerpo['clave'], function(err) {
			if (err) {
				res = 'error';
			} else {
				res = 'ok';
			}
			responder(res,id);
		});
	} else {
		// Opcion invalida o no definida
		res = -1;
	}

});

function responder(res,id) {
    // Enviar respuesta
    let m = {'id':id, 'res':res};
    m = JSON.stringify(m);
    console.log(m);
    bdSocket.send([' ',m]);
}