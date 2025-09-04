
import SignUpForm from "@/components/forms/SignUpForm";
import Banner from "@/components/layout/Banner";
import ContainerLayout from "@/components/layout/ContainerLayout";

export const metadata = {
    title: "Sign Up",
    description: "Create your account to enjoy personalized features and content.",
    openGraph: {
        title: "Sign Up",
        description: "Create your account to enjoy personalized features and content.",
    },
    twitter: {
        title: "Sign Up",
        description: "Create your account to enjoy personalized features and content.",
        card: "summary_large_image"
    }
};

const Page = () => {
    return (
        <ContainerLayout>
            <Banner
                title="Create Your Account - Join Us Today!"
                description="Hey there! Want to join us and unlock all the cool stuff we’ve got? Sign up today and you’ll get a smooth and personalized experience, easy account management, and safe data storage."

            />
            <div className="my-8">
                <SignUpForm />
            </div>
        </ContainerLayout>
    );
};

export default Page;
