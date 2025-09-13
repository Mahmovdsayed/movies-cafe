"use server";

import { authorizeUser, errResponse, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Post from "@/models/posts.model";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function deletePostAction(ID: string) {
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

    await Post.findByIdAndDelete(ID);

    revalidateTag("user-posts");
    revalidateTag("discover");
    return successResponse("Post deleted successfully!");
  } catch (error) {
    return errResponse("Failed to delete post.");
  }
}
