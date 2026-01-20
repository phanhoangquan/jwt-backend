import express from 'express';
import { handleTestApi, handleRegister } from '../controller/apiController.js';

const router = express.Router();

const initApiRoutes = (app) => {
   //REST API
   router.get('/test-api', handleTestApi);
   router.post('/register', handleRegister);

   return app.use('/api/v1/', router);
};

export default initApiRoutes;
