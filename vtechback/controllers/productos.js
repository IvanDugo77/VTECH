const { generateError, createPathIfNotExists } = require('../helpers');
const {createProduct,noSoldProduct,getProductByNombre,getProductsUser,deleteProductById, getProducts,getProduct,searchProduct,soldProduct,userProduct} = require('../db/productos');


const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');

const newProductController = async (req, res, next) => {
    try {
      const {nombre,descripcion,precio,categoria,localidad } = req.body;

      const fecha = new Date().toLocaleDateString();

      if(!nombre || !descripcion || !precio || !categoria || !localidad) {
        throw generateError('Debes rellenar todos los campos',400)
      }

      console.log(req.files);
      let imageFileName;
      if (req.files && req.files.image) {
        // Creo el path del directorio uploads
        const uploadsDir = path.join(__dirname, '../uploads');
        // Creo el directorio 
        await createPathIfNotExists(uploadsDir);
        const image = sharp(req.files.image.data);
        image.resize(1000);
        //Guardar con nombre aleatorio
        imageFileName = `${nanoid(24)}.jpg`;
  
        await image.toFile(path.join(uploadsDir, imageFileName));
      }
      
let estadoVenta = "Disponible";
      const id = await createProduct(req.usuario_id, nombre, descripcion, precio, imageFileName,categoria,localidad,estadoVenta,fecha);
  
      res.send({
        status: 'ok',
        message: `Producto con id: ${id} creado correctamente`,
      });
    } catch (error) {
      next(error);
    }
  };
const getProductNameController = async (req, res, next) => {
  try {
    const { nombre } = req.params;
    const producto = await getProductByNombre(nombre);

    res.send({
      status: 'ok',
      data: producto,
    });
  } catch (error) {
    next(error);
  }
};

const buyProductController = async (req, res, next) => {
  try {
    const {id} = req.params;

   
    if(!id) {
      throw generateError('No existe ese producto en la base de datos',400)
    }
     const seller = await userProduct(id);
     await searchProduct(req.usuario_id,id,seller[0].usuario_id);
    res.send({
      status: 'ok',
      message: 'Su petición de compra se ha enviado',
    });
  } catch (error) {
    next(error);
  }
}
const soldProductcontroller = async (req, res, next) => {
  try {
    const {id} = req.params;
    const fecha = new Date();
    if(!id) {
      throw generateError('No existe ese producto en la base de datos',400)
    }
    const seller = await userProduct(id);
     await soldProduct(id,fecha,seller[0].usuario_id);

    res.send({
      status: 'ok',
      message: `Has aceptado la venta`,
    });
  } catch (error) {
    next(error);
  }};

  const noSoldProductcontroller = async (req, res, next) => {
    try {
      const {id} = req.params;
      if(!id) {
        throw generateError('No existe ese producto en la base de datos',400)
      }
      await noSoldProduct(id);
      res.send({
        status: 'ok',
        message: `Has denegado la venta`,
      });
    } catch (error) {
      next(error);
    }};

const getProductsController = async (req, res, next) => {
    try {
      const productos = await getProducts();
  
      res.send({
        status: 'ok',
        data: productos,
      });
    } catch (error) {
      next(error);
    }
  };
const getProductController = async (req, res, next) => {
    try {
      const {id} = req.params;
      const productos = await getProduct(id);
      res.send({
        status: 'ok',
        data: productos})
    } catch (error) {
      next(error);
    }
  };
const deleteProductController = async (req, res, next) => {
    try {
    
      const { id } = req.params;

      const producto = await userProduct(id);

      console.log(producto);

      if (req.usuario_id !== producto[0].usuario_id) {
        throw generateError(
          'Estás intentando borrar un producto que no es tuyo',
          401
        );
      }
  
      await deleteProductById(id);
  
      res.send({
        status: 'ok',
        message: `El Producto fue borrado`,
      });
    } catch (error) {
      next(error);
    }
  };
  const getProductsUserController = async (req, res, next) => {
    try {
      
      const productos = await getProductsUser(req.usuario_id);
      res.send({
        status: 'ok',
        data: productos})
    } catch (error) {
      next(error);
    }
  };

  module.exports = {
    getProductController,
    getProductsUserController,
    newProductController,
    getProductNameController,
    soldProductcontroller,
    buyProductController,
    getProductsController,
    deleteProductController,
    noSoldProductcontroller,
  };
