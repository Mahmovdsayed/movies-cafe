'use client'

import { MovieType } from "@/types/movie.type";
import GridLayout from "../layout/GridLayout";
import MoviesCard from "../ui/MoviesCard";
import { useMovies } from "@/hooks/useMovies";
import { usePageSync } from "@/hooks/usePageSync";
import PaginationUi from "../ui/PaginationUi";
import CardMotion from "../motion/CardMotion";
import TvCard from "../ui/TvCard";
import { TvShowsTypes } from "@/types/tv.types";

const Movies = ({ type = "movie" }: { type?: "movie" | "tv" }) => {
    const { currentPage, setCurrentPage } = usePageSync();

    const { data, isLoading, isError } = useMovies({
        page: currentPage,
        type
    });
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading movies</p>;

    return <>
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
    </>;
};
export default Movies;
