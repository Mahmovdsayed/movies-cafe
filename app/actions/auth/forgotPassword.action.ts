"use server";

import { baseURL } from "@/constant/statics";
import sendEmailService from "@/helpers/email";
import { errResponse, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import { forgotPasswordValidationSchema } from "@/validations/auth/ForgotPasswordValidation";
import crypto from "crypto";

export async function forgotPasswordAction(email: string) {
  try {
    await connectToDatabase();
    try {
      await forgotPasswordValidationSchema.validate(email, {
        abortEarly: true,
      });
    } catch (validationError: any) {
      await errResponse(validationError.errors[0]);
    }
    const user = await User.findOne({ email });
    if (!user) return await errResponse("User not found");

    if (
      user.resetPasswordExpires &&
      user.resetPasswordExpires.getTime() > Date.now()
    ) {
      const remainingTime = Math.ceil(
        (user.resetPasswordExpires.getTime() - Date.now()) / 60000
      );
      return await errResponse(
        `You have already requested a password reset. Please wait ${remainingTime} minutes before trying again.`
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();

    const resetLink = `${baseURL}/auth/reset-password?token=${resetToken}`;
    await sendEmailService({
      to: user.email,
      subject: "Password Reset",
      message: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h1 style="color: #333333; text-align: center; font-size: 16px;">Reset Your Password</h1>
    <p style="color: #555555; font-size: 13px; text-align: center;">
      We received a request to reset your password. Click the button below to proceed:
    </p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${resetLink}" target="_blank" style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 14px; font-weight: bold; padding: 10px 25px; border-radius: 5px; text-decoration: none;">
        Reset Password
      </a>
    </div>
    <p style="color: #555555; font-size: 13px; text-align: center;">
      This link is valid for <strong>1 hour</strong>. If you did not request a password reset, you can simply ignore this email.
    </p>
    <div style="text-align: center; margin-top: 20px;">
      <a href="https://www.instagram.com/nest.dev/" target="_blank" style="display: inline-block; text-decoration: none; padding: 5px 10px; border-radius: 5px; font-size: 13px;">
        © ${new Date().getFullYear()} Nest.dev . All rights reserved.
      </a>
    </div>
  </div>
</div>

      `,
    });
    return await successResponse("Password reset link sent to your email");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
