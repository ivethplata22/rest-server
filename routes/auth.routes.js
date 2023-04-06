const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo','El correo es obligatorio').notEmpty(),
    check('correo','El formato del correo no es correcto').isEmail(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token','Token de google es necesario').notEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;