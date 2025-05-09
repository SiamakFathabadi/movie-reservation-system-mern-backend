import { min } from "lodash";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username already exists"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "This email already exists"],
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address",
      ],
      select: false,// Hide email in the response
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password should be at least 8 characters"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter a phone number"],
      unique: [true, "This phone number already exists"],
      match: [/^\d{10,15}$/, "Invalid phone number"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
