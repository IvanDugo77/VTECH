const bcrypt = require('bcrypt');
const { getConnection } = require('./db');
const { generateError } = require('../helpers');


// Crea un usuario en la base de datos y devuelve su id por consola
const createUser = async (user, email, password, fecha) => {
    let connection;
  
    try {
      connection = await getConnection();
      //Comprueba si ya existe el usuario
      const [query] = await connection.query(
        `
        SELECT id FROM usuarios WHERE email = ?
      `,
        [email]
      );
      if (query.length > 0) {
        throw generateError(
          'Ya hay un usuario con este e-mail.',
          409
        );
      }
      //Encriptar la password
      const passwordHash = await bcrypt.hash(password, 8);

      //Si el Usuario a confirmado el registro, se introduce en la bbdd
  
      //Crear el usuario
      const [newUser] = await connection.query(
        `
        INSERT INTO usuarios (usuario,email, password,fecha) VALUES(?,?,?,?)
      `,
        [user, email, passwordHash,fecha]
      );

      //Devolver la id
      return newUser.insertId;
    } finally {
      if (connection) connection.release();
    }
  };
  const getUserByEmail = async (email) => {
    let connection;
  
    try {
      connection = await getConnection();
  
      const [result] = await connection.query(
        `
        SELECT * FROM usuarios WHERE email = ?
      `,
        [email]
      );
  
      if (result.length === 0) {
        throw generateError('No hay ningún usuario registrado con ese email', 404);
      }
      return result[0];
    } finally {
      if (connection) connection.release();
    }
  };
  
  const modifyUser = async (userId,biografia, avatar) => {
    let connection;
    try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
     UPDATE usuarios SET biografia = ?, avatar = ? WHERE ID = ?
    `,
      [biografia,avatar,userId]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }};
  const getUser = async (id) => {
    let connection;
    try{
    connection = await getConnection();
  
    const [result] = await connection.query(
      `
      SELECT usuario,biografia,avatar,fecha,id,email FROM usuarios WHERE id = ?
     `,[id]
    );
  

    if (result.length === 0) {
      throw generateError(`No existe este usuario`, 404);
    }

    return result;
  } finally {
    if (connection) connection.release();
  }
  };

  const getMyUser = async (id) => {
    let connection;
    try{
    connection = await getConnection();
  
    const [result] = await connection.query(
      `
      SELECT usuario,biografia,avatar,fecha,email,id FROM usuarios WHERE id = ?
     `,[id]
    );
  

    if (result.length === 0) {
      throw generateError(`No existe este usuario`, 404);
    }

    return result;
  } finally {
    if (connection) connection.release();
  }
  }

  module.exports = {
    createUser,
    getUserByEmail,
    modifyUser,
    getUser,
    getMyUser,
  };