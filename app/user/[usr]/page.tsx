import FavoritesAndWatchList from "@/components/sections/FavoritesAndWatchList";
import { getUserInfo } from "@/helpers/fetcher";
import { Metadata } from "next";


export async function generateMetadata({ params }: { params: Promise<{ usr: string }> }): Promise<Metadata> {
    const { usr } = await params
    const data = await getUserInfo(`/users/${usr}`)
    return {
        title: data.name,
        description: data.about,
        keywords: `${data.name}, ${data.userName}, profile, movies, tv shows, reviews`,
        alternates: {
            canonical: `https://moviescafe.vercel.app/user/${usr}`,
        },
        authors: [{ name: data.name }],
        category: "User Profile",
        applicationName: "Movies Cafe",
        openGraph: {
            title: data.name,
            description: data.about,
            images: [data.avatar?.url],
            url: `https://moviescafe.vercel.app/user/${usr}`,
            siteName: "Movies Cafe",
            type: "profile",
        },
        twitter: {
            card: "summary_large_image",
            title: data.name,
            description: data.about,
            images: [data.avatar?.url],
        },
        metadataBase: new URL("https://moviescafe.vercel.app"),

    }
}
const Page = async ({ params }: { params: Promise<{ usr: string }> }) => {
    const { usr } = await params
    return <>
        <div className="my-6">
            <FavoritesAndWatchList desc="Explore a curated collection of movies that have captured their heart and imagination." title="favorites" type="favorites" userName={usr} />
        </div>
        <div className="my-14">
            <FavoritesAndWatchList desc="Explore a curated collection of movies that they plan to watch in the future." title="watchlist" type="watchlist" userName={usr} />
        </div>
    </>;
};

export default Page;