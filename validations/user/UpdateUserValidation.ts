import * as yup from "yup";

const updateUserValidationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .required("Name is required"),
  about: yup
    .string()
    .min(2, "About must be at least 2 characters")
    .max(500, "About must be at most 500 characters")
    .optional(),
  country: yup
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country must be at most 100 characters")
    .required("Country is required"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Gender must be one of: male, female")
    .required("Gender is required"),
  birthday: yup.date().required("Birthday is required"),
  links: yup
    .object()
    .shape({
      facebook: yup
        .string()
        .url("Invalid URL")
        .matches(
          /^https?:\/\/(www\.)?facebook\.com\/.+$/,
          "Must be a valid Facebook URL"
        )
        .optional(),

      twitter: yup
        .string()
        .url("Invalid URL")
        .matches(
          /^https?:\/\/(www\.)?(twitter|x)\.com\/.+$/,
          "Must be a valid Twitter/X URL"
        )
        .optional(),

      instagram: yup
        .string()
        .url("Invalid URL")
        .matches(
          /^https?:\/\/(www\.)?instagram\.com\/.+$/,
          "Must be a valid Instagram URL"
        )
        .optional(),

      snapchat: yup
        .string()
        .url("Invalid URL")
        .matches(
          /^https?:\/\/(www\.)?snapchat\.com\/.+$/,
          "Must be a valid Snapchat URL"
        )
        .optional(),

      tiktok: yup
        .string()
        .url("Invalid URL")
        .matches(
          /^https?:\/\/(www\.)?tiktok\.com\/.+$/,
          "Must be a valid TikTok URL"
        )
        .optional(),
    })
    .optional(),
});

export default updateUserValidationSchema;
