const { request, response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async ( req = request, res = response ) => {
    if( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({msg: 'No hay archivos que subir'});
    }

    try {
        // Subir otro tipo de archivos
        const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
        return res.status(200).json({ nombre });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error de Servidor | Cargar Archivo',
            error
        });
    }
}

module.exports = {
    cargarArchivo
}