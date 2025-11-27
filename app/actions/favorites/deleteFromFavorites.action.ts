"use server";

import { authorizeUser, errResponse, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Favorites from "@/models/favorites.model";
import User from "@/models/User.model";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function deleteFromFavorites(ID: string) {
  try {
    if (!ID) return errResponse("ID is required");
    if (!isValidObjectId(ID)) return errResponse("Invalid ID");

    const [_, user] = await Promise.all([connectToDatabase(), authorizeUser()]);
    if (!user || "error" in user) return user;

    const currentUser = await User.findById(user.id);
    if (!currentUser)
      return errResponse("You must be logged in to remove from favorites");

    const favoriteItem = await Favorites.findById(ID);

    if (!favoriteItem) {
      return errResponse("Favorite item not found");
    }

    if (favoriteItem.userID.toString() !== user.id.toString()) {
      return errResponse("You are not authorized to delete this item");
    }

    const deleted = await Favorites.findOneAndDelete({
      userID: user.id,
      _id: ID,
    });

    if (!deleted) {
      return errResponse("This item is not in your favorites");
    }

    await User.updateOne({ _id: user.id }, { $pull: { favorites: ID } });

    revalidateTag("user-favorites", "default");

    return successResponse("Removed from your favorites!");
  } catch (error) {
    console.error("deleteFromFavorites error:", error);
    return errResponse("❌ Failed to remove from favorites");
  }
}
