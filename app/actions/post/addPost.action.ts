"use server";

import { authorizeUser, errResponse, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Post from "@/models/posts.model";
import User from "@/models/User.model";
import userPostsSchemaValidation from "@/validations/user/UserPostsValidations";
import { revalidateTag } from "next/cache";

export async function addPostAction(formData: FormData) {
  try {
    const [_, user] = await Promise.all([connectToDatabase(), authorizeUser()]);
    if (!user || "error" in user) return user;

    const currentUser = await User.findById(user.id);
    if (!currentUser)
      return errResponse("You must be logged in to add to your profile!");

    const data = {
      movieID: String(formData.get("movieID")),
      movieTitle: String(formData.get("movieTitle")),
      moviePoster: String(formData.get("moviePoster")),
      movieReleaseDate: String(formData.get("movieReleaseDate")),
      movieBanner: String(formData.get("movieBanner")),
      movieOverview: String(formData.get("movieOverview")),
      movieType: String(formData.get("movieType")),
      type: String(formData.get("type")),
      content: String(formData.get("content")),
    };

    try {
      await userPostsSchemaValidation.validate(data, { abortEarly: true });
    } catch (error: any) {
      return errResponse(error.errors[0]);
    }

    await Post.create({
      userID: user.id,
      ...data,
    });

    revalidateTag("user-posts");
    revalidateTag("discover");

    return successResponse(
      "Post added successfully to your profile and discover page!"
    );
  } catch (error) {
    // console.log(error);
    return errResponse("Failed to add post");
  }
}
