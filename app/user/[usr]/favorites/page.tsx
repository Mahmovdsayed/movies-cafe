import UserWatchListAndFavorites from "@/components/pages/UserWatchListAndFavorites";
import { getUserInfo } from "@/helpers/fetcher";
import { Metadata } from "next";


export async function generateMetadata({ params }: { params: Promise<{ usr: string }> }): Promise<Metadata> {
    const { usr } = await params
    const data = await getUserInfo(`/users/${usr}`)
    return {
        title: `Favorites of ${data.name}`,
        description: data.about,
        keywords: `${data.name}, ${data.userName}, profile, movies, tv shows, reviews , favorites`,
        alternates: {
            canonical: `https://moviescafe.vercel.app/user/${usr}/favorites`,
        },
        authors: [{ name: data.name }],
        category: "User Profile",
        applicationName: "Movies Cafe",
        openGraph: {
            title: `Favorites of ${data.name}`,
            description: data.about,
            images: [data.avatar?.url],
            url: `https://moviescafe.vercel.app/user/${usr}/favorites`,
            siteName: "Movies Cafe",
            type: "profile",
        },
        twitter: {
            card: "summary_large_image",
            title: `Favorites of ${data.name}`,
            description: data.about,
            images: [data.avatar?.url],
        },
        metadataBase: new URL("https://moviescafe.vercel.app"),

    }
}
const Page = async ({ params }: { params: Promise<{ usr: string }> }) => {
    const { usr } = await params

    return <>
        <UserWatchListAndFavorites
            title="Favorites"
            desc="Explore a curated collection of movies that have captured their heart and imagination."
            userName={usr}
            type="favorites"
        />
    </>;
};

export default Page;