"use server";

import {
  errResponse,
  successResponse,
  verifyPassword,
} from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import User from "@/models/User.model";
import { signInValidationSchema } from "@/validations/auth/SignInValidation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function signInAction(formData: FormData) {
  try {
    await connectToDatabase();
    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      await signInValidationSchema.validate(userData, { abortEarly: true });
    } catch (validationError: any) {
      return errResponse(validationError.errors[0]);
    }

    const isEmailExist = await User.findOne({ email: userData.email });
    if (!isEmailExist) return errResponse("Invalid login credentials");

    if (!isEmailExist.isVerified)
      return errResponse("Please verify your email first");

    const isPassMatched = await verifyPassword(
      userData.password,
      isEmailExist.password
    );
    if (!isPassMatched) return errResponse("Invalid login credentials");

    const token = jwt.sign(
      {
        id: isEmailExist._id,
        userEmail: isEmailExist.email,
        userName: isEmailExist.userName,
      },
      process.env.LOGIN_SIG || "",

      { expiresIn: "30d" }
    );

    (await cookies()).set("userToken", token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return successResponse(`Welcome back ${isEmailExist.userName} 👋`);
  } catch (error) {
    console.log(error);
    return errResponse("Something went wrong");
  }
}
