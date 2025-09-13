import { authenticateUser, authorizeUser } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiKey = request.headers.get("x-api-key");
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return NextResponse.json({
        success: false,
        message: "Forbidden: Invalid API key",
      });
    }
    const [_, user] = await Promise.all([connectToDatabase(), authorizeUser()]);

    const getUser = await User.findOne({ _id: user.id }).select(
      "-password -aiContent -aiCounter -resetPasswordExpires -resetPasswordToken -otpExpiry -otp"
    );

    if (!getUser)
      return NextResponse.json({ success: false, message: "User not found" });

    return NextResponse.json({ success: true, data: getUser });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
