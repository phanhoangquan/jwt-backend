import express from 'express';
import { handleTestApi, handleRegister, handleLogin } from '../controller/apiController.js';
import { handleRead, handleDelete, handleCreate } from '../controller/userController.js';
import { handleGetGroups } from '../controller/groupController.js';

const router = express.Router();

const initApiRoutes = (app) => {
   //REST API
   router.get('/test-api', handleTestApi);
   router.post('/register', handleRegister);
   router.post('/login', handleLogin);

   router.get('/users/read', handleRead);
   router.get('/group/read', handleGetGroups);
   router.delete('/users/delete', handleDelete);
   router.post('/users/create', handleCreate);
   // router.put('/users/update', handleUpdate);

   return app.use('/api/v1/', router);
};

export default initApiRoutes;
