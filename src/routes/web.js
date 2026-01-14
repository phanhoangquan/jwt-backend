import express from 'express';
import { handleCreateUser, handleHomePage, handleUserPage, handleDeleteUser } from '../controller/homeController.js';

const router = express.Router();

const initWebRoutes = (app) => {
   router.get('/', handleHomePage);
   router.get('/user', handleUserPage);
   router.post('/user/create-user', handleCreateUser);
   router.post('/delete-user/:id', handleDeleteUser);

   return app.use('/', router);
};

export default initWebRoutes;
