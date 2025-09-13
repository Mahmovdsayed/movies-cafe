import { allowedImageTypes } from "@/constant/statics";
import * as yup from "yup";

export const signUpValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .required("Name is required"),
  userName: yup
    .string()
    .trim()
    .transform((value) => (value ? value.toLowerCase() : value))
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores"
    )
    .required("Username is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be at most 30 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  // avatar: yup
  //   .mixed()
  //   .test("fileType", "Only PNG, JPEG, and JPG files are allowed", (value) => {
  //     if (!value) return true;
  //     return value instanceof File && allowedImageTypes.includes(value.type);
  //   })
  //   .test("fileSize", "Image size should be less than 5MB", (value) => {
  //     if (!value) return true;
  //     return value instanceof File && value.size <= 5 * 1024 * 1024;
  //   })
  //   .optional(),
  // birthday: yup.date().optional().nullable(),
  // country: yup.string().trim().optional().nullable(),
});
