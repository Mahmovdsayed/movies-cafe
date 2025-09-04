'use client'

import { getMovieActors } from "@/lib/tmdbAPI";
import { useQuery } from "@tanstack/react-query";
import CastCard from "../CastCard";
import { Cast } from "@/types/cast.types";
import { Button, Link } from "@heroui/react";
import SwiperHeader from "../SwiperHeader";

interface IProps {
    type: "movie" | "tv"
    id: string
    href: string
    cast?: string
}

const MovieActors = ({ type, id, href, cast }: IProps) => {
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getMovieActors(type, id, cast),
        queryKey: [`actors-${type}-${id}`, type, id, cast],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchIntervalInBackground: true,
    })
    if (isLoading) return <h3>Loading...</h3>
    if (isError) return <h3>Error loading actors</h3>
    return <>
        {data && data.cast && data.cast.length > 0 && (
            <div className="my-8">
                <SwiperHeader
                    title="Top Cast"
                    button={data.cast.length > 4}
                    buttonText="View All"
                    buttonLink={`/${href}/${type}/${id}/cast`}
                    description="Explore the talented actors who brought this movie to life."
                />
                {data && data.results && data.results.length === 0 && (
                    <div className="text-center text-default-500 my-4">
                        No cast available.
                    </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {data.cast.slice(0, 4).map((castMember: Cast) => (
                        <CastCard type={type} key={castMember.id} data={castMember} />
                    ))}
                </div>
            </div>
        )}
    </>;
};

export default MovieActors;