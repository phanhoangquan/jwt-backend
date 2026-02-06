import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import bodyParser from 'body-parser';
import configCors from './config/cors.js';
import 'dotenv/config';
import { createJWT, verifyToken } from './middleware/JWTAction.js';

// import connection from './config/connectDB';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

//Config cors
configCors(app);
//Config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Test the connection to the database
// connection();

//test JWT
createJWT();
let data = verifyToken(
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSG9hbmcgUXVhbiIsImFkZHJlc3MiOiJIYSBUaW5oIiwiaWF0IjoxNzcwMzkyODU1fQ.BiVWRWRgDrACamJ_59lAblETgiTCglPWUr5xjoOmZ24',
);
console.log(data);

//Init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
   console.log(`Server is running on port: http://localhost:${PORT}`);
});
