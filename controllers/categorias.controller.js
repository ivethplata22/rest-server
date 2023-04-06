const { response, request } = require("express");
const { Categoria } = require('../models/index');

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

module.exports = {
    crearCategoria
}