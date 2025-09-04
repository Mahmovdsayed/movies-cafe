import Banner from "@/components/layout/Banner";
import ContainerLayout from "@/components/layout/ContainerLayout";
import SectionsChips from "@/components/layout/SectionsChips";
import UpcomingMovies from "@/components/sections/UpcomingMovies";
import { chipsMoviesData } from "@/constant/statics";
import Movies from "@/components/pages/Movies";
import SortByWrapper from "@/components/layout/SortByWrapper";

export const metadata = {
    title: "Movies",
    description: "Explore the Latest and Greatest Movies",
    openGraph: {
        title: "Movies",
        description: "Explore the Latest and Greatest Movies",
        siteName: "Movies Cafe",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Movies",
        description: "Explore the Latest and Greatest Movies",
    },

};

const Page = () => {

    return (
        <ContainerLayout>
            <Banner
                title="Explore the Latest and Greatest Movies"
                description="Discover a wide selection of movies across all genres, from the latest blockbusters to timeless classics. Browse through action, comedy, horror, and more. Add your favorites to your personal collection and stay up to date with what's trending!"
            />

            <div className="mt-8">
                <UpcomingMovies />
                <SectionsChips data={chipsMoviesData} />
                <SortByWrapper />
                <Movies />
            </div>
        </ContainerLayout>
    );
};

export default Page;
