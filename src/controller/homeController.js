import { createNewUser, getAllUsers, deleteUserById, getUserById, updateUserInfo } from '../services/userService';

export const handleHomePage = (req, res) => {
   return res.render('home.ejs');
};

export const handleUserPage = async (req, res) => {
   let users = await getAllUsers();
   return res.render('user.ejs', { users });
};

export const handleCreateUser = (req, res) => {
   const email = req.body.email;
   const username = req.body.username;
   const password = req.body.password;
   createNewUser(email, username, password);
   res.redirect('/user');
};

export const handleDeleteUser = async (req, res) => {
   const userId = req.params.id;
   await deleteUserById(userId);
   res.redirect('/user');
};

export const handleUpdateUserPage = async (req, res) => {
   const userId = req.params.id;
   const user = await getUserById(userId);
   let userData = {};
   if (user && user.length > 0) {
      userData = user[0];
   }
   res.render('user-update.ejs', { user: userData });
};

export const handleUpdateUser = async (req, res) => {
   let { email, username, id } = req.body;
   await updateUserInfo(email, username, id);
   res.redirect('/user');
};
