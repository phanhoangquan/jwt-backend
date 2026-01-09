import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';
require ('dotenv').config();    

const app = express();
const PORT = process.env.PORT || 8080;

//Config view engine
configViewEngine(app);

//Init web routes
initWebRoutes(app);

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
})