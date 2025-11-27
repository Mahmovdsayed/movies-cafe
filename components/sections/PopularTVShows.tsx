"use client";

import SwiperHeader from "../ui/utils/SwiperHeader";
import SwiperCard from "../ui/cards/SwiperCard";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { getPopularTVShows } from "@/lib/tmdbAPI";

const PopularTVShows = () => {
    const { data, isLoading, isError } = usePaginatedQuery({
        queryFn: getPopularTVShows,
        queryKey: `popular-tv-shows-1`,
        page: 1,
        enabled: true,
    });

    if (isLoading || isError) return null;

    return (
        data && (
            <div className="mb-6">
                <SwiperHeader
                    title="Popular TV Shows"
                    button={true}
                    buttonText="View All"
                    buttonLink="/tv-shows/popular"
                />
                <SwiperCard data={{ data }} type="tv" time={3500} />
            </div>
        )
    );
};

export default PopularTVShows;
