"use server";

import { authorizeUser, errResponse, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Favorites from "@/models/favorites.model";
import User from "@/models/User.model";
import userFavoritesSchema from "@/validations/user/UserFavoritesValidations";
import { revalidateTag } from "next/cache";

export async function addToFavorites(formData: FormData) {
  try {
    const [_, user] = await Promise.all([connectToDatabase(), authorizeUser()]);
    if (!user || "error" in user) return user;

    const currentUser = await User.findById(user.id);
    if (!currentUser)
      return errResponse("You must be logged in to add to favorites");

    const data = {
      movieID: String(formData.get("movieID")),
      movieTitle: String(formData.get("movieTitle")),
      moviePoster: String(formData.get("moviePoster")),
      movieReleaseDate: String(formData.get("movieReleaseDate")),
      movieBanner: String(formData.get("movieBanner")),
      type: String(formData.get("type")),
      movieOverview: String(formData.get("movieOverview")),
    };

    try {
      await userFavoritesSchema.validate(data, { abortEarly: true });
    } catch (error: any) {
      return errResponse(error.errors[0]);
    }

    const existing = await Favorites.findOne({
      userID: user.id,
      movieID: data.movieID,
      type: data.type,
    });

    if (existing) {
      return errResponse("This item is already in your favorites");
    }

    await Favorites.create({ ...data, userID: user.id });

    // currentUser.favorites.push(favorite._id);
    // await currentUser.save();

    revalidateTag("user-favorites");

    return successResponse("Added! You can find it in your favorites list.");
  } catch (err) {
    return errResponse("Failed to add to favorites");
  }
}
