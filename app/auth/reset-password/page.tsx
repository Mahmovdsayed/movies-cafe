import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import Banner from "@/components/layout/Banner";
import ContainerLayout from "@/components/layout/ContainerLayout";
import { Suspense } from "react";

export const metadata = {
    title: "Reset Password",
    description: "Please enter a strong new password to reset your account and regain access. Make sure it's something unique and secure.",
    openGraph: {
        title: "Reset Password",
        description: "Please enter a strong new password to reset your account and regain access. Make sure it's something unique and secure.",
    },
    twitter: {
        title: "Reset Password",
        description: "Please enter a strong new password to reset your account and regain access. Make sure it's something unique and secure.",
        card: "summary_large_image"
    }
};
const page = () => {
    return <>
        <ContainerLayout>
            <Banner
                title="Reset Password"
                description="Please enter a strong new password to reset your account and regain access. Make sure it's something unique and secure."
            />
            <Suspense fallback={<div>Loading...</div>}>
                <div className="my-8">
                    <ResetPasswordForm />
                </div>
            </Suspense>
        </ContainerLayout>
    </>;
};

export default page;
