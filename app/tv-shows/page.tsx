import Banner from "@/components/layout/Banner";
import ContainerLayout from "@/components/layout/ContainerLayout";
import SectionsChips from "@/components/layout/SectionsChips";
import SortByWrapper from "@/components/layout/SortByWrapper";
import Movies from "@/components/pages/Movies";
import AiringToday from "@/components/sections/AiringToday";
import { chipsTvShows } from "@/constant/statics";

export const metadata = {
    title: "TV Shows",
    description: "Explore a wide range of TV shows, from classic series to the latest hits. Discover new favorites and catch up on popular shows across all genres.",
    openGraph: {
        title: "TV Shows",
        description: "Explore a wide range of TV shows, from classic series to the latest hits. Discover new favorites and catch up on popular shows across all genres.",
        siteName: "Movies Cafe",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "TV Shows",
        description: "Explore a wide range of TV shows, from classic series to the latest hits. Discover new favorites and catch up on popular shows across all genres.",
    },
};

const page = () => {
    return <>
        <ContainerLayout>
            <Banner
                title="TV Shows"
                description="Explore a wide range of TV shows, from classic series to the latest hits. Discover new favorites and catch up on popular shows across all genres."
            />
            <div className="mt-8">
                <AiringToday />
                <SectionsChips data={chipsTvShows} />
                <SortByWrapper type="tv" />
                <Movies type="tv" />
            </div>
        </ContainerLayout>
    </>;
};

export default page;