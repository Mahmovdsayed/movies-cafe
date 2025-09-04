'use client';

import { usePageSync } from "@/hooks/usePageSync";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { TvShowsTypes } from "@/types/tv.types";
import GridLayout from "./GridLayout";
import CardMotion from "../motion/CardMotion";
import PaginationUi from "../ui/PaginationUi";
import TvCard from "../ui/TvCard";

interface IProps {
    queryFn: (page: number) => Promise<{ results: TvShowsTypes[]; total_pages: number }>;
    queryKey: string;
    isPages?: boolean
}
const TvsLayout = ({ queryFn, queryKey, isPages = true }: IProps) => {
    const { currentPage, setCurrentPage } = usePageSync();

    const { data, isLoading, isError } = usePaginatedQuery({
        queryFn,
        queryKey: `${queryKey}-${currentPage}`,
        page: currentPage,
    });
    console.log(data)

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data.</div>;

    return <>
        <div className="my-6">
            <GridLayout>
                {data?.results.map((tvShow: TvShowsTypes, index: number) => (
                    <CardMotion key={tvShow.id} index={index}>
                        <TvCard data={tvShow} />
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
    </>;
};

export default TvsLayout;