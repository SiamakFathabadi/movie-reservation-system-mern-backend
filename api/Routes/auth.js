import express from "express";
import { register, login } from "../Controllers/authCn.js";
const authRouter = express.Router();

authRouter.route("/").post(login);
authRouter.route("/register").post(register);

export default authRouter;
