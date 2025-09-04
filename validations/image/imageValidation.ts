import { allowedImageTypes } from "@/constant/statics";
import * as yup from "yup";

export const uploadImageValidationSchema = yup.object({
  avatar: yup
    .mixed()
    .test(
      "fileType",
      "Only PNG, JPEG, and JPG files or GIF files are allowed",
      (value) => {
        if (!value) return true;
        return value instanceof File && allowedImageTypes.includes(value.type);
      }
    )
    .test("fileSize", "File size should be less than 5MB", (value) => {
      if (!value) return true;
      return value instanceof File && value.size <= 5 * 1024 * 1024;
    })
    .nullable()
    .optional(),
});
