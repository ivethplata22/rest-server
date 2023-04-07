const { response, request } = require("express");
const {  } = require('../models/index');

const obtenerProductos = async (req = request, res = response) => {
    res.status(200).json({
        msg: 'Obtener Productos'
    });
}

const obtenerProducto = async (req = request, res = response) => {
    res.status(200).json({
        msg: 'Obtener Producto'
    });
}

const crearProducto = async (req = request, res = response) => {
    res.status(200).json({
        msg: 'Crear Producto'
    });
}

const actualizarProducto = async (req = request, res = response) => {
    res.status(200).json({
        msg: 'Actualizar Producto'
    });
}

const borrarProducto = async (req = request, res = response) => {
    res.status(200).json({
        msg: 'Borrar Producto'
    });
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}