const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');
const { usuariosGet, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch, 
        usuariosPut } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id', usuariosPut);
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser mayor a 6 letras').isLength({min: 6}),
        check('correo', 'El correo no es válido').isEmail(),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( async(rol = '') => {
                const existeRol = await Role.findOne({ rol });
                if(!existeRol)
                        throw new Error(`El rol ${rol} no esta registrado en la BD`);
        }),
        validarCampos
],usuariosPost);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;