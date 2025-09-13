'use client'

import { actorCredits } from "@/lib/tmdbAPI";
import { useQuery } from "@tanstack/react-query";
import SwiperHeader from "../utils/SwiperHeader";
import SwiperCard from "../cards/SwiperCard";
import LoadingData from "@/components/layout/LoadingData";

interface IProps {
    type: "movie_credits" | "tv_credits"
    id: string
}
const Credits = ({ type, id }: IProps) => {
    const { data, isLoading, isError } = useQuery({
        queryFn: () => actorCredits(id, type),
        queryKey: [`actor-${id}-${type}`, id, type],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchIntervalInBackground: true,
    })

    isLoading && <h3><LoadingData /></h3>
    isError && <h3>Error loading recommendations</h3>

    return <>
        { }
        <SwiperHeader
            title={type === "movie_credits" ? "Movies" : "TV Shows"}
            description={`Explore the ${type === "movie_credits" ? "movies" : "TV shows"} featuring this actor and discover their diverse roles and performances.`}
            button={false}
        // buttonText="View All"
        // buttonLink={`/actors/actor/${id}/${type === "movie_credits" ? "movies" : "tv"}`}
        />
        {data && data.cast && data.cast.length === 0 && (
            <div className="text-center text-default-500 my-4">
                No {type === "movie_credits" ? "movies" : "TV shows"} available.
            </div>
        )}
        <SwiperCard data={{ data }} isActor type={type === "movie_credits" ? "movies" : "tv"} time={type === "movie_credits" ? 1000 : 1500} />
    </>;
};

export default Credits;