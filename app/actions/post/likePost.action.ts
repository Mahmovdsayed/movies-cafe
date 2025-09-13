"use server";

import { authorizeUser, errResponse, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Likes from "@/models/likes.model";
import Post from "@/models/posts.model";
import User from "@/models/User.model";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function likePostAction(userID: string, postID: string) {
  try {
    if (!userID || !postID) return errResponse("ID is required");
    if (!isValidObjectId(userID) || !isValidObjectId(postID)) return errResponse("Invalid ID");

    await connectToDatabase();

    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const currentUser = await User.findById(user.id);
    if (!currentUser) {
      return errResponse("You must be logged in to like this post!");
    }

    const post = await Post.findById(postID);
    if (!post) return errResponse("Post not found!");

    const existingLike = await Likes.findOne({ userID, postID });

    if (existingLike) {
      await Likes.deleteOne({ _id: existingLike._id });
      await Post.findByIdAndUpdate(postID, {
        $pull: { likes: userID },
      });

      revalidateTag("discover");
      return successResponse("Post unliked successfully!");
    } else {
      await Likes.create({ userID, postID });
      await Post.findByIdAndUpdate(postID, {
        $addToSet: { likes: userID },
      });

      revalidateTag("discover");
      return successResponse("Post liked successfully!");
    }
  } catch (error) {
    console.error("Error in LikePost:", error);
    return errResponse("Something went wrong while liking the post!");
  }
}
