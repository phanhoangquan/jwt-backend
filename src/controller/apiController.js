export const handleTestApi = (req, res) => {
   return res.status(200).json({
      message: 'API is working properly',
      data: 'test data',
   });
};

export const handleRegister = (req, res) => {
   console.log('Register data:', req.body);
};
