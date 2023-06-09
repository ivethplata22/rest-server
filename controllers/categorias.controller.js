const { response, request } = require("express");
const { Categoria } = require('../models/index');

const obtenerCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        // Ahorra tiempo de ejecucion
        const [ total, categorias ] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .skip( Number( desde ) )
                .populate('usuario', 'nombre')
                .limit( Number( limite ) )
        ]);

        return res.status(200).json({
            total,
            categorias
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Erorr de Sistema | Obetenr Categorias'
        });
    }
}

const obtenerCategoria = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const categoria = await Categoria.findById( id ).populate('usuario', 'nombre');

        return res.status(200).json({
            categoria
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error de Sistema | Obtener Categoria'
        });
    }
}

const crearCategoria = async (req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    try {
        const categoriaDB = await Categoria.findOne({ nombre });

        if(categoriaDB) {
            return res.status(400).json({
                msg: `La categoria ${categoriaDB.nombre} ya existe`
            });
        }

        const data = {
            nombre,
            usuario: req.usuario._id
        }

        const categoria = await new Categoria( data );

        await categoria.save();

        return res.status(201).json({
            categoria
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Erorr de Sistema | Craer Categoria'
        });
    }
}

const actualizarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
    
    return res.status(200).json({
        categoria
    });
}

const borrarCategoria = async (req = request, res = response) => {
    const { id } = req.params;
    const query = { estado:false };

    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, query, { new: true });

    return res.status(200).json({
        categoriaBorrada
    });
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}