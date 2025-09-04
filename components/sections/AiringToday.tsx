'use client'

import SwiperHeader from "../ui/SwiperHeader";
import SwiperCard from "../ui/SwiperCard";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { getAiringToday } from "@/lib/tmdbAPI";
import { useSearchParams } from "next/navigation";

const AiringToday = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const { data, isLoading, isError } = usePaginatedQuery({
        queryFn: getAiringToday,
        queryKey: `AiringToday-1`,
        page: 1,
        enabled: page === 1,
    });

    if (page !== 1) return null;
    if (isLoading || isError) return null;

    return (
        data && (
            <div className="mb-6">
                <SwiperHeader
                    title="Airing Today TV Shows"
                    button={true}
                    buttonText="View All"
                    buttonLink="/tv-shows/airing-today"
                />
                <SwiperCard data={{ data }} type="tv" time={2500}
                />
            </div>
        )
    );
};

export default AiringToday; 