import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: [true, "title already exists"],
      trim: true,
    },
    description: {
      type: String,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    director: {
      type: String,
      required: [true, "Director is required"],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    releaseDate: {
      type: Date,
      required: [true, "Release Date is required"],
    },
    posterUrl: { type: String },
    trailerUrl: { type: String },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
