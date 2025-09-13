"use server";

import {
  authorizeUser,
  errResponse,
  successResponse,
  updateImageInCloudinary,
} from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import { uploadImageValidationSchema } from "@/validations/image/imageValidation";
import { revalidateTag } from "next/cache";

export async function updateAvatarAction(formData: FormData) {
  try {
    const [dbConnection, user] = await Promise.all([
      await connectToDatabase(),
      await authorizeUser(),
    ]);

    if (!user || "error" in user) return user;
    const userInfo = await User.findById(user.id);
    if (!userInfo) return errResponse("User not found");

    if (userInfo._id.toString() !== user.id.toString())
      return errResponse("You are not authorized to update this user");

    const avatar = formData.get("avatar") as File | null;
    if (!avatar) return errResponse("No image file provided");
    try {
      await uploadImageValidationSchema.validate(
        { avatar },
        {
          abortEarly: true,
        }
      );
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }
    const { imageUrl, publicId } = await updateImageInCloudinary(
      avatar,
      user.userName,
      "Avatar",
      user.avatar.public_id
    );
    user.avatar = {
      url: imageUrl,
      public_id: publicId,
    };
    await user.save();
    revalidateTag(`user-info`);
    return await successResponse("Avatar updated successfully");
  } catch (error) {
    return await errResponse("Failed to update avatar");
  }
}
