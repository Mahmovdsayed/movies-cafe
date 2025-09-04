'use client'

import { getMovieRecommendations } from "@/lib/tmdbAPI";
import { useQuery } from "@tanstack/react-query";
import SwiperHeader from "../SwiperHeader";
import SwiperCard from "../SwiperCard";

interface IProps {
    type: string;
    id: string;
    href: string;
}
const MovieRecommendations = ({ type, id, href }: IProps) => {
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getMovieRecommendations(type, id, 1),
        queryKey: [`MovieRecommendations-${type}-${id}-1`, type, id],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchIntervalInBackground: true,
    })

    isLoading && <h3>Loading recommendations...</h3>
    isError && <h3>Error loading recommendations</h3>

    return <>
        <SwiperHeader
            description={`Discover similar ${type}s based on your interests.`}
            title="Recommendations"
            button={data && data.results && data.results.length === 0 && false ? false
                : true
            }
            buttonText="View All"
            buttonLink={`/${href}/${type}/${id}/recommendations`}
        />
        {data && data.results && data.results.length === 0 && (
            <div className="text-center text-default-500 my-4">
                No recommendations available.
            </div>
        )}
        <SwiperCard data={{ data }} type={type} time={1000} />
    </>;
};

export default MovieRecommendations;