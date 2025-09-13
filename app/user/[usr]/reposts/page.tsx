import Banner from "@/components/layout/Banner";
import UserReposts from "@/components/pages/UserReposts";
import { getUserInfo } from "@/helpers/fetcher";
import { Metadata } from "next";


export async function generateMetadata({ params }: { params: Promise<{ usr: string }> }): Promise<Metadata> {
    const { usr } = await params
    const data = await getUserInfo(`/users/${usr}`)
    return {
        title: `Reposts of ${data.name} `,
        description: data.about,
        keywords: `${data.name}, ${data.userName}, profile, movies, tv shows, reviews, reposts`,
        alternates: {
            canonical: `https://moviescafe.vercel.app/user/${usr}/reposts`,
        },
        authors: [{ name: data.name }],
        category: "User Profile",
        applicationName: "Movies Cafe",
        openGraph: {
            title: `Reposts of ${data.name}`,
            description: data.about,
            images: [data.avatar?.url],
            url: `https://moviescafe.vercel.app/user/${usr}/reposts`,
            siteName: "Movies Cafe",
            type: "profile",
        },
        twitter: {
            card: "summary_large_image",
            title: `Reposts of ${data.name}`,
            description: data.about,
            images: [data.avatar?.url],
        },
        metadataBase: new URL("https://moviescafe.vercel.app"),

    }
}
const Page = async ({ params }: { params: Promise<{ usr: string }> }) => {
    const { usr } = await params
    return <>
        <div className="mt-6">
            <Banner
                title="Reposts"
                description="Discover the movies and TV shows they've shared and recommended."
            />
            <UserReposts userName={usr} />
        </div>
    </>;
};

export default Page;