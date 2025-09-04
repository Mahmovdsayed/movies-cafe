import ContainerLayout from "@/components/layout/ContainerLayout";
import MovieRecommendationsPage from "@/components/pages/MovieRecommendationsPage";

import { Metadata } from "next";
import { getMovieDetails } from "@/lib/tmdbAPI";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const data = await getMovieDetails("tv", id)
    return {
        title: `Recommendations for ${data.name}`,
        description: `Recommended TV shows similar to ${data.name}.`,
        keywords: data.genres.map((genre: any) => genre.name).join(", "),
        alternates: {
            canonical: `https://moviescafe.vercel.app/tv-shows/tv/${id}/recommendations`,
        },
        authors: [{ name: "Mahmoud Sayed" }],
        creator: "Mahmoud Sayed",
        publisher: "Mahmoud Sayed",
        category: "TV Show Recommendations",
        applicationName: "Movies Cafe",
        openGraph: {
            title: `Recommendations for ${data.name}`,
            description: `Recommended TV shows similar to ${data.name}.`,
            images: [`https://image.tmdb.org/t/p/w500${data.backdrop_path}`],
        },
        twitter: {
            card: "summary_large_image",
            title: `Recommendations for ${data.name}`,
            description: `Recommended TV shows similar to ${data.name}.`,
            images: [`https://image.tmdb.org/t/p/w500${data.backdrop_path}`],
        },
    };
}


interface IProps {
    params: Promise<{ id: string }>
}


const page = async ({ params }: IProps) => {
    const { id } = await params;

    return <>
        <ContainerLayout>
            <MovieRecommendationsPage
                type="tv"
                id={id}
            />
        </ContainerLayout>
    </>;
};

export default page;