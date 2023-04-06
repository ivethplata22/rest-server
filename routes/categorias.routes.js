const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');

const router = Router();

// /api/categorias

// Obtener todas las categorias - Publico
router.get('/', obtenerCategorias);

// Obtener una categoria por ID - Publico
router.get('/:id', obtenerCategoria);

// Crear Categoria - Privado - Token Valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria)

// Actualizar Categoria por ID - Privado - Token Valido
router.put('/:id', actualizarCategoria);

// Borrar una categoria - Admin
router.put('/:id',borrarCategoria);

module.exports = router;