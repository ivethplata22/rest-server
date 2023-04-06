const { response } = require("express")

const esAdminRole = (req, res = response, next) => {
    if(!req.usuario) {
        return res.status(500).json({
            msg: 'Se debe verificar token primero'
        });
    }

    const { rol, nombre } = req.usuario;

    if(rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no puede eliminar registro - PERMISO PAR ADMIN`
        });
    }

    next();
}

module.exports = {
    esAdminRole
}