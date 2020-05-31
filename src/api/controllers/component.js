module.exports.getEventDataInArgs = function(name, description, datetime, organizer){
    var args = {"name": name, 
    "datetime": datetime,
    "description": description,
    "organizer": organizer, 
    "assistants":""};
    args = JSON.stringify(args);
    return args;
}

module.exports.getStringifyMessage = function (c, id, args, op)
{
    var body = {"op":op, "args": args};
    var m = {"component":c, "id":id, "body":body};
    m = JSON.stringify(m);
    return m;
}