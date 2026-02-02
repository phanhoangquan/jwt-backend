import { getAllUsers, getUserWithPagination, deleteUsers, createNewUsers } from '../services/userApiService';

export const handleRead = async (req, res) => {
   try {
      if (req.query.page && req.query.limit) {
         let page = req.query.page;
         let limit = req.query.limit;
         let data = await getUserWithPagination(+page, +limit);
         return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
         });
      } else {
         let data = await getAllUsers();
         return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
         });
      }
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         EM: 'error from server',
         EC: '-1',
         DT: '',
      });
   }
};

export const handleCreate = async (req, res) => {
   try {
      //validate
      let data = await createNewUsers(req.body);
      return res.status(200).json({
         EM: data.EM,
         EC: data.EC,
         DT: data.DT,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         EM: 'error from server',
         EC: '-1',
         DT: '',
      });
   }
};
export const handleUpdate = async (req, res) => {
   try {
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         EM: 'error from server',
         EC: '-1',
         DT: '',
      });
   }
};
export const handleDelete = async (req, res) => {
   try {
      let data = await deleteUsers(req.body.id);
      return res.status(200).json({
         EM: data.EM,
         EC: data.EC,
         DT: data.DT,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         EM: 'error from server',
         EC: '-1',
         DT: '',
      });
   }
};
