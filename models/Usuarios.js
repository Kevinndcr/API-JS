const mongoose = require('mongoose'); 

const usuariosSchema  = new mongoose.Schema({ // se crea un esquema con las
    id: { type: String},
    nombre: { type: String},
    apellido: { type: String}
  });

const Usuarios = mongoose.model('Usuarios', usuariosSchema );

module.exports = Usuarios;


// es algo como:

// Crear un esquema es como crear una clase, que va a necesitar ciertos atributos
// Define usuarios como un modelo del mongoose, que utiliza esta sheet (misma pagina) y su esquema