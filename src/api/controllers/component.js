
function getPasswordInArgs(password){
    var args = {"password": password};
    args = JSON.stringify(args);
    return args;
}

function getEventDataInArgs(name, description, datetime, organizer){
    var args = {"name": name, 
    "datetime": datetime,
    "description": description,
    "organizer": organizer, 
    "assistants":""};
    args = JSON.stringify(args);
    return args;
}

function getStringifyMessage(c, id, args, op)
{
    var body = {"op":op, "args": args};
    body = JSON.stringify(body);
    var m = {"component":c, "id":id, "body":body};
    m = JSON.stringify(m);
    return m;
}