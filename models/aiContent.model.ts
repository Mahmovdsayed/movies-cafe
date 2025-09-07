import { Schema, model, models } from "mongoose";

const aiContentSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    
    content: { type: String, required: true },

    movieInfo: {
      movieID: { type: String, default: null },
      movieTitle: { type: String, default: null },
      moviePoster: { type: String, default: null },
      movieReleaseDate: { type: String, default: null },
      movieBanner: { type: String, default: null },
      movieOverview: { type: String, default: null },
      movieType: { type: String, enum: ["movie", "tv"], default: null },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AiContent = models.AiContent || model("AiContent", aiContentSchema);

export default AiContent;
