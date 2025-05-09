import express from "express";
import upload from "../Utils/uploadFile.js";
import { deleteFile, uploadCn } from "../Controllers/uploadCn.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const uploadRouter = express.Router();

uploadRouter
  .route("/")
  .post(isAdmin, upload.single("file"), uploadCn)
  .delete(isAdmin, deleteFile);

export default uploadRouter;
