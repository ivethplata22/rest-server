const express = require('express');
var cors = require('cors');

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Publico
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'Get Api'
            });
        });

        this.app.put('/api', (req, res) => {
            res.status(400).json({
                msg: 'Put Api'
            });
        });

        this.app.post('/api', (req, res) => {
            res.status(201).json({
                msg: 'Post Api'
            });
        });

        this.app.delete('/api', (req, res) => {
            res.status(100).json({
                msg: 'Delete Api'
            });
        });

        this.app.patch('/api', (req, res) => {
            res.status(500).json({
                msg: 'Patch Api'
            });
        });
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto http://localhost:${this.port}/`)
        });
    }
}

module.exports = Server;