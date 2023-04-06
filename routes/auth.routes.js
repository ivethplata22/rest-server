const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo','El correo es obligatorio').notEmpty(),
    check('correo','El formato del correo no es correcto').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
], login);

module.exports = router;