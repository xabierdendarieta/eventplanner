"use strict"

// Libraries
let level = require('level');
let zmq = require('zmq');

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
console.log("Listening on... "+host);

// Listen 
bdSocket.on("message", async (_, message) => {
	// message received to JSON type
	let mensaje = JSON.parse(message.toString());

	// Check if user or event
	let component = mensaje["component"];
	let id = mensaje["id"];
    let body;
	if (component == "user") { 
		body = mensaje["body"];
		// let ok = checkUser(body);
	} else if (component == "event") {
		body = mensaje["body"];
		// let ok = checkEvent(body);
	} else {
		responder("No user, no event");
		return;
	}

	// if (!ok) {
	// 	responder("Security warning");
	// 	return;
	// } 

	// Check type of operation
	let op = body["op"];

	if (op == "get") {
		let res = await take(id);
		//responder(res);
		return;
	} else if (op == "put") {
		let args = body["arg"];
		let res = await insert(id,args);
//         console.log("hecho: ",res);
// 		responder(res);
// 		return;
	} else {
		responder("Wrong operation");
		return;
	}
});


// Put values into DB
const insert = async (id,args) => {
	// Introducir valores
	let resp;
	let promiss = db.put(id, args);
	await promiss
		.then(() => {
            responder("Done");
			return "Done";
		}).catch((error) => {
			console.log("Put Error: " + error);
            responder("Failed");
			return "Failed";
		});
} 

// Get values from DB
const take = async (id) => {
	// Consultar valores
	let resp;
	let promiss = db.get(id);
	await promiss
		.then((value) => {
			resp = value;
            responder(value);
        	return value;
        }).catch((error) => {
        	console.log("Get Error: " + error);
            responder("Failed");
        	return "Failed";
        });
}

// Send info to API
function responder(res) {
    let m = {"res":res};
    m = JSON.stringify(m);
    console.log(m);
    bdSocket.send([' ',m]);
    return;
}

// Check for corrupt data in user args
// function checkUser()

// Check for corrupt data in event args
// function checkEvent()