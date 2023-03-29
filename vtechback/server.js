//Paquetes de librerias npm
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require("express-fileupload");



//Importación de controladores de usuarios

const {newUserController,loginController,getMyUserController,getUserController,userUpdateController} = require('./controllers/usuarios');
//Importación de controladores de productos

const {newProductController,getProductController,noSoldProductcontroller,getProductsUserController,deleteProductController,getProductNameController,getProductsController,getProductPriceController,getProductCategoryController,getProductLocationController,buyProductController,soldProductcontroller} = require('./controllers/productos');

//Importación de la carpeta middleware auth

const {authUser} = require('./middlewares/auth');

//Define express como app
const app = express();

//middleware para procesar los archivos json que llegan del req.body
app.use(express.json());

//middleware para decodificar ficheros subidos como imagenes desde form-data
app.use(fileUpload());

//middleware visualizador tiempo de respuesta y petición
app.use(morgan('dev'));

//middleware para utilizar base de datos en diferente puerto
app.use(cors());

//middleware para visualizar imagenes en uploads
app.use('/uploads', express.static('./uploads'));
//middleware para visualizar imagenes en avatar
app.use('/avatars', express.static('./avatars'));

//Endpoints

//Crear usuario nuevo
app.post('/register',newUserController);
//Logear usuario registrado
app.post('/login',loginController);
//Update datos biografia y foto de perfil
app.post('/user/update',authUser,userUpdateController);
//Crear producto y almacenar en bbdd
app.post('/producto',authUser,newProductController);

//Mostrar informacion del usuario perfil publico
app.get('/usuario/:id',getUserController);
//Mostrar mi propio perfil con auth
app.get('/user',authUser,getMyUserController);

//Mostrar todos los productos
app.get('/',getProductsController);
//Buscar un producto por id del producto
app.get('/productoId/:id',getProductController);
//Buscar todos los productos por id del usuario
app.get('/productoIdUser',authUser,getProductsUserController)
//Busqueda por nombre
app.get('/productoNombre/:nombre',getProductNameController);
//Solicitud de compra del comprador
app.post('/producto/compra/:id' ,authUser,buyProductController);

//Aceptación de la compra y fecha
app.post('/producto/vendido/:id',soldProductcontroller);
//No aceptacion de la compra y fecha
app.post('/producto/noVendido/:id',noSoldProductcontroller);

//eliminar productos de la base de datos
app.delete('/delproducto/:id', authUser, deleteProductController);
//Middleware de para fallos 404
app.use((req,res) => {
    res.status(404).send({
        status:'error',
        message:'not found',
    });
});

//Middleware para otros posibles fallos
app.use((error,req,res,next) =>{
    console.error(error);
    res.status(error.httpStatus || 500).send({
        status:'error',
        message: error.message,
    });
});

//Puerto de escucha 3006
app.listen(3006, () => {
    console.log('Servidor conectado');
});