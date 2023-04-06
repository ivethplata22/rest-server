const { request, response } = require("express")
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        // Verificar que el Token sea correcto
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        
        // Buscar la informacion del usuario
        const usuario = await Usuario.findById(uid);

        if(!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario borrado DB'
            })
        }
        
        // Validar que sea un usuario activo
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}