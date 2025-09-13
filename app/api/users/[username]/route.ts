import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import { userNameValidationSchema } from "@/validations/user/UserNameValidation";
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

    const { pathname } = new URL(request.url);
    const userName = pathname.split("/").pop();

    if (!userName) {
      return NextResponse.json({
        success: false,
        message: "Invalid ID",
      });
    }

    try {
      await userNameValidationSchema.validate(
        { userName },
        { abortEarly: true }
      );
    } catch (validationError: any) {
      return NextResponse.json({
        success: false,
        message: validationError.errors[0],
      });
    }

    await connectToDatabase();
    const user = await User.findOne({ userName }).select(
      "-password -aiContent -aiCounter -resetPasswordExpires -resetPasswordToken -otpExpiry -otp -email "
    );
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong!",
    });
  }
}
