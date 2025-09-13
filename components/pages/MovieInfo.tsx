'use client'

import { getMovieDetails } from "@/lib/tmdbAPI";
import { useQuery } from "@tanstack/react-query";
import MovieHeader from "../ui/Movies&Tv/MovieHeader";
import LoadingData from "../layout/LoadingData";

interface IProps {
    type: "movie" | "tv";
    id: string;

}
const MovieInfo = ({ id, type }: IProps) => {
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getMovieDetails(type, id),
        queryKey: [`Info-${type}-${id}`, type, id],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchIntervalInBackground: true,
    })

    if (isLoading) return null;
    if (isError) return <h3>Error loading movie details</h3>

    return <>
        <MovieHeader
            type={type}
            id={id}
            banner={data?.backdrop_path}
            title={data?.title || data?.name}
            description={data?.overview}
            poster={data?.poster_path}
            genres={data?.genres}
            runtime={data?.runtime}
            vote_average={data?.vote_average}
            release_date={data?.release_date || data?.first_air_date}
            original_language={data?.original_language}
            production_countries={data?.production_countries}
            spoken_languages={data?.spoken_languages}
            status={data?.status}
            tagline={data?.tagline}
            homepage={data?.homepage}
        />
    </>;
};

export default MovieInfo;