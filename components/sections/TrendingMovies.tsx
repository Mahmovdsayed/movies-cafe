"use client";

import SwiperHeader from "../ui/utils/SwiperHeader";
import SwiperCard from "../ui/cards/SwiperCard";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { getMovieTrending } from "@/lib/tmdbAPI";

const TrendingMovies = () => {
    const { data, isLoading, isError } = usePaginatedQuery({
        queryFn: getMovieTrending,
        queryKey: `trending-movies-1`,
        page: 1,
        enabled: true,
    });

    if (isLoading || isError) return null;

    return (
        data && (
            <div className="mb-6">
                <SwiperHeader
                    title="Trending Movies"
                    button={true}
                    buttonText="View All"
                    buttonLink="/movies/trending"
                />
                <SwiperCard data={{ data }} type="movie" time={3000} />
            </div>
        )
    );
};

export default TrendingMovies;
