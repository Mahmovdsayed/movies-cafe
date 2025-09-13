import { Schema, model, models } from "mongoose";

const commentsSchema = new Schema(
  {
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postID: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Comments = models.Comments || model("Comments", commentsSchema);
export default Comments;
