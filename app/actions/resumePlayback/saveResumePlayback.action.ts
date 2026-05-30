"use server";

import { authorizeUser, errResponse, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import ResumePlayback from "@/models/resumePlayback.model";
import { revalidateTag } from "next/cache";

export async function saveResumePlaybackAction(formData: FormData) {
  try {
    const [_, user] = await Promise.all([connectToDatabase(), authorizeUser()]);
    if (!user || "error" in user) return user;

    const movieID = String(formData.get("movieID"));
    const type = String(formData.get("type"));
    const currentTime = Number(formData.get("currentTime")) || 0;
    const duration = Number(formData.get("duration")) || 0;
    const isCompleted = Boolean(formData.get("isCompleted"));
    const episodeID = formData.get("episodeID") ? String(formData.get("episodeID")) : null;
    const seasonNumber = formData.get("seasonNumber") ? Number(formData.get("seasonNumber")) : null;

    if (!movieID || !type || (type !== "movie" && type !== "tv")) {
      return errResponse("Invalid movie ID or type");
    }

    const progress = duration > 0 ? Math.round((currentTime / duration) * 100) : 0;

    const updated = await ResumePlayback.findOneAndUpdate(
      {
        userID: user.id,
        movieID,
        type,
        ...(episodeID && { episodeID }),
      },
      {
        userID: user.id,
        movieID,
        type,
        currentTime,
        duration,
        progress,
        isCompleted,
        lastResumedAt: new Date(),
        ...(episodeID && { episodeID }),
        ...(seasonNumber && { seasonNumber }),
      },
      { upsert: true, new: true }
    );

    revalidateTag(`resume-playback-${user.id}`, "default");
    return successResponse("Resume playback saved");
  } catch (error) {
    return errResponse("Failed to save resume playback");
  }
}

export async function getResumePlaybackAction(movieID: string, type: string, episodeID?: string) {
  try {
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    await connectToDatabase();

    const query: any = {
      userID: user.id,
      movieID,
      type,
    };

    if (episodeID) {
      query.episodeID = episodeID;
    }

    const resumeData = await ResumePlayback.findOne(query);
    return successResponse("Resume playback data");
  } catch (error) {
    return errResponse("Failed to get resume playback");
  }
}

export async function deleteResumePlaybackAction(movieID: string, type: string) {
  try {
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    await connectToDatabase();

    await ResumePlayback.deleteOne({
      userID: user.id,
      movieID,
      type,
    });

    revalidateTag(`resume-playback-${user.id}`, "default");
    return successResponse("Resume playback cleared");
  } catch (error) {
    return errResponse("Failed to delete resume playback");
  }
}
