"use server";

import { authorizeUser, errResponse, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Post from "@/models/posts.model";
import { RepostValidationSchema } from "@/validations/post/RepostValidation";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function updatePostAction(ID: string, formData: FormData) {
  try {
    if (!ID) return errResponse("ID is required");
    if (!isValidObjectId(ID)) return errResponse("Invalid ID");

    const [_, user] = await Promise.all([
      await connectToDatabase(),
      await authorizeUser(),
    ]);

    if (!user || "error" in user) return user;

    const post = await Post.findById(ID);
    if (!post) return errResponse("Post not found");

    if (user.id !== post.userID.toString())
      return errResponse("You are not authorized to update this post");

    const data = {
      content: formData.get("content") as String,
    };

    try {
      await RepostValidationSchema.validate(data, { abortEarly: true });
    } catch (error: any) {
      return errResponse(error.errors[0]);
    }

    await Post.findByIdAndUpdate(
      ID,
      {
        content: data.content,
      },
      { new: true }
    );

    revalidateTag("user-posts", "default");
    revalidateTag("discover", "default");

    return successResponse("Post updated successfully!");
  } catch (error) {
    return errResponse("Failed to update post.");
  }
}
