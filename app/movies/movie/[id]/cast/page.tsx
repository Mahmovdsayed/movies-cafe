import ContainerLayout from "@/components/layout/ContainerLayout";
import MovieActorsPage from "@/components/pages/MovieActorsPage";
import { getMovieDetails } from "@/lib/tmdbAPI";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const data = await getMovieDetails("movie", id)
    return {
        title: `Cast for ${data.title}`,
        description: `Cast and crew for ${data.title}.`,
        keywords: data.genres.map((genre: any) => genre.name).join(", "),
        alternates: {
            canonical: `https://moviescafe.vercel.app/movies/movie/${id}/cast`,
        },
        authors: [{ name: "Mahmoud Sayed" }],
        creator: "Mahmoud Sayed",
        publisher: "Mahmoud Sayed",
        category: "Movie Cast",
        applicationName: "Movies Cafe",
        openGraph: {
            title: `Cast for ${data.title}`,
            description: `Cast and crew for ${data.title}.`,
            images: [`https://image.tmdb.org/t/p/w500${data.backdrop_path}`],
        },
        twitter: {
            card: "summary_large_image",
            title: `Cast for ${data.title}`,
            description: `Cast and crew for ${data.title}.`,
            images: [`https://image.tmdb.org/t/p/w500${data.backdrop_path}`],
        },
    };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params;

    return <>
        <ContainerLayout>
            <MovieActorsPage
                type="movie"
                id={id}
            />
        </ContainerLayout>
    </>;
};

export default page;