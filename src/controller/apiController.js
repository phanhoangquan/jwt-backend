import { registerUser } from '../services/loginRegisterService.js';

export const handleTestApi = (req, res) => {
   return res.status(200).json({
      message: 'API is working properly',
      data: 'test data',
   });
};

export const handleRegister = async (req, res) => {
   try {
      if (!req.body.email || !req.body.username || !req.body.password) {
         return res.status(400).json({ EM: 'Missing required fields', EC: '1', DT: '' });
      }
      if (req.body.password && req.body.password.length < 6) {
         return res.status(400).json({ EM: 'Password must be at least 6 characters', EC: '1', DT: '' });
      }

      // Service create user
      let data = await registerUser(req.body);

      return res.status(200).json({ EM: data.EM, EC: data.EC, DT: '' });
   } catch (e) {
      return res.status(500).json({ EM: 'Internal Server Error', EC: '-1', DT: '' });
   }
   console.log('Register data:', req.body);
};
