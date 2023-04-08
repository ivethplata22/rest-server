const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'  
];

// Busquedas por nombre por numero, busca en la base de datos por el nombre todas las expreciones parecidas en ese caracter
const buscarUsuarios = async ( termino = '', res = response ) => {
    const esMongoID = ObjectId.isValid( termino );

    if( esMongoID ) {
        // Buscar con el Mongo ID
        const usuario = await Usuario.findById( termino );
        return res.status(200).json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    // Buscar por expresiones regulares
    const regex = new RegExp( termino, 'i' );

    // Buscar por el nombre de usuario
    const usuario = await Usuario.find({ 
        // Que cumpla mas de una condicion evaluando mas campos
        $or: [
            {nombre: regex},
            {correo: regex}
        ],
        $and: [
            { estado: true }
        ]
     });
    return res.status(200).json({
        results: ( usuario ) ? [ usuario ] : []
    });
}

const buscar = ( req = request, res = response ) => {

    const { coleccion, termino } = req.params;

    if( !coleccionesPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios( termino, res );
        break;
        case 'categorias':
            
        break;
        case 'productos':
            
        break;
        default:
            res.status(500).json({
                msg: `No existe esta busqueda ${coleccion}`
            });
        break;
    }
}

module.exports = {
    buscar
}