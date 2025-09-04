import TvPageLayout from "@/components/layout/TvPageLayout";
import { getOnTheAir } from "@/lib/tmdbAPI";


export const metadata = {
    title: "On The Air TV Shows",
    description: "Discover the latest TV shows that are currently airing. Stay updated with new episodes and popular series as they broadcast live.",
    openGraph: {
        title: "On The Air TV Shows",
        description: "Discover the latest TV shows that are currently airing. Stay updated with new episodes and popular series as they broadcast live.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "On The Air TV Shows",
        description: "Discover the latest TV shows that are currently airing. Stay updated with new episodes and popular series as they broadcast live.",
    },
};

const page = () => {
    return <>
        <TvPageLayout
            title="On The Air TV Shows"
            description="Discover the latest TV shows that are currently airing. Stay updated with new episodes and popular series as they broadcast live."
            apiFunc={getOnTheAir

            }
            queryKey="on-the-air"
        />
    </>;
};

export default page;