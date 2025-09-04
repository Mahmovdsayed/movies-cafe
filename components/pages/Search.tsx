"use client";

import { usePageSync } from "@/hooks/usePageSync";
import { SearchData } from "@/lib/tmdbAPI";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import PaginationUi from "../ui/PaginationUi";
import { useState, useEffect } from "react";
import MoviesCard from "../ui/MoviesCard";
import GridLayout from "../layout/GridLayout";
import TvCard from "../ui/TvCard";
import CardMotion from "../motion/CardMotion";
import ActorsCard from "../ui/ActorsCard";

interface IProps {
    type: "person" | "company" | "keyword" | "tv" | "movie";
    queryKey: string;
}

const Search = ({ type, queryKey }: IProps) => {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const { currentPage, setCurrentPage } = usePageSync();

    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);
 
    const { data, isLoading, isError } = useQuery({
        queryFn: () => SearchData(debouncedQuery, currentPage, type),
        queryKey: [`search-${queryKey}-${debouncedQuery}-${currentPage}`, queryKey, debouncedQuery, type, currentPage],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        enabled: !!debouncedQuery,
    });

    if (isLoading) return <h3>Loading data...</h3>;
    if (isError) return <h3>Error loading data</h3>;

    return (
        <>
            {debouncedQuery && data?.results?.length > 0 ? (
                <>
                    <GridLayout isActorGrid={type === "person"}>
                        {data.results.map((item: any, index: number) => (
                            <CardMotion key={item.id} index={index}>
                                {type === "tv" ? (
                                    <TvCard data={item} />
                                ) : type === "person" ? (
                                    <ActorsCard data={item} />
                                ) : (
                                    <MoviesCard data={item} />

                                )}
                            </CardMotion>
                        ))}
                    </GridLayout>
                    <PaginationUi
                        total={Math.min(data?.total_pages ?? 1, 500)}
                        page={currentPage}
                        onChange={setCurrentPage}
                    />
                </>
            ) : debouncedQuery ? (
                <h3 className="text-center text-default-500 my-4">No results found for "{debouncedQuery}"</h3>
            ) : (
                <h3 className="text-center text-default-500 my-4">Type something to start searching...</h3>
            )}
        </>
    );
};

export default Search;
