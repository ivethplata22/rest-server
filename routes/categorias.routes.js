const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares');
const { crearCategoria } = require('../controllers/categorias.controller');

const router = Router();

// /api/categorias

// Obtener todas las categorias - Publico

// Obtener una categoria por ID - Publico

// Crear Categoria - Privado - Token Valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    // check('estado', 'El estado es obligatorio').notEmpty(),
    // check('usuario', 'El usuario es obligatorio').notEmpty(),
    validarCampos
], crearCategoria)

// Actualizar Categoria por ID - Privado - Token Valido

// Borrar una categoria - Admin

router.get('/')

module.exports = router;