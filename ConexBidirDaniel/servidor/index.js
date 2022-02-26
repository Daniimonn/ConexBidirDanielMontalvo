const express = require('express');
const conexionDB = require('./config/db');
const cors = require("cors");

// Crear el servidor
const app = express();

//Conectar a DB
conexionDB();
app.use(cors())

app.use(express.json());

app.use('/api/libros', require('./routes/libro'));

app.listen(4000, () => {
    console.log('El servidor esta corriendo perfectamente')
})