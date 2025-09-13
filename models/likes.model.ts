import { Schema, model, models } from "mongoose";

const likeSchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postID: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true, versionKey: false }
);

likeSchema.index({ userID: 1, postID: 1 }, { unique: true });

const Likes = models.Likes || model("Likes", likeSchema);
export default Likes;
