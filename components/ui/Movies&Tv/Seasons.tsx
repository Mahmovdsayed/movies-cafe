'use client'
import { Season } from "@/types/seasons.types";
import SwiperHeader from "../SwiperHeader";
import { getMovieDetails } from "@/lib/tmdbAPI";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Parallax } from 'swiper/modules';
import { useRouter } from "next/navigation";
import { TMDB_CONFIG } from "@/constant/config";
import { cardNotFoundImage } from "@/constant/statics";
import { Card, Image } from "@heroui/react";
import { useRef } from "react";
import { useAppSelector } from "@/redux/hook";

interface IProps {
    id: string
}

const Seasons = ({ id }: IProps) => {
    const appearance = useAppSelector((state) => state.appearance.theme)
    const router = useRouter();
    const swiperRef = useRef<any>(null);

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getMovieDetails("tv", id),
        queryKey: [`Info-tv-${id}`, "tv", id],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchIntervalInBackground: true,
    })
    if (isLoading) return <h3>Loading...</h3>
    if (isError) return <h3>Error loading movie details</h3>

    const handleClick = (season_id: any) => {
        router.push(`/tv-shows/tv/${id}/season/${season_id}`);
    }
    return <>
        {data.seasons && data.seasons.length > 0 ? (
            <div className="my-8">
                <SwiperHeader
                    description={`Explore the seasons of this series, including details about each season's episodes and air dates.`}
                    title={`Seasons`}
                    button={false}
                />

                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, Parallax]}
                        spaceBetween={10}
                        onSwiper={(swiper) => swiperRef.current = swiper}

                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false
                        }}
                        autoFocus
                        loop={true}
                        breakpoints={{
                            0: { slidesPerView: 3 },
                            640: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 },
                        }}
                    >
                        {data?.seasons?.map((season: Season) => (
                            <SwiperSlide style={{ width: "auto" }} key={season.id}>
                                <div onClick={() => handleClick(season.season_number)}>
                                    <Card className="w-full p-0 m-0 cursor-pointer" shadow="none">
                                        <Image
                                            removeWrapper
                                            decoding="async"
                                            draggable="false"
                                            loading="lazy"
                                            src={season.poster_path == null ? cardNotFoundImage : `${TMDB_CONFIG.API_IMAGE_URL}${"w500"}${season.poster_path}`}
                                            className={`size-full object-cover object-center z-0 ${appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""}`}
                                            alt={season.name}
                                        />
                                    </Card>
                                    <div className="flex items-start justify-start flex-col mt-2 px-2">
                                        <div className="w-full flex items-center justify-between">
                                            <span onClick={() => handleClick(season.id)} className="text-sm font-semibold text-wrap text-start hover:underline cursor-pointer">
                                                {season.name}
                                            </span>
                                        </div>
                                        <span className="text-start text-default-600 text-xs font-light">{season.air_date}</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </motion.div>
            </div>

        ) : ""}
    </>;
};

export default Seasons;