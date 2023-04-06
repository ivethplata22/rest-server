const { Categoria, Role, Usuario } = require('../models');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la Base de Datos`);
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail)
        throw new Error(`El correo ${correo} ya esta registrado`);
}

const existeUsuarioPorID = async (id) => {
    const existeUsuario = await Usuario.findById( id );
    if(!existeUsuario)
        throw new Error(`El id no existe: ${id}`);
}

const existeCategoria = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria)
        throw new Error(`La categoria con id ${id} no existe`);
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorID,
    existeCategoria
};