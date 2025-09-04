import { authenticateUser } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const [_, user] = await Promise.all([
      connectToDatabase(),
      authenticateUser(),
    ]);
    if (!user) return NextResponse.json({ success: false });
    // const ai = geminiClient(
    //   "What is the movie brief for The Dark Knight?",
    //   "ar"
    // );
    return NextResponse.json({
      success: true,
      //   data: ai,
      data: "",
    });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
