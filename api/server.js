import mongoose from "mongoose";
import app, { __dirname } from "./app.js"; // Adjust the path if 'app.js' is in a different directory
import dotenv from "dotenv";

dotenv.config({ path: `${__dirname}/config.env` });

mongoose
  .connect(process.env.DATA_BASE)
  .then(() => {
    console.log("🐱‍🏍 Database connection successful");

    // /* TEST => Insert a dummy document so MongoDB shows the DB in Compass */
    // mongoose.connection.db
    //   .collection("test")
    //   .insertOne({ test: true })
    //   .then(() => console.log("Insert a dummy document so MongoDB shows the DB in Compass"))
    //   .catch((err) => console.error("Insert error:", err));
  })
  .catch((err) => {
    console.error("🐱‍🏍 Database connection error:", err);
    process.exit(1); // Exit process with failure
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
