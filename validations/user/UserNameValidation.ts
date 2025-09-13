import * as yup from "yup";

export const userNameValidationSchema = yup.object({
  userName: yup
    .string()
    .trim()
    .transform((value) => (value ? value.toLowerCase() : value))
    .min(2, "Username must be at least 2 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores"
    )
    .required("Username is required"),
});
