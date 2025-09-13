'use client'

import { resetPasswordAction } from "@/app/actions/auth/resetPassword.action";
import { ResetPasswordInitialState } from "@/helpers/initialState";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { resetPasswordValidationSchema } from "@/validations/auth/ForgotPasswordValidation";
import { useSearchParams } from "next/navigation";
import FormMotion from "../motion/FormMotion";
import FormInputPassword from "../ui/inputs/FormInputPassword";
import NestErrors from "../ui/inputs/NestErrors";
import SubmitButton from "../ui/buttons/SubmitButton";
import { MdLockReset } from "react-icons/md";

const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") as string;

    const handleResponse = useHandleResponse();

    const formik = useFormHandler(ResetPasswordInitialState, resetPasswordValidationSchema, async (values) => {
        await handleResponse(resetPasswordAction(values.password, token), formik.resetForm, "/auth/signin");
    });

    return <>
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col lg:w-9/12"
        >
            <FormMotion delay={0.4}>
                <FormInputPassword
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Enter New Password"
                    description="Create a strong password with at least 6 characters, including uppercase and lowercase letters, numbers, and special characters."
                />
                {formik.touched.password && formik.errors.password && (
                    <NestErrors title={formik.errors.password} color="primary" />
                )}
            </FormMotion>
            <FormMotion delay={0.5}>
                <FormInputPassword
                    name="confirmPassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    placeholder="Confirm New Password"
                    description="Re-enter your password to confirm. Ensure it matches the password entered above."
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <NestErrors title={formik.errors.confirmPassword} color='primary' />
                )}
            </FormMotion>
            <FormMotion delay={0.6}>
                <SubmitButton
                    title="Reset Password"
                    isDisabled={formik.isSubmitting || !formik.isValid || !formik.values.password || !formik.values.confirmPassword}
                    isLoading={formik.isSubmitting}
                    startContent={<MdLockReset />}
                    className="mt-3"
                />
            </FormMotion>
        </form>
    </>;
};

export default ResetPasswordForm;