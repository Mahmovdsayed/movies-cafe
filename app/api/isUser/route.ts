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
    return NextResponse.json({
      success: true,
      id: user.id,
      username: user.userName,
    });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
