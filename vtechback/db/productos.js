const { getConnection } = require('./db');
const{generateError} = require('../helpers');


const createProduct = async (usuario_id, nombre, descripcion, precio, imagen = '',categoria,localidad,estadoVenta,fecha) => {
    let connection;
  
    try {
      connection = await getConnection();
  
      const [result] = await connection.query(
        `
        INSERT INTO productos (usuario_id,nombre,descripcion,precio,imagen,categoria,localidad,estado_venta,fecha)
        VALUES(?,?,?,?,?,?,?,?,?);
      `,
        [usuario_id,nombre,descripcion,precio,imagen,categoria,localidad,estadoVenta,fecha]
      );
  
      return result.insertId;
    } finally {
      if (connection) connection.release();
    }
  };
  const getProductByNombre = async (nombre) => {
    let connection;
  
    try {
      connection = await getConnection();
  
      const [result] = await connection.query(
        `
        SELECT nombre,imagen,descripcion,categoria,precio,localidad,id,estado_venta FROM productos WHERE (INSTR(nombre,?) > 0)
        `,
        [nombre]
      );
  
      if (result.length === 0) {
        throw generateError(`El Producto con Nombre: ${nombre} no existe`, 404);
      }
  
      return result;
    } finally {
      if (connection) connection.release();
    }
  };

  const searchProduct = async (userId,productoId,sellerId) => {
    let connection;
    let estadoVenta = "Pendiente aceptar";

     try {

      if(userId === sellerId){
        throw generateError(`No puedes comprar tus propios productos`, 401);
      }
      else{
    connection = await getConnection();

    const [result] = await connection.query(
      `
     UPDATE productos SET estado_venta = ?, comprador_id = ? WHERE id = ?
    `,
      [estadoVenta,userId,productoId]
    );

    return result.insertId;
  }
  } finally {
    if (connection) connection.release();
  }
  };
  const soldProduct = async (productoId,fecha,sellerId) => {
    let connection;
    let estadoVenta = "Vendido";
     try {
    connection = await getConnection();
    
    await connection.query(
      `
     UPDATE productos SET estado_venta = ?, fecha = ?  WHERE id = ?
    `,
      [estadoVenta,fecha,productoId]
    );} finally {
    if (connection) connection.release();
  }};

  const noSoldProduct = async (productoId) => {
    let connection;
    let estadoVenta = "Disponible";
    console.log(productoId);
     try {
      
    connection = await getConnection();
    
    await connection.query(
      `
     UPDATE productos SET estado_venta = ? WHERE id = ?
    `,
      [estadoVenta,productoId]
    );} finally {
    if (connection) connection.release();
  }};

  const userProduct = async (productoId) => {
    let connection;
    try{
    connection = await getConnection();
    const [seller] = await connection.query(
      `
       SELECT usuario_id FROM productos WHERE id = ?
    `,
      [productoId]
    );
    
    return seller;
    
  } finally {
    if (connection) connection.release();
  }};
  const getProducts = async () => {
    let connection;
    try{
    connection = await getConnection();
  
    const [result] = await connection.query(
      `
     SELECT nombre,imagen,precio,id,usuario_id,comprador_id,estado_venta FROM productos
     `
    );

    if (result.length === 0) {
      throw generateError(`No hay productos en la base de datos`, 404);
    }

    return result;
  } finally {
    if (connection) connection.release();
  }};
  const getProduct = async (id) => {
    let connection;
    try{
    connection = await getConnection();
  
    const [result1] = await connection.query(
      `
      SELECT nombre,usuario,usuario_id,avatar,descripcion,precio,productos.fecha,imagen,localidad,categoria,productos.id,productos.estado_venta,productos.comprador_id FROM usuarios INNER JOIN productos ON usuarios.id = productos.usuario_id WHERE productos.id= ?;
     `,[id]
    );
  

    if (result1.length === 0) {
      throw generateError(`No existe este producto`, 404);
    }

    return result1;
  } finally {
    if (connection) connection.release();
  }};
  const deleteProductById = async (id) => {
    let connection;
  
    try {
      connection = await getConnection();
  
      await connection.query(
        `
        DELETE FROM productos WHERE id = ?
      `,
        [id]
      );
  
      return;
    } finally {
      if (connection) connection.release();
    }
  };
  const getProductsUser = async (id) => {
    connection = await getConnection();
  
    const [result] = await connection.query(
      `
    SELECT * FROM productos WHERE usuario_id = ?
     `,[id]
    );
  

    if (result1.length === 0) {
      throw generateError(`El usuario no tiene productos subidos`, 404);
    }

    return result;

  }
 
  module.exports = {
    createProduct,
    getProductsUser,
    getProductByNombre,
    searchProduct,
    soldProduct,
    userProduct,
    getProducts,
    getProduct,
    deleteProductById,
    noSoldProduct,
  };
