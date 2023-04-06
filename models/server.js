const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias'
        }

        // Conectar a Base de Datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Parseo y lectura del body
        this.app.use( express.json() );

        // Directorio Publico
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth.routes') );
        this.app.use( this.paths.usuarios, require('../routes/user.routes') );
        this.app.use( this.paths.categorias, require('../routes/categorias.routes') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto http://localhost:${this.port}/`)
        });
    }
}

module.exports = Server;