import SignInForm from "@/components/forms/SignInForm";
import Banner from "@/components/layout/Banner";
import ContainerLayout from "@/components/layout/ContainerLayout";

export const metadata = {
    title: "Sign In",
    description: "Log in to your account to access exclusive features and personalized content.",
    openGraph: {
        title: "Sign In",
        description: "Log in to your account to access exclusive features and personalized content.",
    },
    twitter: {
        title: "Sign In",
        description: "Log in to your account to access exclusive features and personalized content.",
        card: "summary_large_image"
    }
};

const page = () => {

    return <>
        <ContainerLayout>
            <Banner
                title="Welcome Back! Log In to Your Account"
                description="Access your account and enjoy a seamless, secure, and personalized experience. Log in now to manage your settings, explore exclusive features, and stay connected. Your journey starts here!"
            />
            <div className="my-8">
                <SignInForm />
            </div>
        </ContainerLayout>
    </>;
};

export default page;