import ContainerLayout from "@/components/layout/ContainerLayout";
import MovieActorsPage from "@/components/pages/MovieActorsPage";

import { Metadata } from "next";
import { getMovieDetails } from "@/lib/tmdbAPI";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const data = await getMovieDetails("tv", id)
    return {
        title: `Cast for ${data.name}`,
        description: `Cast and crew for ${data.name}.`,
        keywords: data.genres.map((genre: any) => genre.name).join(", "),
        alternates: {
            canonical: `https://moviescafe.vercel.app/tv-shows/tv/${id}/cast`,
        },
        authors: [{ name: "Mahmoud Sayed" }],
        creator: "Mahmoud Sayed",
        publisher: "Mahmoud Sayed",
        category: "TV Show Cast",
        applicationName: "Movies Cafe",
        openGraph: {
            title: `Cast for ${data.name}`,
            description: `Cast and crew for ${data.name}.`,
            images: [`https://image.tmdb.org/t/p/w500${data.backdrop_path}`],
        },
        twitter: {
            card: "summary_large_image",
            title: `Cast for ${data.name}`,
            description: `Cast and crew for ${data.name}.`,
            images: [`https://image.tmdb.org/t/p/w500${data.backdrop_path}`],
        },
    };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return <>
        <ContainerLayout>
            <MovieActorsPage cast={"aggregate_credits"} type="tv" id={id} />
        </ContainerLayout>
    </>;
};

export default page;