import { authenticateUser } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import Post from "@/models/posts.model";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const [_, user] = await Promise.all([
      connectToDatabase(),
      authenticateUser(),
    ]);

    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });

    const { pathname } = new URL(req.url);
    const repostID = pathname.split("/").pop();

    if (!repostID) {
      return NextResponse.json({
        success: false,
        message: "Invalid ID",
      });
    }

    if (!isValidObjectId(repostID)) {
      return NextResponse.json({
        success: false,
        message: "Invalid ID",
      });
    }


    const post = await Post.findById(repostID)
      .populate({
        path: "userID",
        select: "userName name avatar.url",
      })
      .populate({
        path: "likes",
        select: "name avatar.url userName",
      })

      // .populate({
      //   path: "comments",
      //   select: "content createdAt",
      // })
      // .populate({
      //   path: "comments.userID",
      //   select: "name avatar userName",
      // })

      .lean();

    if (!post) {
      return NextResponse.json({
        success: false,
        message: "Post not found",
      });
    }
    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong!",
    });
  }
}
