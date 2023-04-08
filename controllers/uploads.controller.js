const { request, response } = require("express");

const cargarArchivo = ( req = request, res = response ) => {
    return res.status(200).json({
        msg: 'Cargar Archivo'
    });
}

module.exports = {
    cargarArchivo
}