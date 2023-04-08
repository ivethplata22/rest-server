const { request, response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async ( req = request, res = response ) => {
    if( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({msg: 'No hay archivos que subir'});
    }

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

    return res.status(200).json({
        id, coleccion
    });
}

module.exports = {
    cargarArchivo,
    actualizarImagen
}