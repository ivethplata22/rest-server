const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { cargarArchivo } = require('../controllers/uploads.controller');

const router = Router();

router.post('/', [
    
], cargarArchivo);

module.exports = router;