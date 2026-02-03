import db from '../models';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

export const hashPassword = (userPassword) => {
   let hashPassword = bcrypt.hashSync(userPassword, salt);
   return hashPassword;
};

export const checkEmail = async (email) => {
   // Check email exist if have in database
   let isExist = await db.User.findOne({ where: { email: email } });
   if (isExist) {
      return true;
   } else {
      return false;
   }
};

export const checkPhone = async (phone) => {
   // Check Phone exist if have in database
   let isExist = await db.User.findOne({ where: { phone: phone } });
   if (isExist) {
      return true;
   } else {
      return false;
   }
};

export const registerUser = async (userData) => {
   //check email , phone
   let isEmailExist = await checkEmail(userData.email);
   if (isEmailExist) {
      return {
         EM: 'Email is already exist',
         EC: '1',
      };
   }
   let isPhoneExist = await checkPhone(userData.phone);
   if (isPhoneExist) {
      return {
         EM: 'Phone number is already exist',
         EC: '1',
      };
   }
   //hash password
   let hassPassword = hashPassword(userData.password);
   //create new user
   await db.User.create({
      email: userData.email,
      username: userData.username,
      phone: userData.phone,
      password: hassPassword,
   });

   return {
      EM: 'User registered successfully',
      EC: '0',
   };
};

const checkPassword = (inputPassword, hashPassword) => {
   return bcrypt.compareSync(inputPassword, hashPassword);
};

export const handleUserLogin = async (rawData) => {
   try {
      let user = await db.User.findOne({
         where: {
            [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
         },
      });
      if (user) {
         let isCorrectPassword = checkPassword(rawData.password, user.password);
         if (isCorrectPassword) {
            return {
               EM: 'ok',
               EC: '0',
               ED: '',
            };
         }
      }
      return {
         EM: 'Your email/phone number or password is incorrect',
         EC: '1',
         ED: '',
      };
   } catch (error) {}
};
