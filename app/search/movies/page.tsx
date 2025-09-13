
import Search from "@/components/pages/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search Movies",
    description: "Search for movies by title, genre, or cast.",
    keywords: "search, movies, discover, film, cinema",
    openGraph: {
        title: "Search Movies - Movies Cafe",
        description: "Search for movies by title, genre, or cast.",
        url: "https://movies-cafe.vercel.app/search/movies",
        siteName: "Movies Cafe",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Search Movies - Movies Cafe",
        description: "Search for movies by title, genre, or cast.",
    },
};
const page = () => {
    return <>
        <div className="my-8">
            <Search
                type="movie"
                queryKey="movies"
            />
        </div>
    </>;
};

export default page;