
function getStringifyMessage(c, id, password = "", op)
{
    var body = {"op":op, "password": password};
    var m = {"component":c, "id":id, "body":body};
    m = JSON.stringify(m);
    return m;
}