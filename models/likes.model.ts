import { Schema, model, models } from "mongoose";

const likeSchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postID: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true, versionKey: false }
);


const Likes = models.Likes || model("Likes", likeSchema);
export default Likes;
