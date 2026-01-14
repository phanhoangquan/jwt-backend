import bcrypt from 'bcryptjs';
import mysql from 'mysql2';

const salt = bcrypt.genSaltSync(10);

//create connection to database
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   database: 'jwt',
});

export const hashPassword = (userPassword) => {
   let hashPassword = bcrypt.hashSync(userPassword, salt);
   return hashPassword;
};

export const createNewUser = (email, username, password) => {
   let hassPass = hashPassword(password);
   connection.query(
      'INSERT INTO users (email,password,username) VALUES (?,?,?)',
      [email, hassPass, username],
      (err, results) => {
         if (err) console.log(err);
      },
   );
};

export const getAllUsers = () => {
   connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
         console.log(err);
      }
      return results;
   });
};
