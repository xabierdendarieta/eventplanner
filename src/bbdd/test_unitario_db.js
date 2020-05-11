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

function testput(res) {
    assert.equal(res,"Done", "Test failed");
    return;
}

function testget(res,cont) {
    assert.ok(typeof res === "string", "Test failed");
    return;
}

const indb = async(id,body) => {
    let sol = database.insert(id,body);
    await sol.then((value) => {
        testput(value);
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
let component;
let id;
let op;
let args;
let body;
let m;

// PUT user
id = "paco44";
op = "put";
args = {"password": "micasa"};
args = JSON.stringify(args);
body = {"op":op, "arg": args};
body = JSON.stringify(body);
indb(id,body);

// PUT event
id = 1;
op = "put";
args = {"name":"cenica", "datetime":"9mayo15:30", "description": "cena con amigos", "organizer": "paco44", "assistants":""};
args = JSON.stringify(args);
body = {"op":op, "arg": args};
body = JSON.stringify(body);
indb(id,body);

// GET existing user
id = "paco44";
outdb(id);

// GET existing event
id = 1;
outdb(id);