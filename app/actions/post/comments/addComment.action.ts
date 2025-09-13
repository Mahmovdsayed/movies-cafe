"use server";

import { authorizeUser, errResponse, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Comments from "@/models/comments.model";
import Post from "@/models/posts.model";
import User from "@/models/User.model";
import { RepostValidationSchema } from "@/validations/post/RepostValidation";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function addCommentAction(
  formData: FormData,
  postID: string,
  userID: string
) {
  try {
    if (!userID || !postID) return errResponse("ID is required");
    if (!isValidObjectId(userID) || !isValidObjectId(postID))
      return errResponse("Invalid ID");

    await connectToDatabase();

    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const currentUser = await User.findById(user.id);
    if (!currentUser)
      return errResponse("You must be logged in to comment on this post!");

    const post = await Post.findById(postID);
    if (!post) return errResponse("Post not found!");

    const content = formData.get("comment") as string;
    if (!content) return errResponse("Comment content is required!");

    try {
      await RepostValidationSchema.validate({ content }, { abortEarly: true });
    } catch (error: any) {
      return errResponse(error.errors[0]);
    }

    const newComment = {
      userID,
      postID,
      content,
    };

    const createdComment = await Comments.create(newComment);

    await Post.findByIdAndUpdate(postID, {
      $push: { comments: createdComment._id },
    });

    revalidateTag("post-discover");
    return successResponse("Comment added successfully!");
  } catch (error) {
    return errResponse("Something went wrong while commenting on the post!");
  }
}
