import PageLayout from "@/components/layout/PageLayout";
import { getMovieTrending } from "@/lib/tmdbAPI";

const page = () => {
    return <>
        <PageLayout
            title="Trending Movies Today"
            description="Discover the hottest movies of the day. From the latest blockbuster to the classic classics, our platform has something for everyone."
            apiFunc={getMovieTrending}
            queryKey="trending"
            isPages={false}
        />
    </>;
};

export default page;