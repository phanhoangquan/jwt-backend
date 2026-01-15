import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import Bluebird from 'bluebird';
import db from '../models';

const salt = bcrypt.genSaltSync(10);

//create connection to database

export const hashPassword = (userPassword) => {
   let hashPassword = bcrypt.hashSync(userPassword, salt);
   return hashPassword;
};

export const createNewUser = async (email, username, password) => {
   let hassPass = hashPassword(password);
   try {
      await db.User.create({
         email: email,
         username: username,
         password: hassPass,
      });
   } catch (err) {
      console.log(err);
   }
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
      const [result, fields] = await connection.execute('SELECT * FROM user');
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
   const [result, fields] = await connection.execute('SELECT * FROM user WHERE id = ?', [userId]);
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
      const [result, fields] = await connection.execute('DELETE FROM user WHERE id = ?', [userId]);
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
      const [result, fields] = await connection.execute('UPDATE user SET email=? , username=? WHERE id = ?', [
         email,
         username,
         id,
      ]);
   } catch (err) {
      console.log(err);
   }
};
