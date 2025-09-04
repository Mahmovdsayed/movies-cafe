import TvPageLayout from "@/components/layout/TvPageLayout";
import { getTopRatedTVShows } from "@/lib/tmdbAPI";

export const metadata = {
    title: "Top Rated TV Shows",
    description: "Discover the top-rated TV shows of all time. From classics to modern masterpieces, find your next binge-watch.",
    openGraph: {
        title: "Top Rated TV Shows",
        description: "Discover the top-rated TV shows of all time. From classics to modern masterpieces, find your next binge-watch.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Top Rated TV Shows",
        description: "Discover the top-rated TV shows of all time. From classics to modern masterpieces, find your next binge-watch.",
    },
};

const page = () => {
    return <>
        <TvPageLayout
            title="Top Rated TV Shows"
            description="Discover the top-rated TV shows of all time. From classics to modern masterpieces, find your next binge-watch."
            apiFunc={getTopRatedTVShows}
            queryKey="top-rated"
        />
    </>;
};

export default page;