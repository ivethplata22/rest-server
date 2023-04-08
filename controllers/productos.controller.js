const { response, request } = require("express");
const { Producto } = require('../models/index');

const obtenerProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0} = req.query;
    const query = { estado: true };

    try {
        // Ahorra tiempo de ejecucion
        const [ total, productos ] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
                .skip( Number( desde ) )
                .limit( Number( limite ) )
        ]);

        return res.status(200).json({
            total,
            productos
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Erorr de Sistema | Obetener Productos'
        });
    }
}

const obtenerProducto = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findById( id )
            .populate('categoria', 'nombre')
            .populate('usuario', 'nombre');

        return res.status(200).json({
            producto
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error de Sistema | Obtener Producto'
        });
    }
}

const crearProducto = async (req = request, res = response) => {
    const { estado, usuario, ...body } = req.body;

    try {
        const productoDB = await Producto.findOne({ nombre: body.nombre });

        if(productoDB) {
            return res.status(400).json({
                msg: `El producto ${productoDB.nombre} ya existe`
            });
        }

        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id
        }

        const producto = await new Producto( data );

        await producto.save();

        return res.status(201).json({
            producto
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Erorr de Sistema | Craer Producto'
        });
    }
}

const actualizarProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if(data.nombre)
        data.nombre = data.nombre.toUpperCase();
    
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});
    
    return res.status(200).json({
        producto
    });
}

const borrarProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const query = { estado:false };

    const productoBorrado = await Producto.findByIdAndUpdate( id, query, { new: true });

    return res.status(200).json({
        productoBorrado
    });
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}