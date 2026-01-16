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
   //Test connection to database with relationships
   let result = await db.User.findOne({
      where: { id: 1 },
      attributes: ['email', 'username'],
      raw: true,
      nest: true,
      include: { model: db.Group },
   });

   let role = await db.Role.findAll({
      include: { model: db.Group, where: { id: 1 } },
      raw: true,
      nest: true,
   });

   console.log(result);
   console.log(role);

   //
   let users = [];
   users = db.User.findAll();
   return users;
   // const connection = await mysql.createConnection({
   //    host: 'localhost',
   //    user: 'root',
   //    database: 'jwt',
   //    Promise: Bluebird,
   // });
   // try {
   //    const [result, fields] = await connection.execute('SELECT * FROM user');
   //    return result;
   // } catch (err) {
   //    console.log(err);
   //    return users;
   // }
};

export const getUserById = async (userId) => {
   let user = await db.User.findOne({
      where: { id: userId },
   });
   return user;
   // const connection = await mysql.createConnection({
   //    host: 'localhost',
   //    user: 'root',
   //    database: 'jwt',
   //    Promise: Bluebird,
   // });
   // const [result, fields] = await connection.execute('SELECT * FROM user WHERE id = ?', [userId]);
   // return result;
};

export const deleteUserById = async (userId) => {
   await db.User.destroy({
      where: { id: userId },
   });
   // const connection = await mysql.createConnection({
   //    host: 'localhost',
   //    user: 'root',
   //    database: 'jwt',
   //    Promise: Bluebird,
   // });
   // try {
   //    const [result, fields] = await connection.execute('DELETE FROM user WHERE id = ?', [userId]);
   // } catch (err) {
   //    console.log(err);
   // }
};

export const updateUserInfo = async (email, username, id) => {
   await db.User.update({ username: username, email: email }, { where: { id: id } });
   // const connection = await mysql.createConnection({
   //    host: 'localhost',
   //    user: 'root',
   //    database: 'jwt',
   //    Promise: Bluebird,
   // });
   // try {
   //    const [result, fields] = await connection.execute('UPDATE user SET email=? , username=? WHERE id = ?', [
   //       email,
   //       username,
   //       id,
   //    ]);
   // } catch (err) {
   //    console.log(err);
   // }
};
