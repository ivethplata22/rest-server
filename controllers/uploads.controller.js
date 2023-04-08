const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { request, response } = require("express");

const cargarArchivo = ( req = request, res = response ) => {
    // Validar si recibimos un archivo en la peticion
    if( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({msg: 'No hay archivos que subir'});
    }

    // Extraer la extension
    const { archivo } = req.files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[ nombreCortado.length - 1 ];

    // Validar la extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    console.log(nombreCortado, 'Extension', extension);

    if( !extensionesValidas.includes( extension ) ) {
        return res.status(400).json({
            msg: `Solo las extensiones ${extensionesValidas} son permitidas`
        });
    }

    // Establecer un cambio de nombre
    const nombreTemp = uuidv4() + '.' + extension;

    // Establecer la direccion del archivo
    const uploadPath = path.join( __dirname, '../uploads/', nombreTemp );

    // Guardar archivo en el server
    archivo.mv( uploadPath, (err) => {
        if(err) {
            return res.status(500).json({ err });
        } else {
            return res.status(200).json({
                msg: `Archivo cargado en ${uploadPath}`
            });
        }
    });
}

module.exports = {
    cargarArchivo
}