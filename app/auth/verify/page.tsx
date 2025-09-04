import OtpVerifyForm from "@/components/forms/OtpVerifyForm";
import Banner from "@/components/layout/Banner";
import ContainerLayout from "@/components/layout/ContainerLayout";
import { Suspense } from "react";

export const metadata = {
    title: "Verify Your Email",
    description: "Enter the 6-digit verification code sent to your email address to confirm your identity and unlock full access to your account. Your security is our top priority!",
    openGraph: {
        title: "Verify Your Email",
        description: "Enter the 6-digit verification code sent to your email address to confirm your identity and unlock full access to your account. Your security is our top priority!",
    },
    twitter: {
        title: "Verify Your Email",
        description: "Enter the 6-digit verification code sent to your email address to confirm your identity and unlock full access to your account. Your security is our top priority!",
        card: "summary_large_image"
    }
};

const page = () => {
    return <>
        <ContainerLayout>
            <Banner
                title="Verify Your Email"
                description="Enter the 6-digit verification code sent to your email address to confirm your identity and unlock full access to your account. Your security is our top priority!"
            />
            <Suspense fallback={<div>Loading...</div>}>
                <OtpVerifyForm />
            </Suspense>
        </ContainerLayout>
    </>;
};

export default page;