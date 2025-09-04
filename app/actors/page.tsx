import Banner from "@/components/layout/Banner";
import ContainerLayout from "@/components/layout/ContainerLayout";
import AllActors from "@/components/pages/AllActors";

const page = async () => {

    return <>
        <ContainerLayout>
            <Banner
                title="Actors"
                description="Explore the world of cinema through the lives and careers of your favorite actors. Discover their filmography, latest projects, and more."
            />
            <div className="my-8">
                <AllActors />
            </div>
        </ContainerLayout>
    </>;
};

export default page;