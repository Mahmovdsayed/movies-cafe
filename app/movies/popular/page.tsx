import ContainerLayout from "@/components/layout/ContainerLayout";
import PageLayout from "@/components/layout/PageLayout";
import { getMoviePopular } from "@/lib/tmdbAPI";

export const metadata = {
    title: "Popular Movies",
    description: "Discover the most popular movies on our platform. Explore a world of entertainment and action-packed adventures.",
    openGraph: {
        title: "Popular Movies",
        description: "Discover the most popular movies on our platform. Explore a world of entertainment and action-packed adventures.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Popular Movies",
        description: "Discover the most popular movies on our platform. Explore a world of entertainment and action-packed adventures.",
    },
};

const page = () => {
    return <>
        <PageLayout
            title="Popular Movies"
            description="Discover the most popular movies on our platform. Explore a world of entertainment and action-packed adventures."
            apiFunc={getMoviePopular}
            queryKey="popular-movies"
        />
    </>;
};

export default page;