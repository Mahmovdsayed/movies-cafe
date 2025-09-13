'use client'

import GridLayout from "../layout/GridLayout";
import MoviesCard from "../ui/cards/MoviesCard";
import { MovieType } from "@/types/movie.type";
import { usePageSync } from "@/hooks/usePageSync";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import PaginationUi from "../ui/utils/PaginationUi";
import CardMotion from "../motion/CardMotion";
import LoadingData from "./LoadingData";

interface IProps {
    queryFn: (page: number) => Promise<{ results: MovieType[]; total_pages: number }>;
    queryKey: string;
    isPages?: boolean
}

const MoviesLayout = ({ queryFn, queryKey, isPages = true }: IProps) => {
    const { currentPage, setCurrentPage } = usePageSync();

    const { data, isLoading, isError } = usePaginatedQuery({
        queryFn,
        queryKey: `${queryKey}-${currentPage}`,
        page: currentPage,
    });

    if (isLoading) return <LoadingData />;
    if (isError) return <div>Error fetching data.</div>;

    return (
        <div className="my-6">
            <GridLayout>
                {data?.results?.map((movie: MovieType, index: number) => (
                    <CardMotion key={movie.id} index={index}>
                        <MoviesCard data={movie} />
                    </CardMotion>
                ))}
            </GridLayout>
            {isPages &&
                <PaginationUi
                    total={Math.min(data?.total_pages ?? 1, 500)}
                    page={currentPage}
                    onChange={setCurrentPage}
                />
            }

        </div>
    );
};

export default MoviesLayout;
