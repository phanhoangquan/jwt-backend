import express from "express";
import { handleHomePage ,handleAboutPage } from "../controller/homeController.js";

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", handleHomePage);
    router.get("/about", handleAboutPage)

    return app.use("/", router)
}

export default initWebRoutes;