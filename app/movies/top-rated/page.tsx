import PageLayout from "@/components/layout/PageLayout";
import { getMovieTopRated } from "@/lib/tmdbAPI";

export const metadata = {
    title: "Top Rated Movies",
    description: "Discover the most critically acclaimed and highly-rated movies of all time. From timeless classics to modern masterpieces, this collection features films that have captivated audiences and critics alike.",
    openGraph: {
        title: "Top Rated Movies",
        description: "Discover the most critically acclaimed and highly-rated movies of all time. From timeless classics to modern masterpieces, this collection features films that have captivated audiences and critics alike.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Top Rated Movies",
        description: "Discover the most critically acclaimed and highly-rated movies of all time. From timeless classics to modern masterpieces, this collection features films that have captivated audiences and critics alike.",
    },
};

const page = () => {
    return <>
        <PageLayout
            title="Top Rated Movies"
            description="Discover the most critically acclaimed and highly-rated movies of all time. From timeless classics to modern masterpieces, this collection features films that have captivated audiences and critics alike."
            apiFunc={getMovieTopRated}
            queryKey="top-rated"
        />
    </>;
};

export default page;