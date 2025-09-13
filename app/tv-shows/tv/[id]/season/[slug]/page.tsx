import ContainerLayout from "@/components/layout/ContainerLayout";
import SeasonInfo from "@/components/pages/SeasonInfo";
import { getMovieDetails } from "@/lib/tmdbAPI";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const data = await getMovieDetails("tv", id)

    return {
        title: `Season ${data.last_episode_to_air.season_number} for ` + data.name,
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
            title: `Season ${data.last_episode_to_air.season_number} for ` + data.name,
            description: data.overview,
            images: [`https://image.tmdb.org/t/p/w500${data.poster_path}`],
        },
        twitter: {
            card: "summary_large_image",
            title: `Season ${data.last_episode_to_air.season_number} for ` + data.name,
            description: data.overview,
            images: [`https://image.tmdb.org/t/p/w500${data.poster_path}`],
        },
    }
}
const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    return <>
        <ContainerLayout>
            <SeasonInfo seasonID={slug} />
        </ContainerLayout>
    </>;
};

export default Page;