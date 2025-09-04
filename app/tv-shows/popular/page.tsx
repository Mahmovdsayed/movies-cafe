import TvPageLayout from "@/components/layout/TvPageLayout";
import { getPopularTVShows } from "@/lib/tmdbAPI";

export const metadata = {
    title: "Popular TV Shows",
    description: "Discover the most popular TV shows currently airing. Stay updated with new episodes and fan-favorite series.",
    openGraph: {
        title: "Popular TV Shows",
        description: "Discover the most popular TV shows currently airing. Stay updated with new episodes and fan-favorite series.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Popular TV Shows",
        description: "Discover the most popular TV shows currently airing. Stay updated with new episodes and fan-favorite series.",
    },
};

const page = () => {
    return <>
        <TvPageLayout
            title="Popular TV Shows"
            description="Discover the most popular TV shows currently airing. Stay updated with new episodes and fan-favorite series."
            apiFunc={getPopularTVShows}
            queryKey="popular"
        />
    </>;
};

export default page;