import Banner from "@/components/layout/Banner";
import ContainerLayout from "@/components/layout/ContainerLayout";
import Settings from "@/components/pages/Settings";

export const metadata = {
    title: "Settings",
    description: "Manage your site settings and preferences here.",
    openGraph: {
        title: "Settings",
        description: "Manage your site settings and preferences here.",
    },
    twitter: {
        title: "Settings",
        description: "Manage your site settings and preferences here.",
        card: "summary_large_image",
    },
};

const page = () => {
    return <>
        <ContainerLayout>
            <Banner
                title="General Settings"
                description="Manage your site settings and preferences here."
            />
            <div className="my-8">
                <Settings />
            </div>
        </ContainerLayout>
    </>;
};

export default page;