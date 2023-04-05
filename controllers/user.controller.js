const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

// Get Usuarios
const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const usuarios = await Usuario.find()
        .skip(Number(desde))
        .limit(Number(limite));

    res.json({
        msg: 'Get Usuarios Ok',
        usuarios
    });
}

// Crear usuario
const usuariosPost = async (req = request, res = response) => {
    // Extraer datos del request
    const { nombre, correo, password, rol } = req.body;

    // Modelo de usuario
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    // Respuesta
    return res.status(201).json({
        msg: 'Usuario Creado Con Exito',
        usuario
    });
}

const usuariosDelete = (req = request, res = response) => {
    res.status(100).json({
        msg: 'Delete Api - Controlador'
    });
}

const usuariosPatch = (req = request, res = response) => {
    res.status(500).json({
        msg: 'Patch Api - Controlador'
    });
}

const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // Verifica si va cambiar password
    if(password) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    // Buscar Coincidencia en BD
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    // Respuesta
    return res.status(200).json({
        msg: 'Usuario Actualizado Correctamente',
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosPut
}