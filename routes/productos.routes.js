const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos.controller');
const { existeProductoPorID, existeCategoria } = require('../helpers/db-validators');
const { validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

// /api/productos

// Obtener todas las productos - Publico
router.get('/', obtenerProductos);

// Obtener un producto por ID - Publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorID ),
    validarCampos
], obtenerProducto);

// Crear Producto - Privado - Token Valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'No es un id de Mongo valido').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validarCampos
], crearProducto)

// Actualizar Producto por ID - Privado - Token Valido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorID ),
    validarCampos
], actualizarProducto);

// Borrar un producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorID ),
    validarCampos
], borrarProducto);

module.exports = router;