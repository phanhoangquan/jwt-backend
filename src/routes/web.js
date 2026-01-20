import express from 'express';
import {
   handleCreateUser,
   handleHomePage,
   handleUserPage,
   handleDeleteUser,
   handleUpdateUserPage,
   handleUpdateUser,
} from '../controller/homeController.js';
import { handleTestApi } from '../controller/apiController.js';

const router = express.Router();

const initWebRoutes = (app) => {
   router.get('/', handleHomePage);
   router.get('/user', handleUserPage);
   router.post('/user/create-user', handleCreateUser);
   router.post('/delete-user/:id', handleDeleteUser);
   router.get('/update-user/:id', handleUpdateUserPage);
   router.post('/user/update-user', handleUpdateUser);

   return app.use('/', router);
};

export default initWebRoutes;
