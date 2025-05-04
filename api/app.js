import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./Routes/auth.js";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
// app.use("core")
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static('Public'))

app.use('/api/v1/auth',authRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
export default app;
