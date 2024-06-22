const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  mensaje: { type: String, required: true }
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

module.exports = Mensaje;
