const Libro = require("../models/Libro");

exports.crearLibro = async (req, res) => {
    
    try {
        let libro;

        // Creamos nuestro libro
        libro = new Libro(req.body);
        await libro.save();
        res.send(libro);
        
     } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerLibros = async (req, res) => {
    
    try {
        
        const libros = await Libro.find();
        res.json(libros)
        
     } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarLibro = async (req, res) => {
    
    try {
        
        const { nombre, categoria, autor, precio } = req.body;
        let libro = await Libro.findById(req.params.id);

        if(!libro) {
            res.status(404).json({ msg: 'No existe ese libro' })
        }

        libro.nombre = nombre;
        libro.categoria = categoria;
        libro.autor = autor;
        libro.precio = precio;

        libro = await Libro.findOneAndUpdate({ _id: req. params.id },libro, { new: true} )
        res.json(libro);
        
     } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerLibro = async (req, res) => {
    
    try {
        
        let libro = await Libro.findById(req.params.id);

        if(!libro) {
            res.status(404).json({ msg: 'No existe ese libro' })
        }
        
        res.json(libro);
        
     } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarLibro = async (req, res) => {
    
    try {
        
        let libro = await Libro.findById(req.params.id);

        if(!libro) {
            res.status(404).json({ msg: 'No existe ese libro' })
        }
        
        await Libro.findOneAndRemove({ _id: req.params.id})
        res.json({ msg: 'Libro eliminado correctamente' });
        
     } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}