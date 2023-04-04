const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const { q, nombre, apikey } = req.query;

    res.json({
        msg: 'Get Api - Controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req = request, res = response) => {
    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'Post Api - Controlador',
        nombre,
        edad
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