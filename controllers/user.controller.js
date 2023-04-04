const { response, request } = require('express');
const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    const { q, nombre, apikey } = req.query;

    res.json({
        msg: 'Get Api - Controlador',
        q,
        nombre,
        apikey
    });
}

// Crear usuario
const usuariosPost = async (req = request, res = response) => {
    const body = req.body;
    const usuario = new Usuario(body);
    await usuario.save();

    res.status(201).json({
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

const usuariosPut = (req = request, res = response) => {
    const id = req.params.id;

    res.status(400).json({
        msg: 'Put Api',
        id
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosPut
}