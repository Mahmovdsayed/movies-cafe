"use client";

import SwiperHeader from "../ui/utils/SwiperHeader";
import SwiperCard from "../ui/cards/SwiperCard";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { getMovieTopRated } from "@/lib/tmdbAPI";

const TopRatedMovies = () => {
    const { data, isLoading, isError } = usePaginatedQuery({
        queryFn: getMovieTopRated,
        queryKey: `top-rated-movies-1`,
        page: 1,
        enabled: true,
    });

    if (isLoading || isError) return null;

    return (
        data && (
            <div className="mb-6">
                <SwiperHeader
                    title="Top Rated Movies"
                    button={true}
                    buttonText="View All"
                    buttonLink="/movies/top-rated"
                />
                <SwiperCard data={{ data }} type="movie" time={4000} />
            </div>
        )
    );
};

export default TopRatedMovies;
