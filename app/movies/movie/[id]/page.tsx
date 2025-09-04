import ContainerLayout from "@/components/layout/ContainerLayout";
import MovieActors from "@/components/ui/Movies&Tv/MovieActors";
import MovieRecommendations from "@/components/ui/Movies&Tv/MovieRecommendations";
import { getMovieDetails } from "@/lib/tmdbAPI";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const data = await getMovieDetails("movie", id)
    return {
        title: data.title,
        description: data.overview,
        keywords: data.genres.map((genre: any) => genre.name).join(", "),
        alternates: {
            canonical: `https://moviescafe.vercel.app/movies/movie/${id}`,
        },
        authors: [{ name: "Mahmoud Sayed" }],
        creator: "Mahmoud Sayed",
        publisher: "Mahmoud Sayed",
        category: "Movie",
        applicationName: "Movies Cafe",
        openGraph: {
            title: data.title,
            description: data.overview,
            images: [`https://image.tmdb.org/t/p/w500${data.backdrop_path}`],
        },
        twitter: {
            card: "summary_large_image",
            title: data.title,
            description: data.overview,
            images: [`https://image.tmdb.org/t/p/w500${data.backdrop_path}`],
        },
    };
}



const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    return <>
        <ContainerLayout>
            <MovieActors
                href="movies"
                type="movie"
                id={id}
            />
            <MovieRecommendations
                href="movies"
                type="movie"
                id={id}
            />
        </ContainerLayout>
    </>;
};

export default Page;
