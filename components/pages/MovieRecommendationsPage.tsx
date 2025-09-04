'use client'

import { getMovieRecommendations } from "@/lib/tmdbAPI";
import { useQuery } from "@tanstack/react-query";
import GridLayout from "../layout/GridLayout";
import CardMotion from "../motion/CardMotion";
import MoviesCard from "../ui/MoviesCard";
import { MovieType } from "@/types/movie.type";
import PaginationUi from "../ui/PaginationUi";
import { usePageSync } from "@/hooks/usePageSync";
import SwiperHeader from "../ui/SwiperHeader";
import TvCard from "../ui/TvCard";
import { TvShowsTypes } from "@/types/tv.types";

interface IProps {
    id: string
    type: "movie" | "tv";
}
const MovieRecommendationsPage = ({ id, type }: IProps) => {
    const { currentPage, setCurrentPage } = usePageSync();

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getMovieRecommendations(type, id, currentPage),
        queryKey: [`MovieRecommendations-${type}-${id}-${currentPage}`, type, id, currentPage],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchIntervalInBackground: true,
        
    })

    isLoading && <h3>Loading recommendations...</h3>
    isError && <h3>Error loading recommendations</h3>
    return <>
        <div className="my-6">
            <SwiperHeader
                description="Discover similar movies based on your interests."
                title="Recommendations"
                button={false}
            />
            <GridLayout>
                {data?.results?.map((movie: any, index: number) => (
                    <CardMotion key={movie.id} index={index}>
                        {type === "tv" ? (
                            <TvCard data={movie as TvShowsTypes} />
                        ) : (
                            <MoviesCard data={movie as MovieType} />
                        )}
                    </CardMotion>
                ))}
            </GridLayout>

            <PaginationUi
                total={Math.min(data?.total_pages ?? 1, 500)}
                page={currentPage}
                onChange={setCurrentPage}
            />


        </div>
    </>;
};

export default MovieRecommendationsPage;