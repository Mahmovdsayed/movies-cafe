'use client';

import { usePageSync } from "@/hooks/usePageSync";
import { getAllActors } from "@/lib/tmdbAPI";
import { useQuery } from "@tanstack/react-query";
import PaginationUi from "../ui/utils/PaginationUi";
import CardMotion from "../motion/CardMotion";
import ActorsCard from "../ui/cards/ActorsCard";
import { Actor } from "@/types/actor.types";
import LoadingData from "../layout/LoadingData";

const AllActors = () => {
    const { currentPage, setCurrentPage } = usePageSync();

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getAllActors(currentPage),
        queryKey: [`allActors-${currentPage}`, currentPage],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchIntervalInBackground: true,
    });

    if (isLoading) return <LoadingData />;
    if (isError) return <p>Error loading actors</p>;

    return (
        <>
            <div className="flex-grow grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {data?.results
                    ?.filter((actor: any) => !actor.adult)
                    .map((actor: Actor, index: number) => (
                        <CardMotion index={index} key={actor.id}>
                            <ActorsCard data={actor} />
                        </CardMotion>
                    ))}
            </div>

            <PaginationUi
                total={Math.min(data?.total_pages ?? 1, 500)}
                page={currentPage}
                onChange={setCurrentPage}
            />
        </>
    );
};

export default AllActors;
