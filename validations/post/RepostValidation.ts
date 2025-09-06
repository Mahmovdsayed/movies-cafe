import * as yup from "yup";

export const RepostValidationSchema = yup.object({
  content: yup
    .string()
    .required("Description is required")
    .min(2, "About must be at least 2 characters")
    .max(500, "About must be at most 500 characters"),
  // type: yup.string().oneOf(["post", "repost"]).required("Type is required"),
});
