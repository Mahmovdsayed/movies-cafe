import ContainerLayout from "@/components/layout/ContainerLayout";
import MovieActors from "@/components/ui/Movies&Tv/MovieActors";
import MovieRecommendations from "@/components/ui/Movies&Tv/MovieRecommendations";
import Seasons from "@/components/ui/Movies&Tv/Seasons";
import { getMovieDetails } from "@/lib/tmdbAPI";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const data = await getMovieDetails("tv", id)

    return {
        title: data.name,
        description: data.overview,
        keywords: data.genres.map((genre: any) => genre.name).join(", "),
        alternates: {
            canonical: `https://moviescafe.vercel.app/tv-shows/tv/${id}`,
        },
        authors: [{ name: "Mahmoud Sayed" }],
        creator: "Mahmoud Sayed",
        publisher: "Mahmoud Sayed",
        category: "TV Show",
        applicationName: "Movies Cafe",
        openGraph: {
            title: data.name,
            description: data.overview,
            images: [`https://image.tmdb.org/t/p/w500${data.poster_path}`],
        },
        twitter: {
            card: "summary_large_image",
            title: data.name,
            description: data.overview,
            images: [`https://image.tmdb.org/t/p/w500${data.poster_path}`],
        },
    }
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return <>
        <ContainerLayout>
            <MovieActors
                href="tv-shows"
                type="tv"
                id={id}
                cast={"aggregate_credits"}
            />
            <MovieRecommendations
                href="tv-shows"
                type="tv"
                id={id}
            />
            <Seasons id={id} />
        </ContainerLayout>
    </>
}


export default Page;