import { createNewUser, getAllUsers } from '../services/userService';

export const handleHomePage = (req, res) => {
   return res.render('home.ejs');
};

export const handleUserPage = (req, res) => {
   return res.render('user.ejs');
};

export const handleCreateUser = (req, res) => {
   const email = req.body.email;
   const username = req.body.username;
   const password = req.body.password;
   createNewUser(email, username, password);

   return res.send('Create user successfully!');
};
