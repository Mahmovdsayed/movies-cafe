'use client'

import SwiperHeader from "../ui/utils/SwiperHeader";
import SwiperCard from "../ui/cards/SwiperCard";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { getMovieUpcoming } from "@/lib/tmdbAPI";
import { useSearchParams } from "next/navigation";

const UpcomingMovies = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const { data, isLoading, isError } = usePaginatedQuery({
        queryFn: getMovieUpcoming,
        queryKey: `upcoming-movies-1`,
        page: 1,
        enabled: page === 1,
    });

    if (page !== 1) return null;

    if (isLoading || isError) return null;

    return (
        data && (
            <div className="mb-6">
                <SwiperHeader
                    title="Upcoming Movies"
                    button={true}
                    buttonText="View All"
                    buttonLink="/movies/upcoming"
                />
                <SwiperCard data={{ data }} type="movie" time={2500} />
            </div>
        )
    );
};

export default UpcomingMovies;
