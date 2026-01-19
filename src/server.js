import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

// import connection from './config/connectDB';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS config
app.use(
   cors({
      origin: process.env.REACT_URL, // frontend
      credentials: true, // dùng cookie / JWT
   }),
);

//Config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Test the connection to the database
// connection();

//Init web routes
initWebRoutes(app);

app.listen(PORT, () => {
   console.log(`Server is running on port: http://localhost:${PORT}`);
});
