import db from '../models/index';
import { hashPassword, checkEmail, checkPhone } from './loginRegisterService';

export const getAllUsers = async () => {
   try {
      let users = await db.User.findAll({
         attributes: ['id', 'username', 'email', 'phone', 'sex'],
         include: { model: db.Group, attributes: ['name', 'description'] },
         raw: true,
         nest: true,
      });
      return {
         EM: 'get data success',
         EC: 0,
         DT: users,
      };
   } catch (e) {
      console.log(e);
      return {
         EM: 'something wrong with services getAllUsers',
         EC: 1,
         DT: [],
      };
   }
};

export const getUserWithPagination = async (page, limit) => {
   try {
      let offset = (page - 1) * limit;
      const { count, rows } = await db.User.findAndCountAll({
         offset: offset,
         limit: limit,
         attributes: ['id', 'username', 'email', 'phone', 'sex'],
         include: { model: db.Group, attributes: ['name', 'description'] },
         order: [['id', 'DESC']],
      });
      let totalPages = Math.ceil(count / limit);
      let data = {
         totalRows: count,
         totalPages: totalPages,
         users: rows,
      };
      return {
         EM: 'get user success',
         EC: 0,
         DT: data,
      };
   } catch (e) {
      console.log(e);
      return {
         EM: 'something wrong with services getUserWithPagination',
         EC: 1,
         DT: [],
      };
   }
};

export const createNewUsers = async (data) => {
   try {
      let isEmailExist = await checkEmail(data.email);
      if (isEmailExist) {
         return {
            EM: 'Email is already exist',
            EC: '1',
            DT: 'email',
         };
      }
      let isPhoneExist = await checkPhone(data.phone);
      if (isPhoneExist) {
         return {
            EM: 'Phone number is already exist',
            EC: '1',
            DT: 'phone',
         };
      }
      //hash password
      let hassPassword = hashPassword(data.password);
      await db.User.create({ ...data, password: hassPassword });
      return {
         EM: 'Create User ok',
         EC: 0,
         DT: [],
      };
   } catch (e) {
      console.log(e);
      return {
         EM: 'Create User Services Error',
         EC: 1,
         DT: [],
      };
   }
};

export const updateUsers = async (data) => {
   try {
      let user = await db.User.findOne({ where: { id: data.id } });
      if (user) {
         //update
      } else {
         //not found user
      }
   } catch (e) {}
};

export const deleteUsers = async (id) => {
   try {
      let user = await db.User.findOne({
         where: { id: id },
      });
      if (user) {
         user.destroy();
         return {
            EM: 'Delete user success',
            EC: 0,
            DT: [],
         };
      } else {
         return {
            EM: 'user not exist',
            EC: 2,
            DT: [],
         };
      }
   } catch (e) {
      console.log(e);
      return {
         EM: 'error from services',
         EC: 1,
         DT: [],
      };
   }
};
