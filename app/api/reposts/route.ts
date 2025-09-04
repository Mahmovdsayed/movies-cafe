import { connectToDatabase } from "@/lib/connectToDatabase";
import Post from "@/models/posts.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const [totalItems, reposts] = await Promise.all([
      Post.countDocuments({ type: "repost" }),
      Post.find({ type: "repost" })
        .populate({
          path: "userID",
          select: "_id userName isVerified name",
        })
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      success: true,
      data: reposts,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch reposts", error },
      { status: 500 }
    );
  }
}
