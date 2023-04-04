const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';

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
       this.app.use( this.usuariosPath, require('../routes/user.routes') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto http://localhost:${this.port}/`)
        });
    }
}

module.exports = Server;