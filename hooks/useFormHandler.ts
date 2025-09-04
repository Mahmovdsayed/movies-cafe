import { useFormik } from "formik";
import * as Yup from "yup";

const useFormHandler = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema: Yup.Schema<T>,
  onSubmit: (values: T) => void
) => {
  return useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit,
  });
};

export default useFormHandler;
