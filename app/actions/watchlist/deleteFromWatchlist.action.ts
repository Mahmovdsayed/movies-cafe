"use server";

import { authorizeUser, errResponse, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import Watchlist from "@/models/watchlist.model";
import { isValidObjectId } from "mongoose";
import { revalidateTag } from "next/cache";

export async function deleteFromWatchlist(ID: string) {
  try {
    if (!ID) return errResponse("ID is required");
    if (!isValidObjectId(ID)) return errResponse("Invalid ID");

    const [_, user] = await Promise.all([connectToDatabase(), authorizeUser()]);
    if (!user || "error" in user) return user;

    const currentUser = await User.findById(user.id);
    if (!currentUser)
      return errResponse("You must be logged in to remove from watchlist");

    const deleted = await Watchlist.findOneAndDelete({
      userID: user.id,
      _id: ID,
    });
    if (!deleted) {
      return errResponse("This item is not in your watchlist");
    }
    await User.updateOne({ _id: user.id }, { $pull: { watchlist: ID } });
    revalidateTag("user-watchlist");
    return successResponse("Removed from your watchlist!");
  } catch (error) {
    return errResponse("Failed to remove from watchlist");
  }
}
