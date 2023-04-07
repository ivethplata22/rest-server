const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos.controller');

const router = Router();

// /api/productos

// Obtener todas las productos - Publico
router.get('/', obtenerProductos);

// Obtener un producto por ID - Publico
router.get('/:id', obtenerProducto);

// Crear Producto - Privado - Token Valido
router.post('/', crearProducto)

// Actualizar Producto por ID - Privado - Token Valido
router.put('/:id', actualizarProducto);

// Borrar un producto - Admin
router.delete('/:id', borrarProducto);

module.exports = router;