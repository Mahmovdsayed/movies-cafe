import { connectToDatabase } from "@/lib/connectToDatabase";
import Favorites from "@/models/favorites.model";
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

    const { pathname, searchParams } = new URL(request.url);

    const segments = pathname.split("/");
    const userName =
      segments.indexOf("users") !== -1
        ? segments[segments.indexOf("users") + 1]
        : null;

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

    const user = await User.findOne({ userName }).select("_id");
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const total_results = await Favorites.countDocuments({ userID: user._id });
    const total_pages = Math.ceil(total_results / limit);
    const favoritesList = await Favorites.find({ userID: user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      page,
      total_pages,
      total_results,
      data: favoritesList,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong!",
    });
  }
}
