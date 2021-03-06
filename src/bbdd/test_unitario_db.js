// Unit Tests for DB
"use strict"

const database = require('./database');
const assert = require('assert');

var cont = 0;
const numtest = 4;

// function testing(res) {
//     if (res === undefined) {
//         console.log("Empty answer");
//     } else if (res == "Failed") {
//         console.log("Test failed");
//     } else {
//         console.log("Test passed");
//     }
//     cont = cont + 1;
//     if (cont == 4){
//         process.exit(0);
//     }
// }

// Test introducir nuevo usuario
function testputuser(res) {
    assert.equal(res,"Done", "Test failed");
    return;
}

function testputevent(res,cont) {
    assert.ok(typeof res === "string", "Test failed");
    assert.ok(res.length == 6, "Wrong generated ID");
    return;
}

function testget(res,cont) {
    assert.ok(typeof res === "string", "Test failed");
    return;
}

const indbuser = async(id) => {
    let sol = database.insert(id,'',"user");
    await sol.then((value) => {
        testputuser(value);
        return;
    }).catch((error) => {
        console.log(error);
        return;
    });
    cont = cont + 1;
    if (cont == numtest){
        process.exit(0);
    }
};

const indbevent = async(id,args) => {
    let sol = database.insert(id,args,"event");
    await sol.then((value) => {
        testputevent(value);
        return;
    }).catch((error) => {
        console.log(error);
        return;
    });
    cont = cont + 1;
    if (cont == numtest){
        process.exit(0);
    }
};

const outdb = async(id) => {
    let sol = database.take(id);
    await sol.then((value) => {
        testget(value);
        return;
    }).catch((error) => {
       console.log(error);
       return;
    });
    cont = cont + 1;
    if (cont == numtest){
        process.exit(0);
    }
};

// Output messages
let id;
let op;
let args;
let body;
let m;

// PUT user
id = "paco44";
indbuser(id);

// PUT event
id = database.idEvent();
op = "put";
args = {"name":"cenica", "datetime":"9mayo15:30", "description": "cena con amigos", "organizer": "paco44", "assistants":""};
args = JSON.stringify(args);
indbevent(id,args);
let saveid = id;

// GET existing user
id = "paco44";
outdb(id);

// GET existing event
id = saveid;
outdb(id);