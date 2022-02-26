//Rutas para libro
const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');

// api/libros
router.get('/', libroController.obtenerLibros);
router.get('/:id', libroController.obtenerLibro);
router.post('/', libroController.crearLibro);
router.put('/:id', libroController.actualizarLibro);
router.delete('/:id', libroController.eliminarLibro);


module.exports = router;