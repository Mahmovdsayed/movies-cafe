'use client';

import { signUpAction } from "@/app/actions/auth/signup.action";
import { SignUpInitialState } from "@/helpers/initialState";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { signUpValidationSchema } from "@/validations/auth/SignUpValidation";
import { Link } from "@heroui/react";
import FormMotion from "../motion/FormMotion";
import FormInput from "../ui/inputs/FormInput";
import NestErrors from "../ui/inputs/NestErrors";
import FormInputPassword from "../ui/inputs/FormInputPassword";
import SubmitButton from "../ui/buttons/SubmitButton";
import { IoLogIn } from "react-icons/io5";

const SignUpForm = () => {
    const handleResponse = useHandleResponse();

    const formik = useFormHandler(SignUpInitialState, signUpValidationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('userName', values.userName);
        formData.append('email', values.email);
        formData.append('password', values.password);

        await handleResponse(signUpAction(formData), formik.resetForm, `/auth/signin`)
    });

    return <>
        <div className="lg:w-9/12">
            <form
                className="flex flex-col gap-2"
                onSubmit={formik.handleSubmit}
            >
                <FormMotion delay={0.4}>
                    <FormInput
                        name="name"
                        label="Full Name"
                        value={formik.values.name}
                        type="text"
                        onBlur={formik.handleBlur}
                        size="md"
                        onChange={formik.handleChange}
                        placeholder="Enter Your Full Name"
                        description="Enter your full name as it appears on your official website."
                    />
                    {formik.touched.name && formik.errors.name && (
                        <NestErrors title={formik.errors.name} color='primary' />
                    )}
                </FormMotion>
                <FormMotion delay={0.5}>
                    <FormInput
                        name="userName"
                        label="Username"
                        value={formik.values.userName}
                        type="text"
                        onBlur={formik.handleBlur}
                        size="md"
                        onChange={formik.handleChange}
                        placeholder="Enter Your Username"
                        description="Enter your username as it appears on your official website."
                    />
                    {formik.touched.userName && formik.errors.userName && (
                        <NestErrors title={formik.errors.userName} color='primary' />
                    )}
                </FormMotion>
                <FormMotion delay={0.6}>
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
                <FormMotion delay={0.7}>
                    <FormInputPassword
                        name="password"
                        description="Use 8 or more characters with a mix of letters, numbers & symbols"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="Enter Your Password"
                    />
                    {formik.touched.password && formik.errors.password && (<NestErrors title={formik.errors.password} color='primary' />
                    )}
                </FormMotion>

                <FormMotion delay={0.8}>
                    <SubmitButton
                        title='Sign Up'
                        isLoading={formik.isSubmitting}
                        isDisabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                        startContent={<IoLogIn />}
                    />
                </FormMotion>
                <FormMotion delay={0.9}>
                    <div className='flex items-start justify-start my-3'>
                        <span className='text-start text-sm'>Have an account already ? <Link href='/auth/signin' size='sm' showAnchorIcon>Sign In Now</Link></span>
                    </div>
                </FormMotion>
            </form >
        </div >
    </>;
};

export default SignUpForm;