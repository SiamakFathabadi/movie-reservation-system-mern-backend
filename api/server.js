import mongoose from "mongoose";
import app, { __dirname } from "./app.js"; // Adjust the path if 'app.js' is in a different directory
import dotenv from "dotenv"; // Import the dotenv module
dotenv.config({ path: `${__dirname}/config.env` });
mongoose.connect(process.env.DATA_BASE).then(() => {
  console.log("Database connection successful");

  // Start the server after successful DB connection
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.error("Database connection error:", err);
  process.exit(1); // Exit process with failure
});
