// import { catchAsync , HandleERROR } from "vanta-api";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./Routes/auth.js";
import uploadRouter from "./Routes/upload.js";
import { catchError, HandleERROR } from "vanta-api";
import jwt  from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("Public"));

app.use("/api/v1/auth", authRouter);
app.use((req, res, next) => {
  try {
    const { id } = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET_KWT
    );
    req.userId = id;
    next(); // go to next middleware
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "You must be login",
    });
  }
});
app.use("/api/v1/upload", uploadRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use((req, res, next) => {
  return next(new HandleERROR("Route not found"), 404);
});
app.use(catchError);
export default app;
