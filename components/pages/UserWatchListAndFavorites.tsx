'use client'
import { useQuery } from "@tanstack/react-query";
import Banner from "../layout/Banner";
import { userInfoAPI } from "@/lib/tmdbAPI";
import { usePageSync } from "@/hooks/usePageSync";
import GridLayout from "../layout/GridLayout";
import { favoritesType } from "@/types/favorites.types";
import CardMotion from "../motion/CardMotion";
import PaginationUi from "../ui/utils/PaginationUi";
import FavAndWatchCard from "../ui/addTo/FavAndWatchCard";
import LoadingData from "../layout/LoadingData";

interface IProps {
    userName: string
    type: 'favorites' | 'watchlist'
    desc: string
    title: string
}
const UserWatchListAndFavorites = ({ userName, type, desc, title }: IProps) => {
    const { currentPage, setCurrentPage } = usePageSync();

    const { data, isLoading, isError } = useQuery({
        queryFn: () => userInfoAPI(`/users/${userName}/${type}?page=${currentPage}`),
        queryKey: [`user-${type}`, `${type}-${userName}`, userName, currentPage],
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        enabled: !!userName,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <div className="mt-6 text-xl font-medium text-center text-default-500"><LoadingData /></div>
    if (isError) return <div className="mt-6 text-xl font-medium text-center text-default-500">Error loading profile</div>
    if (!data || data.data.length === 0) return <div className="mt-6 text-xl font-medium text-center text-default-500">No {type} found for this user.</div>;

    return <>
        <div className="mt-6">
            <Banner
                title={title}
                description={desc}
            />
            <div className="mt-6 mb-14">
                <GridLayout>
                    {data?.data.map((favorites: favoritesType, index: number) =>
                        <CardMotion key={favorites._id} index={index}>
                            <FavAndWatchCard
                                user={favorites?.userID}
                                itemID={favorites._id}
                                movieID={favorites.movieID}
                                movieTitle={favorites.movieTitle}
                                movieBanner={favorites.movieBanner}
                                movieReleaseDate={favorites.movieReleaseDate}
                                movieOverview={favorites.movieOverview}
                                type={favorites.type}
                                createdAt={favorites.createdAt}
                                itemType={type}
                            />
                        </CardMotion>
                    )}
                </GridLayout>
            </div>
            <PaginationUi
                total={Math.min(data?.total_pages ?? 1, 999)}
                page={currentPage}
                onChange={setCurrentPage}
            />
        </div>
    </>;
};

export default UserWatchListAndFavorites;