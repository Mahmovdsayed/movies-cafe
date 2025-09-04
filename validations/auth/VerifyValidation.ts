import * as yup from "yup";

export const VerifyValidationSchema = yup.object({
  otp: yup
    .string()
    .required("OTP is required")
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits"),
  email: yup.string().email().required("Email is required"),
});

export const requestNewOTPValidationSchema = yup.object({
  email: yup.string().email().required("Email is required"),
});
