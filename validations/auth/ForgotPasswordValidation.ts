import * as yup from "yup";

export const forgotPasswordValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
    .required("Email is required"),
});

export const resetPasswordValidationSchema = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be at most 30 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),

  token: yup.string().optional(),
});
