import { authorizeUser } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import { NextRequest, NextResponse } from "next/server";
import { geminiClient } from "@/ai";
import AiContent from "@/models/aiContent.model";
import User from "@/models/User.model";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      movieID: string;
      movieTitle: string;
      moviePoster: string;
      movieReleaseDate: string;
      movieBanner: string;
      movieOverview: string;
      movieType: string;
      style: "trailer" | "critic" | "emotional" | "action";
      lang: "en" | "ar";
    };

    if (
      !body.movieID ||
      !body.movieTitle ||
      !body.moviePoster ||
      !body.movieReleaseDate ||
      !body.movieBanner ||
      !body.movieOverview ||
      !body.lang ||
      !body.movieType ||
      !body.style
    ) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields",
      });
    }

    await connectToDatabase();
    const authUser = await authorizeUser();

    const user = await User.findById(authUser.id);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "You must be logged in to generate content!",
      });
    }

    const LIMIT = 3;
    const RESET_HOURS = 24;
    const now = new Date();

    if (!user.lastAICounterReset) {
      user.lastAICounterReset = now;
      user.aiCounter = 0;
    }

    const diffMs = now.getTime() - new Date(user.lastAICounterReset).getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours >= RESET_HOURS) {
      user.aiCounter = 0;
      user.lastAICounterReset = now;
    }

    if (user.aiCounter >= LIMIT) {
      const nextReset = new Date(user.lastAICounterReset);
      nextReset.setHours(nextReset.getHours() + RESET_HOURS);

      const remainingMs = nextReset.getTime() - now.getTime();
      const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
      const remainingMinutes = Math.floor(
        (remainingMs % (1000 * 60 * 60)) / (1000 * 60)
      );

      return NextResponse.json({
        success: false,
        message: `You have reached your daily limit of ${LIMIT} generations. Please try again in ${remainingHours}h ${remainingMinutes}m.`,
      });
    }

    let brief;
    try {
      brief = await geminiClient(
        body.style,
        {
          title: body.movieTitle,
          description: body.movieOverview,
          date: body.movieReleaseDate,
        },
        body.lang
      );
    } catch (err) {
      return NextResponse.json({
        success: false,
        message: "Failed to generate content. Please try again later.",
      });
    }

    await AiContent.create({
      userID: user._id,
      content: brief,
      movieInfo: {
        movieID: body.movieID,
        movieTitle: body.movieTitle,
        moviePoster: body.moviePoster,
        movieReleaseDate: body.movieReleaseDate,
        movieBanner: body.movieBanner,
        movieOverview: body.movieOverview,
        movieType: body.movieType,
      },
    });

    user.aiCounter = (user.aiCounter ?? 0) + 1;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "AI content generated successfully!",
      data: {
        content: brief,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
