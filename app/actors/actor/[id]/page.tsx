import ContainerLayout from "@/components/layout/ContainerLayout";
import Credits from "@/components/ui/Actor/Credits";
import { actorDetails } from "@/lib/tmdbAPI";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const data = await actorDetails(id)
    return {
        title: data.name,
        description: data.biography,
        keywords: data.known_for_department,
        alternates: {
            canonical: `https://moviescafe.vercel.app/actors/actor/${id}`,
        },
        authors: [{ name: "Mahmoud Sayed" }],
        creator: "Mahmoud Sayed",
        publisher: "Mahmoud Sayed",
        category: "Actor",
        applicationName: "Movies Cafe",
        openGraph: {
            title: data.name,
            description: data.biography,
            images: [`https://image.tmdb.org/t/p/w500${data.profile_path}`],
        },
        twitter: {
            card: "summary_large_image",
            title: data.name,
            description: data.biography,
            images: [`https://image.tmdb.org/t/p/w500${data.profile_path}`],
        },
    }
}


const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return <>
        <ContainerLayout>
            <div className="my-8">
                <Credits
                    type="movie_credits"
                    id={id}
                />
            </div>
            <div className="my-8">
                <Credits
                    type="tv_credits"
                    id={id}
                />
            </div>
        </ContainerLayout>
    </>;
};

export default Page;
