import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search by Keywords",
    description: "Search for movies and TV shows using keywords.",
    keywords: "search, keywords, movies, tv shows, discover",
    openGraph: {
        title: "Search by Keywords - Movies Cafe",
        description: "Search for movies and TV shows using keywords.",
        url: "https://movies-cafe.vercel.app/search/keywords",
        siteName: "Movies Cafe",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Search by Keywords - Movies Cafe",
        description: "Search for movies and TV shows using keywords.",
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