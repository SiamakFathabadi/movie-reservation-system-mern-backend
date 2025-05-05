import mongoose from "mongoose";

const showTimeSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    hallId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hall",
      required: true,
    },
    startTime: {
      type: Date,
      required: [true, "StartTime is required"],
    },
    endTime: {
      type: Date,
      required: [true, "Endtime is required"],
    },
  },
  { timestamps: true }
);

const ShowTime = mongoose.model("ShowTime", showTimeSchema);

export default ShowTime;
