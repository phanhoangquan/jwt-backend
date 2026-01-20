import 'dotenv/config';
import cors from 'cors';

const configCors = (app) => {
   // CORS config
   app.use(
      cors({
         origin: process.env.REACT_URL, // frontend
         credentials: true, // dùng cookie / JWT
      }),
   );
};

export default configCors;
