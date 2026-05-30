import { authenticateUser } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import ResumePlayback from "@/models/resumePlayback.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const movieID = searchParams.get("movieID");
    const type = searchParams.get("type");
    const episodeID = searchParams.get("episodeID");

    if (!movieID || !type) {
      return NextResponse.json({ success: false, message: "Missing params" }, { status: 400 });
    }

    const [_, user] = await Promise.all([connectToDatabase(), authenticateUser()]);
    if (!user) return NextResponse.json({ success: false, data: null });

    const query: Record<string, unknown> = { userID: user.id, movieID, type };
    if (episodeID) query.episodeID = episodeID;

    const resumeData = await ResumePlayback.findOne(query);
    return NextResponse.json({ success: true, data: resumeData });
  } catch {
    return NextResponse.json({ success: false, data: null });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { movieID, type, currentTime, duration, isCompleted, episodeID, seasonNumber } = body;

    if (!movieID || !type) {
      return NextResponse.json({ success: false, message: "Missing params" }, { status: 400 });
    }

    const [_, user] = await Promise.all([connectToDatabase(), authenticateUser()]);
    if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

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
        isCompleted: isCompleted ?? false,
        lastResumedAt: new Date(),
        ...(episodeID && { episodeID }),
        ...(seasonNumber && { seasonNumber }),
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const movieID = searchParams.get("movieID");
    const type = searchParams.get("type");

    if (!movieID || !type) {
      return NextResponse.json({ success: false, message: "Missing params" }, { status: 400 });
    }

    const [_, user] = await Promise.all([connectToDatabase(), authenticateUser()]);
    if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    await ResumePlayback.deleteOne({ userID: user.id, movieID, type });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
