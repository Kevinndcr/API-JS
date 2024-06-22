 // Instalar librerias:
    // npm init -y
    // npm install express
    // npm install --save-dev nodemon
    // npm install mongoose

const express = require('express');
const mongoose = require('mongoose');
const Mensaje = require('./models/Mensaje'); // Importar el modelo de Mensaje
const Usuarios = require('./models/Usuarios');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/mi-api-basica', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB correctamente'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Ruta GET básica
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Ruta GET para obtener todos los mensajes
app.get('/mensajes', async (req, res) => {
  try {
    const mensajes = await Mensaje.find();
    res.json(mensajes);
  } catch (err) {
    console.error('Error al obtener mensajes', err);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
});

// Ruta POST para enviar un mensaje nuevo
app.post('/mensaje', async (req, res) => {
  const { nombre, mensaje } = req.body;

  if (!nombre || !mensaje) {
    return res.status(400).json({ error: 'El nombre y el mensaje son obligatorios' });
  }

  try {
    const nuevoMensaje = new Mensaje({ nombre, mensaje });
    await nuevoMensaje.save();
    res.json({ mensaje: `Has enviado: ${mensaje}` });
  } catch (err) {
    console.error('Error al guardar el mensaje', err);
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  }
});



// A ponerno creativou att: Kevincillo


app.post('/addUser', async (req, res) => {
  const { id, nombre, apellido } = req.body;

  try {
    //Aqui se crea un objeto de modelo (Clase) Usuarios, con su Esquema (atributos definidos en el modal)
    const nuevoUsuario = new Usuarios ({id, nombre, apellido});
    //Guarda en la base de datos MongoDB
    await nuevoUsuario.save();
    res.json({Salida: 'Se ha registrado un nuevo usuario.' }); //una vez guarda, da el mensaje de OK o de ERROR
  } catch (err) {
    console.error('Error al guardar el mensaje', err);
    res.status(500).json({ error: 'Error al guardar el usuario' });
  }

});


//falta hacer GET y GET especifico


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
