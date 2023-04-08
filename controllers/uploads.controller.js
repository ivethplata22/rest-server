const path = require('path');
const { request, response } = require("express");

const cargarArchivo = ( req = request, res = response ) => {
    // Validar si recibimos un archivo en la peticion
    if( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({msg: 'No hay archivos que subir'});
    }

    // Establecer la direccion del archivo
    const { archivo } = req.files;
    const uploadPath = path.join( __dirname, '../uploads/', archivo.name );

    // Guardar archivo en el server
    archivo.mv( uploadPath, (err) => {
        if(err)
            return res.status(500).json({ err });
    });

    return res.status(200).json({
        msg: `Archivo cargado en ${uploadPath}`
    });
}

module.exports = {
    cargarArchivo
}