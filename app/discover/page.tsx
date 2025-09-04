import Banner from "@/components/layout/Banner";
import ContainerLayout from "@/components/layout/ContainerLayout";

const page = () => {
    return <>
        <ContainerLayout>
            <Banner
                title="Discover"
                description="Explore the latest movies and shows."
            />
        </ContainerLayout>
    </>;
};

export default page;