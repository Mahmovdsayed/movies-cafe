"use server";

import { baseURL } from "@/constant/statics";
import sendEmailService from "@/helpers/email";
import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
} from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import AiContent from "@/models/aiContent.model";
import Favorites from "@/models/favorites.model";
import Likes from "@/models/likes.model";
import Post from "@/models/posts.model";
import User from "@/models/User.model";
import Watchlist from "@/models/watchlist.model";
import { isValidObjectId } from "mongoose";
import { cookies } from "next/headers";

export async function deleteUserAction(id: string) {
  try {
    if (!id) return errResponse("ID is required");
    if (!isValidObjectId(id)) return errResponse("Invalid ID");

    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);

    if (!user || "error" in user) return user;

    if (!user.id) return errResponse("User not found");

    if (user.id.toString() !== id) {
      return errResponse("Unauthorized: You can only delete your own account");
    }

    await Promise.all([
      Post.deleteMany({ userID: id }),
      Favorites.deleteMany({ userID: id }),
      Watchlist.deleteMany({ userID: id }),
      Likes.deleteMany({ userID: id }),
      AiContent.deleteMany({ userID: id }),
    ]);


    if (user?.avatar?.public_id) {
      await deleteImageFromCloudinary(user.avatar.public_id);
    }

    await User.findByIdAndDelete(id);

    await sendEmailService({
      to: user.email,
      subject: "Account Deletion Confirmation",
      message: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333333; text-align: center; font-size: 16px;">Account Deletion Confirmation</h1>
            <p style="color: #555555; font-size: 13px; text-align: center;">
              We're sorry to see you go. Your account and all associated data have been permanently deleted from our systems.
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <p style="color: #555555; font-size: 13px;">
                All your personal information, posts, and uploaded content have been completely removed in accordance with our data privacy policy.
              </p>
            </div>
            <p style="color: #555555; font-size: 13px; text-align: center;">
              If this was a mistake or you change your mind, we'll be happy to welcome you back anytime.
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${baseURL}/auth/signup" target="_blank" style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 14px; font-weight: bold; padding: 10px 25px; border-radius: 5px; text-decoration: none;">
                Create New Account
              </a>
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #888888; font-size: 12px; margin-bottom: 10px;">
                Connect with us:
              </p>
              <div style="display: flex; justify-content: center; gap: 15px; text-align: center;">
                <a href="${baseURL}" target="_blank" style="color: #555555; font-size: 12px; text-decoration: none;">
                  Visit Our Website
                </a>
                <span style="color: #dddddd;">|</span>
                <a href="https://www.instagram.com/nest.dev/" target="_blank" style="color: #555555; font-size: 12px; text-decoration: none;">
                  Follow on Instagram
                </a>
              </div>
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <a href="${baseURL}" target="_blank" style="display: inline-block; text-decoration: none; padding: 5px 10px; border-radius: 5px; font-size: 13px;">
                © ${new Date().getFullYear()} Nest.dev. All rights reserved.
              </a>
            </div>
          </div>
        </div>
        `,
    });

    (await cookies()).delete("userToken");

    return successResponse(
      "User account and all associated data have been permanently deleted"
    );
  } catch (error) {
    console.log(error);
    return errResponse("Something went wrong");
  }
}
