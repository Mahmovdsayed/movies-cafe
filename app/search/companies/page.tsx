
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search by Companies",
    description: "Search for movies and TV shows by production companies.",
    keywords: "search, companies, movies, tv shows, discover, production companies",
    openGraph: {
        title: "Search by Companies - Movies Cafe",
        description: "Search for movies and TV shows by production companies.",
        url: "https://movies-cafe.vercel.app/search/companies",
        siteName: "Movies Cafe",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Search by Companies - Movies Cafe",
        description: "Search for movies and TV shows by production companies.",
    },
};

const page = () => {
    return <>
        <div className="my-8">
            <h2 className="text-center text-2xl font-bold text-default-500">Coming Soon</h2>
            <p className="text-center text-default-400 mt-2">This feature is under development. Please check back later!</p>
        </div>
    </>;
};

export default page;