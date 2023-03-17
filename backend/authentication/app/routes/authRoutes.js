import express from "express";
import appController from "../controller/authController.js";
import { AUTHENTICATE } from "../middlewares/authentication.js";
const appRouter = express.Router();

appRouter.route("/register").post(appController.register);
appRouter.route("/login").post(appController.login);
appRouter.route("/me").get(AUTHENTICATE, appController.profile);

export default appRouter;
