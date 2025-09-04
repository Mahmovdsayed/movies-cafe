"use server";

import { errResponse, hashPassword, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import { resetPasswordValidationSchema } from "@/validations/auth/ForgotPasswordValidation";

export async function resetPasswordAction(pass: string, token: string) {
  try {
    await connectToDatabase();

    try {
      await resetPasswordValidationSchema.validate({
        password: pass,
        confirmPassword: pass,
        token,
      });
    } catch (validationError: any) {
      await errResponse(validationError.errors[0]);
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) return await errResponse("Invalid or expired token");

    user.password = await hashPassword(pass as string);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return await successResponse("Password reset successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
