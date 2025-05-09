import mongoose from "mongoose";

const hallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "title already exists"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, " location is required"],
    },
    /* number of seats in the hall */
    totalSeats: {
      type: Number,
      required: [true, "total seats is required"],
    },
    rows: Number,
    columns: Number,
  },
  { timestamps: true }
);

const Hall = mongoose.model("Hall", hallSchema);

export default Hall;
