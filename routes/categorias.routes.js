const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// /api/categorias

// Obtener todas las categorias - Publico

// Obtener una categoria por ID - Publico

// Crear Categoria - Privado - Token Valido

// Actualizar Categoria por ID - Privado - Token Valido

// Borrar una categoria - Admin

router.get('/')

module.exports = router;