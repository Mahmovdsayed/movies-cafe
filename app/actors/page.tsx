import Banner from "@/components/layout/Banner";
import ContainerLayout from "@/components/layout/ContainerLayout";
import AllActors from "@/components/pages/AllActors";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Actors",
    description: "Explore the world of cinema through the lives and careers of your favorite actors. Discover their filmography, latest projects, and more.",
    keywords: "actors, movies, cinema, filmography, Hollywood, Bollywood, K-Drama, C-Drama",
    openGraph: {
        title: "Actors - Movies Cafe",
        description: "Explore the world of cinema through the lives and careers of your favorite actors. Discover their filmography, latest projects, and more.",
        url: "https://movies-cafe.vercel.app/actors",
        siteName: "Movies Cafe",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Actors - Movies Cafe",
        description: "Explore the world of cinema through the lives and careers of your favorite actors. Discover their filmography, latest projects, and more.",
    },
};

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