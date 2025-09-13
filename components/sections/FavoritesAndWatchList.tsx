'use client'

import { useQuery } from "@tanstack/react-query";
import SwiperHeader from "../ui/utils/SwiperHeader";
import { userInfoAPI } from "@/lib/tmdbAPI";
import GridLayout from "../layout/GridLayout";
import { favoritesType } from "@/types/favorites.types";
import CardMotion from "../motion/CardMotion";
import FavAndWatchCard from "../ui/addTo/FavAndWatchCard";
import { motion } from "framer-motion";
import LoadingData from "../layout/LoadingData";

interface IProps {
    title: string;
    userName: string;
    type: 'favorites' | 'watchlist'
    desc: string
}
const FavoritesAndWatchList = ({ userName, title, type, desc }: IProps) => {

    const { data, isLoading, isError } = useQuery({
        queryFn: () => userInfoAPI(`/users/${userName}/${type}`),
        queryKey: [`user-${type}`, `${type}-${userName}`, userName],
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        enabled: !!userName,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <div className="mt-6 text-xl font-medium text-center text-default-500"><LoadingData /></div>
    if (isError) return <div className="mt-6 text-xl font-medium text-center text-default-500">Error loading profile</div>

    return <>
        <div className="mt-6">
            <SwiperHeader
                title={title}
                description={desc}
                button={data?.data.length === 0 ? false : true}
                buttonText="View All"
                buttonLink={`/user/${userName}/${type}`}
            />
            <GridLayout>
                {data?.data.slice(0, 3).map((favorites: favoritesType, index: number) => (
                    <CardMotion index={index} key={favorites._id}>
                        <FavAndWatchCard
                            user={favorites.userID}
                            itemType={type}
                            itemID={favorites._id}
                            movieID={favorites.movieID}
                            movieTitle={favorites.movieTitle}
                            movieBanner={favorites.movieBanner}
                            movieReleaseDate={favorites.movieReleaseDate}
                            movieOverview={favorites.movieOverview}
                            type={favorites.type}
                            createdAt={favorites.createdAt}
                        />
                    </CardMotion>
                ))}
                {data?.data.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="col-span-full text-center mt-6 text-default-500 text-base font-medium">
                        No {type} found for this user.
                    </motion.div>
                )}
            </GridLayout>
        </div>
    </>;

};

export default FavoritesAndWatchList;