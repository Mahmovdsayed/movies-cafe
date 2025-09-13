"use server";

import { authorizeUser, errResponse, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import Watchlist from "@/models/watchlist.model";
import userFavoritesSchema from "@/validations/user/UserFavoritesValidations";
import { revalidateTag } from "next/cache";

export async function addToWatchlistAction(formData: FormData) {
  try {
    const [_, user] = await Promise.all([connectToDatabase(), authorizeUser()]);
    if (!user || "error" in user) return user;

    const currentUser = await User.findById(user.id);
    if (!currentUser)
      return errResponse("You must be logged in to add to Watchlist");

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

    const existing = await Watchlist.findOne({
      userID: user.id,
      movieID: data.movieID,
      type: data.type,
    });

    if (existing) {
      return errResponse("This item is already in your watchlist");
    }

    await Watchlist.create({ ...data, userID: user.id });
    // currentUser.watchlist.push(watchlist._id);
    // await currentUser.save();

    revalidateTag("user-watchlist");
    return successResponse("Added! You can find it in your watch list.");
  } catch (error) {
    return errResponse("Failed to add to favorites");
  }
}
