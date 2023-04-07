const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

// /api/categorias

// Obtener todas las categorias - Publico
router.get('/', obtenerCategorias);

// Obtener una categoria por ID - Publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoria);

// Crear Categoria - Privado - Token Valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria)

// Actualizar Categoria por ID - Privado - Token Valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id', 'NO es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
],actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'NO es un id de Mongo valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
],borrarCategoria);

module.exports = router;