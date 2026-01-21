import db from '../models';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
   let hashPassword = bcrypt.hashSync(userPassword, salt);
   return hashPassword;
};

const checkEmail = async (email) => {
   // Check email exist if have in database
   let isExist = await db.User.findOne({ where: { email: email } });
   if (isExist) {
      return true;
   } else {
      return false;
   }
};

const checkPhone = async (phone) => {
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
