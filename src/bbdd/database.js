"use strict"

// Libraries
let level = require('level');
let zmq = require('zmq');
const crypto = require("crypto");

// Create DB
let db = level('./eventplanner');

// Dos tipos de elementos (JSON en forma de strings)
// evento = {"id":int, "name":string, "datetime":string, "description":string, "organizer":string, "assistants":string[]}
// usuario = {"name":string, "password": string}

// IP and Port (if not args, select by default)
let ip;
let puerto;
if (process.argv.length == 4) {
	ip = process.argv[2];
    puerto = process.argv[3];
} else {
	ip = '127.0.0.1';
	puerto = '1234';
}

// Connection
let bdSocket = zmq.socket('dealer');
let host = 'tcp://' + ip + ':' + puerto;
bdSocket.identity = "bd";
bdSocket.connect(host);

// Listen 
bdSocket.on("message", async (_, message) => {
	// message received to JSON type
	let mensaje = JSON.parse(message.toString());

	// Check if user or event
	let component = mensaje["component"];
	let id = mensaje["id"];
    let body = mensaje["body"];
    // check if body has proper structure (no injection)
    let op = body["op"];
    
    if (op == "get") {
		let res = await take(id);
		responder(res);
		return;
	} else if (op == "put") {
        let args;
        if (component == "event") {
            args = body["arg"];
            id = idEvent();
        } else {
            args = '';
        }
        let res = await insert(id,args,component);
        console.log('res');
		responder(res);
		return;
	} else {
		responder("Wrong operation");
		return;
	}

	// if (!ok) {
	// 	responder("Security warning");
	// 	return;
	// } 

});


// Put values into DB
const insert = async (id,args, component) => {
	// Introducir valores
	let resp;
	let promiss = db.put(id, args);
	await promiss
		.then(() => {
            resp = "Done";
            if (component == "event") {
                resp = id;
            }
		}).catch((error) => {
            resp = "Failed";
		});
        return resp;
} 

// Get values from DB
const take = async (id) => {
	// Consultar valores
	let resp;
	let promiss = db.get(id);
	await promiss
		.then((value) => {
			resp = value;
        }).catch((error) => {
            resp = "Failed";
        });
        return resp;
}

// Create unique ID for new event
function idEvent() {
    return crypto.randomBytes(3).toString("hex");
}
// Send info to API
function responder(res) {
    bdSocket.send([' ',res]);
    return;
}

// Check for corrupt data in user args
// function checkUser()

// Check for corrupt data in event args
// function checkEvent()

exports.insert = insert;
exports.take = take;
exports.idEvent = idEvent;