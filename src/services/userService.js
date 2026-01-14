import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import Bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

//create connection to database

export const hashPassword = (userPassword) => {
   let hashPassword = bcrypt.hashSync(userPassword, salt);
   return hashPassword;
};

export const createNewUser = async (email, username, password) => {
   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'jwt',
      Promise: Bluebird,
   });
   let hassPass = hashPassword(password);
   const [result, fields] = await connection.execute('INSERT INTO users (email,password,username) VALUES (?,?,?)', [
      email,
      hassPass,
      username,
   ]);
};

export const getAllUsers = async () => {
   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'jwt',
      Promise: Bluebird,
   });
   let users = [];
   try {
      const [result, fields] = await connection.execute('SELECT * FROM users');
      return result;
   } catch (err) {
      console.log(err);
      return users;
   }
};

export const getUserById = async (userId) => {
   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'jwt',
      Promise: Bluebird,
   });
   const [result, fields] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
   return result;
};

export const deleteUserById = async (userId) => {
   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'jwt',
      Promise: Bluebird,
   });
   try {
      const [result, fields] = await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
   } catch (err) {
      console.log(err);
   }
};

export const updateUserInfo = async (email, username, id) => {
   const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'jwt',
      Promise: Bluebird,
   });
   try {
      const [result, fields] = await connection.execute('UPDATE users SET email=? , username=? WHERE id = ?', [
         email,
         username,
         id,
      ]);
   } catch (err) {
      console.log(err);
   }
};
