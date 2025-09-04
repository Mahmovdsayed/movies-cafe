'use client'

import { signInAction } from "@/app/actions/auth/signin.action";
import { SignInInitialState } from "@/helpers/initialState";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { signInValidationSchema } from "@/validations/auth/SignInValidation";
import SubmitButton from "../ui/SubmitButton";
import NestErrors from "../ui/NestErrors";
import FormInputPassword from "../ui/FormInputPassword";
import FormInput from "../ui/FormInput";
import { Link } from "@heroui/react";
import { IoLogIn } from "react-icons/io5";
import FormMotion from "../motion/FormMotion";
import { useIsUser } from "@/hooks/isUser";

const SignInForm = () => {
    const { refetch } = useIsUser()
    const handleResponse = useHandleResponse();

    const formik = useFormHandler(SignInInitialState, signInValidationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append('email', values.email);
        formData.append('password', values.password);

        await handleResponse(signInAction(formData), formik.resetForm, `/discover`);
        refetch()
    });

    return <>
        <div className="lg:w-9/12">
            <form
                className="flex flex-col gap-2"
                onSubmit={formik.handleSubmit}
            >
                <FormMotion delay={0.4}>
                    <FormInput
                        name="email"
                        label="Email Address"
                        value={formik.values.email}
                        type="email"
                        onBlur={formik.handleBlur}
                        size="md"
                        onChange={formik.handleChange}
                        placeholder="Enter Your Email Address"
                        description="We'll never share your email with anyone else."
                    />
                    {formik.touched.email && formik.errors.email && (
                        <NestErrors title={formik.errors.email} color='primary' />
                    )}
                </FormMotion>
                <FormMotion delay={0.5}>
                    <FormInputPassword
                        name="password"
                        description="Use 8 or more characters with a mix of letters, numbers & symbols"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="Enter Your Password"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <NestErrors title={formik.errors.password} color='primary' />
                    )}
                </FormMotion>
                <FormMotion delay={0.6}>
                    <SubmitButton
                        title='Sign In'
                        isLoading={formik.isSubmitting}
                        isDisabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                        startContent={<IoLogIn />}
                    />
                </FormMotion>
                <FormMotion delay={0.7}>
                    <div className='flex items-start justify-start flex-col gap-1'>
                        <span className='text-start text-sm'>Don't have an account ? <Link href='/auth/signup' size='sm' showAnchorIcon>Sign Up Now</Link></span>
                        <Link href='/auth/forgot-password' size='sm' showAnchorIcon>Forgot password?</Link>
                    </div>
                </FormMotion>
            </form>
        </div>
    </>;
};

export default SignInForm;