import Search from "@/components/pages/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search TV Shows",
    description: "Search for TV shows by title, genre, or cast.",
    keywords: "search, tv shows, discover, series, television",
    openGraph: {
        title: "Search TV Shows - Movies Cafe",
        description: "Search for TV shows by title, genre, or cast.",
        url: "https://movies-cafe.vercel.app/search/tv-shows",
        siteName: "Movies Cafe",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Search TV Shows - Movies Cafe",
        description: "Search for TV shows by title, genre, or cast.",
    },
};
const page = () => {
    return <>
        <div className="my-8">
            <Search
                type="tv"
                queryKey="tvs"
            />
        </div>
    </>;
};

export default page;