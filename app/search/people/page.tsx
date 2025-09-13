import Search from "@/components/pages/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search People",
    description: "Search for people by name.",
    keywords: "search, people, actors, actresses, directors, producers",
    openGraph: {
        title: "Search People - Movies Cafe",
        description: "Search for people by name.",
        url: "https://movies-cafe.vercel.app/search/people",
        siteName: "Movies Cafe",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Search People - Movies Cafe",
        description: "Search for people by name.",
    },
};
const page = () => {
    return <>
        <div className="my-8">
            <Search
                type="person"
                queryKey="people"
            />
        </div>
    </>;
};

export default page;