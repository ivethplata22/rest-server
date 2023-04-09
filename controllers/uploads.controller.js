const path = require('path');
const fs = require('fs');
const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require('../models');

const cargarArchivo = async ( req = request, res = response ) => {
    try {
        // Subir otro tipo de archivos
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
        return res.status(200).json({ nombre });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error de Servidor | Cargar Archivo',
            error
        });
    }
}

const actualizarImagen = async (req = request, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo)
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo)
                return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
        break;
        default:
            return res.status(500).json({ msg: `No hay validacion para ${coleccion}`});
    }

    // Limpiar imagenes previas
    if( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync(pathImagen) )
            fs.unlinkSync(pathImagen);
    }

    const nombre = await subirArchivo( req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    return res.status(200).json({
        modelo
    });
}

module.exports = {
    cargarArchivo,
    actualizarImagen
}