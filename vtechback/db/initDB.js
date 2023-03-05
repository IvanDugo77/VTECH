//Importa configuracion del archivo env necesario para la apertura y acceso al servidor mysql
require('dotenv').config();
//Importacion la función getConnection del archivo db.js
const {getConnection} = require('./db');

//Borra si existe las tablas creadas y crea de nuevo las tablas, introduciendo los valores predefinidos en la tabla categoria.
async function main() {
    let connection;
//crea una conexión con mysql y posteriormente realiza las siguientes peticiónes a mysql
    try{
        connection = await getConnection();

        console.log('Borrando tablas');
        await connection.query('DROP TABLE IF EXISTS productos');
        await connection.query('DROP TABLE IF EXISTS usuarios');
        
        console.log('Creando tablas');
         await connection.query(`
         CREATE TABLE usuarios (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            usuario VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            fecha VARCHAR(50) NOT NULL,
            password VARCHAR(100) NOT NULL,
            biografia VARCHAR(250),
            avatar VARCHAR(300)
         )`);

         await connection.query(`
         CREATE TABLE productos (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            nombre VARCHAR(100) NOT NULL,
            usuario_id INT UNSIGNED NOT NULL,
            comprador_id INT UNSIGNED,
            fecha VARCHAR(50),
            ubicacion_venta VARCHAR(100),
            estado_venta VARCHAR(50),
            descripcion VARCHAR(500) NOT NULL,
            precio INT UNSIGNED NOT NULL,
            imagen VARCHAR(100) ,
            categoria VARCHAR(30) NOT NULL,
            localidad VARCHAR(30) NOT NULL,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
         )`);

    } catch(error){
        console.error(error);
    } //cierra el servidor despues de realizar el catch o el try
    finally{
        if(connection) connection.release();
        process.exit();
    }
}

//llamada a la función main
main();