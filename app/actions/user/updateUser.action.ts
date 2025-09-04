"use server";

import { authorizeUser, errResponse, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import updateUserValidationSchema from "@/validations/user/UpdateUserValidation";
import { revalidateTag } from "next/cache";

export async function updateUserAction(formData: FormData) {
  try {
    const [dbConnection, user] = await Promise.all([
      connectToDatabase(),
      authorizeUser(),
    ]);
    if (!user || "error" in user) return user;

    const data = {
      name: formData.get("name") as string,
      about: formData.get("about") as string,
      country: formData.get("country") as string,
      gender: formData.get("gender") as string,
      birthday: formData.get("birthday") as string,
    };

    try {
      await updateUserValidationSchema.validate(data, { abortEarly: true });
    } catch (validationError: any) {
      await errResponse(validationError.errors[0]);
    }

    await User.findByIdAndUpdate(user.id, data, {
      new: true,
    });

    revalidateTag(`user-info`);
    return successResponse("Profile updated successfully");
  } catch (error) {
    await errResponse("Failed to update user");
  }
}
