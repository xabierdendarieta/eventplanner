// Unit tests for DB

// Libraries
let zmq = require('zmq');

// Connection
let ident = 'test';
let tester = zmq.socket('dealer');
// IP and Port (if not args, select by default)
let ip;
let puerto;
if (process.argv.length == 4) {
	ip = process.argv[2];
	puerto = process.argv[3];
} else {
	ip = "127.0.0.1";
	puerto = "1234";
}
let host = "tcp://" + ip + ":" + puerto; 
tester.identity = ident;
tester.bind(host);
console.log("Connected to... " + host); 
    
// Input messages
tester.on("message", (_,message) => { 
    let mensaje = JSON.parse(message.toString());
    let res = mensaje["res"];
    // Check answers
    if (res === undefined) {
        console.log("Empty answer");
    } else if (res == "Failed") {
        console.log("Test failed");
    } else {
        console.log("Test passed");
    }
    
    return;
});

// Output messages
let component;
let id;
let op;
let args;
let body;
let m;

// PUT user
component = "user";
id = "paco44";
op = "put";
args = {"password": "micasa"};
args = JSON.stringify(args);
body = {"op":op, "arg": args};
m = {"component":component, "id":id, "body":body};
m = JSON.stringify(m);

tester.send(['',m]);

// PUT event
component = "event";
id = 1;
op = "put";
args = {"name":"cenica", "datetime":"9mayo15:30", "description": "cena con amigos", "organizer": "paco44", "assistants":""};
args = JSON.stringify(args);
body = {"op":op, "arg": args};
m = {"component":component, "id":id, "body":body};
m = JSON.stringify(m);

tester.send([' ',m]);

// GET existing user
component = "user";
id = "paco44";
op = "get";
body = {"op":op};
m = {"component":component, "id":id, "body":body};
m = JSON.stringify(m);

tester.send([' ',m]);

// GET existing event
component = "event";
id = 1;
op = "get";
body = {"op":op};
m = {"component":component, "id":id, "body":body};
m = JSON.stringify(m);

tester.send([' ',m]);
