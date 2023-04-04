const { Router } = require('express');
const { usuariosGet, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch, 
        usuariosPut } = require('../controllers/user.controller');

const router = Router();

router.get('/', usuariosGet);
router.put('/', usuariosPut);
router.post('/', usuariosPost);
router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;