'use client'

import { forgotPasswordAction } from "@/app/actions/auth/forgotPassword.action";
import { ForgotPasswordInitialState } from "@/helpers/initialState";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { forgotPasswordValidationSchema } from "@/validations/auth/ForgotPasswordValidation";
import FormMotion from "../motion/FormMotion";
import FormInput from "../ui/inputs/FormInput";
import NestErrors from "../ui/inputs/NestErrors";
import SubmitButton from "../ui/buttons/SubmitButton";
import { IoIosSend } from "react-icons/io";

const ForgotPasswordForm = () => {

    const handleResponse = useHandleResponse();
    const formik = useFormHandler(ForgotPasswordInitialState, forgotPasswordValidationSchema, async (values) => {
        await handleResponse(forgotPasswordAction(values.email), formik.resetForm);
    });

    return <>
        <form
            className="flex flex-col lg:w-9/12"
            onSubmit={formik.handleSubmit}
        >
            <FormMotion delay={0.4}>
                <FormInput
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    description="Enter your email address to receive instructions for resetting your password."
                    placeholder="Enter Your Email"
                />
                {formik.touched.email && formik.errors.email && (
                    <NestErrors title={formik.errors.email} color='primary' />
                )}
            </FormMotion>
            <FormMotion delay={0.5}>
                <SubmitButton
                    title="Send"
                    isDisabled={formik.isSubmitting || !formik.isValid || !formik.values.email}
                    isLoading={formik.isSubmitting}
                    startContent={<IoIosSend />}
                    className="mt-3"
                />
            </FormMotion>
        </form>
    </>;
};

export default ForgotPasswordForm;