'use client'
import { getMovieActors } from "@/lib/tmdbAPI";
import { useQuery } from "@tanstack/react-query";
import SwiperHeader from "../ui/utils/SwiperHeader";
import CastCard from "../ui/cards/CastCard";
import { Cast } from "@/types/cast.types";
import LoadingData from "../layout/LoadingData";

interface IProps {
    id: string;
    type: "movie" | "tv";
    cast?: string
}
const MovieActorsPage = ({ id, type, cast }: IProps) => {
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getMovieActors(type, id, cast),
        queryKey: [`actors-${type}-${id}`, type, id, cast],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchIntervalInBackground: true,
    })
    if (isLoading) return <LoadingData />
    if (isError) return <h3>Error loading actors</h3>
    return <>
        {data && data.cast && data.cast.length > 0 && (
            <div className="my-8">
                <SwiperHeader
                    title="All Cast"
                    button={false}
                    description="Explore the talented actors who brought this movie to life."
                />
                {data && data.results && data.results.length === 0 && (
                    <div className="text-center text-default-500 my-4">
                        No cast available.
                    </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 my-6 gap-4">
                    {data.cast.map((castMember: Cast) => (
                        <CastCard type={type} key={castMember.id} data={castMember} />
                    ))}
                </div>
            </div>
        )}
    </>;
};

export default MovieActorsPage;