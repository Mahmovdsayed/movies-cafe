
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search",
    description: "Search for movies, TV shows, and people.",
    keywords: "search, movies, tv shows, people, discover",
    openGraph: {
        title: "Search - Movies Cafe",
        description: "Search for movies, TV shows, and people.",
        url: "https://movies-cafe.vercel.app/search",
        siteName: "Movies Cafe",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Search - Movies Cafe",
        description: "Search for movies, TV shows, and people.",
    },
};
const Page = () => {
    return redirect("/search/movies");
};

export default Page;