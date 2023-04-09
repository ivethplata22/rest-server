const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const { v4: uuidv4 } = require('uuid');
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

const actualizarImagenCloudinary = async (req = request, res = response) => {
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
        // Hay que borrar la imagen del servidor cloudinary
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    modelo.img = secure_url;

    await modelo.save();

    return res.status(200).json({
        modelo
    });
}

const mostrarImagen = async (req = request, res = response) => {
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

    if( modelo.img ) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync(pathImagen) ) {
            return res.sendFile( pathImagen );
        }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile( pathImagen );
}

const DescargarImagen = (req = request, res = response) => {

    const { coleccion, id } = req.params;
    let contentType, nombreCortado, extension;

    fetch(`http://localhost:8080/api/uploads/${coleccion}/${id}`)
    .then(response => {
        if (response.ok) {
            // Extraemos la extension del archivo
            contentType = response.headers.get('Content-Type');
            nombreCortado = contentType.split('/');
            extension = nombreCortado[ nombreCortado.length -1 ];
            return response.buffer(); // Convertir la respuesta en un buffer
        }
        throw new Error('Sistem Error');
    })
    .then(buffer => {
        // Escribir el buffer en un archivo local
        const nombreTemp = uuidv4() + '.' + extension;
        const pathImagen = path.join(__dirname, '../uploads', 'descargas', nombreTemp);
        const dirPath = path.dirname(pathImagen);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        fs.writeFile(pathImagen, buffer, err => {
        if (err) {
            return res.status(400).json({ msg: 'Hubo un problema al escribir archivo', err});
        } else {
            return res.status(200).json({ msg: 'El archivo fue guardado!', pathImagen });
        }
        });
    })
    .catch(error => {
        return res.status(400).json({ msg: 'Sistem Error - Descargar Imagen', error});
    });
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    DescargarImagen,
    actualizarImagenCloudinary
}