import { Schema, model, models } from "mongoose";

const watchlistSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    movieID: { type: String, required: true },
    movieTitle: { type: String, required: true },
    moviePoster: { type: String, required: true },
    movieReleaseDate: { type: String, required: true },
    movieBanner: { type: String, required: true },
    type: { type: String, enum: ["movie", "tv"], required: true },
    movieOverview: { type: String, required: true },
    isWatched: { type: Boolean, default: false },
    userRating: { type: Number, min: 0, max: 10, default: null },
    watchedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);


const Watchlist = models.Watchlist || model("Watchlist", watchlistSchema);
export default Watchlist;
