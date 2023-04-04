const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'Get Api - Controlador'
    });
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'Post Api - Controlador',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res = response) => {
    res.status(100).json({
        msg: 'Delete Api - Controlador'
    });
}

const usuariosPatch = (req, res = response) => {
    res.status(500).json({
        msg: 'Patch Api - Controlador'
    });
}

const usuariosPut = (req, res = response) => {
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