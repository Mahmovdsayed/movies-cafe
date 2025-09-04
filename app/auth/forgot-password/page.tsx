import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import Banner from "@/components/layout/Banner";
import ContainerLayout from "@/components/layout/ContainerLayout";

export const metadata = {
    title: "Forgot Password",
    description: "No Worries! Enter your email address below, and we'll send you instructions to reset your password and regain access to your account.",
    openGraph: {
        title: "Forgot Password",
        description: "No Worries! Enter your email address below, and we'll send you instructions to reset your password and regain access to your account.",
    },
    twitter: {
        title: "Forgot Password",
        description: "No Worries! Enter your email address below, and we'll send you instructions to reset your password and regain access to your account.",
        card: "summary_large_image"
    }
};

const page = () => {
    return <>
        <ContainerLayout>
            <Banner
                title="Forgot Your Password ?"
                description="No Worries! Enter your email address below, and we'll send you instructions to reset your password and regain access to your account."
            />
            <div className="my-8">
                <ForgotPasswordForm />
            </div>
        </ContainerLayout>
    </>;
};

export default page;