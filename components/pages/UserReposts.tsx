'use client'

import { usePageSync } from "@/hooks/usePageSync";
import { userInfoAPI } from "@/lib/tmdbAPI";
import { useQuery } from "@tanstack/react-query";
import GridLayout from "../layout/GridLayout";
import { Repost } from "@/types/repost.types";
import CardMotion from "../motion/CardMotion";
import RepostCard from "../ui/post/RepostCard";
import PaginationUi from "../ui/utils/PaginationUi";
import LoadingData from "../layout/LoadingData";

interface IProps {
    userName: string
}
const UserReposts = ({ userName }: IProps) => {
    const { currentPage, setCurrentPage } = usePageSync();
    const { data, isLoading, isError } = useQuery({
        queryFn: () => userInfoAPI(`/users/${userName}/reposts?page=${currentPage}`),
        queryKey: [`user-reposts`, `reposts-${userName}`, userName, currentPage],
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        enabled: !!userName,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <div className="mt-6 text-xl font-medium text-center text-default-500"><LoadingData /></div>
    if (isError) return <div className="mt-6 text-xl font-medium text-center text-default-500">Error loading profile</div>
    if (!data || data.data.length === 0) return <div className="mt-6 text-xl font-medium text-center text-default-500">No reposts found for this user.</div>;

    return <>
        <div className="mt-6 mb-14">
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4">
                {data?.data.map((repost: Repost, index: number) =>
                    <CardMotion key={repost._id} index={index}>
                        <RepostCard
                            post={repost}
                        />
                    </CardMotion>
                )}
            </div>
        </div>
        <PaginationUi
            total={Math.min(data?.total_pages ?? 1, 999)}
            page={currentPage}
            onChange={setCurrentPage}
        />
    </>;
};

export default UserReposts;