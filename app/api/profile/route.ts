import { authenticateUser } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const [_, user] = await Promise.all([
      connectToDatabase(),
      authenticateUser(),
    ]);

    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });

    const getUser = await User.findOne({ _id: user.id }).select(
      "-password -aiContent -aiCounter -resetPasswordExpires -resetPasswordToken -otpExpiry -otp"
    );

    if (!getUser)
      return NextResponse.json({ success: false, message: "User not found" });

    return NextResponse.json({ success: true, data: getUser });
  } catch (error) {
    console.error("GET /user error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
