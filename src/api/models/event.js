'use strict'
// Cargamos el módulo de mongoose
var mongoose =  require('mongoose');
// Usaremos los esquemas
var Schema = mongoose.Schema;
// Creamos el objeto del esquema y sus atributos
var EventSchema = Schema({
    id: Integer,
    name: String,
    description: String,
    datetime: String,
    organizer: String,
    assistants: []
});
// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Event', EventSchema);
