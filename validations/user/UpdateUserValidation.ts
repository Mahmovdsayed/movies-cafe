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
});

export default updateUserValidationSchema;
