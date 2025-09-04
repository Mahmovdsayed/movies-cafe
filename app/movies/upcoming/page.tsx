import PageLayout from "@/components/layout/PageLayout";
import { getMovieUpcoming } from "@/lib/tmdbAPI";

export const metadata = {
    title: "Upcoming Movies",
    description: "DGet a sneak peek at the most anticipated films hitting theaters soon. Stay ahead and mark your watchlist!",
    openGraph: {
        title: "Upcoming Movies",
        description: "DGet a sneak peek at the most anticipated films hitting theaters soon. Stay ahead and mark your watchlist!",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Upcoming Movies",
        description: "DGet a sneak peek at the most anticipated films hitting theaters soon. Stay ahead and mark your watchlist!",
    },
};

const page = () => {
    return <>
        <PageLayout
            title="Upcoming Movies"
            description="Get a sneak peek at the most anticipated films hitting theaters soon. Stay ahead and mark your watchlist!"
            apiFunc={getMovieUpcoming}
            queryKey="upcoming-movies"
        />
    </>;
};

export default page;