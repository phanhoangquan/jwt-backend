require('dotenv').config;
import jwt from 'jsonwebtoken';

export const createJWT = () => {
   let payload = { name: 'Hoang Quan', address: 'Ha Tinh' };
   let key = process.env.JWT_SECRET;
   let token = null;
   try {
      token = jwt.sign(payload, key);
   } catch (error) {
      console.log(error);
   }
   console.log(token);
   return token;
};

export const verifyToken = (token) => {
   let key = process.env.JWT_SECRET;
   let data = null;
   try {
      let decoded = jwt.verify(token, key);
      data = decoded;
   } catch (error) {
      console.log(error);
   }
   return data;
};
