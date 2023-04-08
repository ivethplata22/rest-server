const { request, response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async ( req = request, res = response ) => {
    if( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({msg: 'No hay archivos que subir'});
    }

    const nombre = await subirArchivo( req.files );

    return res.status(200).json({ nombre });
}

module.exports = {
    cargarArchivo
}