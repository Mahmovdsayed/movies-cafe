"use server";

import {
  errResponse,
  hashPassword,
  successResponse,
  uploadImageToCloudinary,
} from "@/helpers/helpers";
import { connectToDatabase } from "@/lib/connectToDatabase";
import { generateOTP, sendOTPEmail } from "@/lib/sendOTPEmail";
import User from "@/models/User.model";
import { signUpValidationSchema } from "@/validations/auth/SignUpValidation";

export async function signUpAction(formData: FormData) {
  try {
    await connectToDatabase();

    const userData = {
      name: formData.get("name") as string,
      userName: formData.get("userName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      avatar: formData.get("avatar") as File | null,
      about: formData.get("about") as string,
      birthday: formData.get("birthday") as string,
      country: formData.get("country") as string,
    };

    try {
      await signUpValidationSchema.validate(userData, { abortEarly: true });
    } catch (validationError: any) {
      await errResponse(validationError.errors[0]);
    }

    const isUserNameExist = await User.findOne({ userName: userData.userName });
    if (isUserNameExist)
      return await errResponse(
        "Username already exists. Please choose a different username."
      );

    const isEmailExist = await User.findOne({ email: userData.email });
    if (isEmailExist)
      return await errResponse(
        "Email already exists. Please choose a different email."
      );

    const hashedPassword = await hashPassword(userData.password);

    let imageUrl =
      "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713493679/sqlpxs561zd9oretxkki.jpg";
    let publicId = "";

    if (userData.avatar) {
      const uploadResponse = await uploadImageToCloudinary(
        userData.avatar,
        userData.userName,
        "Avatar"
      );
      imageUrl = uploadResponse.imageUrl;
      publicId = uploadResponse.publicId;
    }

    const newUser = new User({
      ...userData,
      password: hashedPassword,
      avatar: { url: imageUrl, public_id: publicId },
      isVerified: false,
      otp: generateOTP(),
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
    });

    await newUser.save();
    await sendOTPEmail(newUser.email, newUser.otp);

    return await successResponse("User registered successfully.");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
