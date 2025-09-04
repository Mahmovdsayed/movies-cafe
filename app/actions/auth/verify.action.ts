"use server";

import { errResponse, successResponse } from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import { generateOTP, sendOTPEmail } from "@/lib/sendOTPEmail";
import User from "@/models/User.model";

import {
  requestNewOTPValidationSchema,
  VerifyValidationSchema,
} from "@/validations/auth/VerifyValidation";

export async function OTPVerify(otp: string, email: string) {
  try {
    await connectToDatabase();
    try {
      await VerifyValidationSchema.validate(
        { otp, email },
        { abortEarly: true }
      );
    } catch (validationError: any) {
      return await errResponse(validationError.errors[0]);
    }

    const user = await User.findOne({ email });

    if (!user) return await errResponse("User not found");

    if (user.isVerified) {
      return await errResponse("User already verified");
    }

    if (user.otp !== otp.trim()) return await errResponse("Invalid OTP");

    const otpExpiry = user.otpExpiry ? new Date(user.otpExpiry) : new Date(0);
    if (otpExpiry < new Date()) {
      return await errResponse("OTP has expired. Please request a new OTP.");
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    return await successResponse("Email verified successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}

export async function requestNewOTP(email: string) {
  try {
    await connectToDatabase();
    try {
      await requestNewOTPValidationSchema.validate(
        { email },
        { abortEarly: true }
      );
    } catch (validationError: any) {
      return await errResponse(validationError.errors[0]);
    }
    const now = new Date();
    const user = await User.findOne({ email });

    if (!user) return await errResponse("User not found");

    if (user.isVerified) {
      return await errResponse("User already verified");
    }

    const otpExpiry = user.otpExpiry ? new Date(user.otpExpiry) : new Date(0);

    if (otpExpiry > now) {
      const remainingTime = Math.ceil(
        (otpExpiry.getTime() - now.getTime()) / 60000
      );
      return await errResponse(
        `Please wait ${remainingTime} minutes before requesting a new OTP.`
      );
    }

    const newOTP = generateOTP();
    const newOtpExpiry = new Date(now.getTime() + 10 * 60 * 1000);

    user.otp = newOTP;
    user.otpExpiry = newOtpExpiry;
    await user.save();

    await sendOTPEmail(email, newOTP);

    return await successResponse("New OTP sent to your email.");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
