# VTECH 

Este proyecto consiste en crear una API que simule el funcionamiento de una aplicación similar a Wallapop.

## Instalar

- Crear una base de datos vacía en una instancia de MySQL local.
- Guardar el archivo `.env` y cubrir los datos necesarios.
- Ejecutar `node db/initDB` para crear las tablas necesarias en la base de datos anteriormente creada.
- Ejecutar `npm start` para lanzar el servidor.

## Entidades

- Usuarios:
  - id
  - email
  - password
  - fecha
  - biografia
  - avatar
- Productos:
  - id
  - nombre
  - usuario_id
  - image 
  - decripcion
  - fecha
  - categoria
  - localidad
  - comprador_id
  - precio
  - estado_venta
  - ubicacion_venta

## Endpoints

La colección de endpoints funcionando para postman 
https://api.postman.com/collections/24930101-6d859b18-0465-482c-b5b7-456d3db19384?access_key=PMAT-01GPCC0P8HCCDW2VR903JNNW34

Usuarios:

- **POST /register** Registro de usuario
- **POST /login** Logea al usuario devolviendo un token
- **POST /user/update** Sube la nueva informacion del usuario (avatar,biografia) necesita TOKEN
- **GET /usuario/:id** Mostrar informacion del usuario perfil publico
- **GET /user** Mostrar mi propio perfil con auth

Productos:
- **POST /producto/vendido/:id** Aceptación de la compra y fecha
- **POST /producto/compra/:id** Solicitud de compra del comprador
- **GET /** Mostrar todos los productos
- **GET productoId/:id** Buscar un producto por id del producto
- **GET /productoIdUser** Buscar todos los productos por id del usuario
- **GET /productoNombre/:nombre** Busqueda por nombre del producto
- **DELETE /tweet/:id** Borra un tweet solo si eres quien lo creó (necesita cabecera con token)
