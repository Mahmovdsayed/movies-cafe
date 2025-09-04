import PageLayout from "@/components/layout/PageLayout";
import { getMovieNowPlaying } from "@/lib/tmdbAPI";

export const metadata = {
    title: "Now Playing Movies",
    description: "Stay updated with the latest movies currently showing in theaters. From action-packed blockbusters to heartwarming dramas, find out what's playing near you.",
    openGraph: {
        title: "Now Playing Movies",
        description: "Stay updated with the latest movies currently showing in theaters. From action-packed blockbusters to heartwarming dramas, find out what's playing near you.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Now Playing Movies",
        description: "Stay updated with the latest movies currently showing in theaters. From action-packed blockbusters to heartwarming dramas, find out what's playing near you.",
    },
};


const page = () => {
    return <>
        <PageLayout
            title="Now Playing Movies"
            description="Stay updated with the latest movies currently showing in theaters. From action-packed blockbusters to heartwarming dramas, find out what's playing near you."
            apiFunc={getMovieNowPlaying}
            queryKey="now-playing"
        />
    </>;
};


export default page;