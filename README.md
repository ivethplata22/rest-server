# Notas de la aplicación:
Introducción REST Server con manejo de Roles

Base de datos MongoDB

Configurar archivo .env
```
Ejemplo en example.env
```

Instalar Dependencias
```
npm install
```

Iniciar la aplicación
```
npm start
```

Endpoint para Crear Usuario
```
http://localhost:PORT/api/usuarios
```

Endpoint para Actualizar Usuario
```
http://localhost:PORT/api/usuarios/ID
```

Endpoint para Eliminado Logico de Usuario
```
http://localhost:PORT/api/usuarios/ID
```

Endpoint para Obtener los Usuarios - Paginado

Limite = La cantidad de registros que quieres traer

Desde = Desde que registro quieres traer
```
http://localhost:PORT/api/usuarios?limite=7&desde=4
```