const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require("../helpers/google-verify");

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;
    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            });
        }
        
        // Si el usuario esta activo en DB
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        return res.status(200).json({
            usuario,
            token
        });   
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
}

const googleSignIn = async(req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const { nombre, imagen, correo } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        // Si no tenemos usuario lo registramos en DB
        if(!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                imagen,
                google: true
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en DB esta en false
        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        return res.status(200).json({
            usuario,
            token
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}