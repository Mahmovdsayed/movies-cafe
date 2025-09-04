import TvPageLayout from "@/components/layout/TvPageLayout";
import { getAiringToday } from "@/lib/tmdbAPI";

export const metadata = {
    title: "Airing Today TV Shows",
    description: "Stay updated with the latest TV shows airing today. Discover new episodes and catch up on your favorite series as they release.",
    openGraph: {
        title: "Airing Today TV Shows",
        description: "Stay updated with the latest TV shows airing today. Discover new episodes and catch up on your favorite series as they release.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Airing Today TV Shows",
        description: "Stay updated with the latest TV shows airing today. Discover new episodes and catch up on your favorite series as they release.",
    },
};

const page = () => {
    return <>
        <TvPageLayout
            title="Airing Today TV Shows"
            description="Stay updated with the latest TV shows airing today. Discover new episodes and catch up on your favorite series as they release."
            apiFunc={getAiringToday}
            queryKey="airing-today"
        />
    </>;
};

export default page;