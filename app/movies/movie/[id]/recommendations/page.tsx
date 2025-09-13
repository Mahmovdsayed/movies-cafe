import ContainerLayout from "@/components/layout/ContainerLayout";
import MovieRecommendationsPage from "@/components/pages/MovieRecommendationsPage";
import { Metadata } from "next";
import { getMovieDetails } from "@/lib/tmdbAPI";

interface IProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const data = await getMovieDetails("movie", id)
    return {
        title: `Recommendations for ${data.title}`,
        description: `Recommended movies similar to ${data.title}.`,
        keywords: data.genres.map((genre: any) => genre.name).join(", "),
        alternates: {
            canonical: `https://moviescafe.vercel.app/movies/movie/${id}/recommendations`,
        },
        authors: [{ name: "Mahmoud Sayed" }],
        creator: "Mahmoud Sayed",
        publisher: "Mahmoud Sayed",
        category: "Movie Recommendations",
        applicationName: "Movies Cafe",
        openGraph: {
            title: `Recommendations for ${data.title}`,
            description: `Recommended movies similar to ${data.title}.`,
            images: [`https://image.tmdb.org/t/p/w500${data.poster_path}`],
        },
        twitter: {
            card: "summary_large_image",
            title: `Recommendations for ${data.title}`,
            description: `Recommended movies similar to ${data.title}.`,
            images: [`https://image.tmdb.org/t/p/w500${data.poster_path}`],
        },
    };
}

const page = async ({ params }: IProps) => {
    const { id } = await params;

    return <>
        <ContainerLayout>
            <MovieRecommendationsPage
                type="movie"
                id={id}
            />
        </ContainerLayout>
    </>;
};

export default page;