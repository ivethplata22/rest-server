const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

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
    // Validar formato del correo
    const errors = validationResult(req);
    if(!errors.isEmpty())
        res.status(400).json(errors);

    // Extraer datos del request
    const { nombre, correo, password, rol } = req.body;
    // Modelo de usuario
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar si correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail)
        res.status(400).json({msg: 'El correo ya esta registrado'});
    
    if(!existeEmail) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );

        // Guardar en BD
        await usuario.save();

        res.status(201).json({
            msg: 'Usuario Creado Con Exito',
            usuario
        });
    }
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