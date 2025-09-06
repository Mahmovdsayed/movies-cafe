import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    movieID: { type: String, default: null },
    movieTitle: { type: String, default: null },
    moviePoster: { type: String, default: null },
    movieReleaseDate: { type: String, default: null },
    movieBanner: { type: String, default: null },
    movieOverview: { type: String, default: null },
    movieType: { type: String, enum: ["movie", "tv"], default: null },

    type: { type: String, enum: ["post", "repost"], required: true },
    content: { type: String, required: true },

    likes: [{ type: Schema.Types.ObjectId, ref: "Likes" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Post = models.Post || model("Post", postSchema);

export default Post;
