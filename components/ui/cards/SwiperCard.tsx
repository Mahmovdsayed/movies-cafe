'use client'
interface IProps {
    type: string
    data: any
    isActor?: boolean
    time: number
}
import { Card, Chip, Image } from "@heroui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { memo, useRef } from "react";
import { Autoplay } from 'swiper/modules';
import { useRouter } from "next/navigation";
import { TMDB_CONFIG } from "@/constant/config";
import { motion } from "framer-motion";
import { formatVoteAverage } from "@/functions/formatVoteAverage";
import { IoMdStar } from "react-icons/io";
import { cardNotFoundImage } from "@/constant/statics";
import { useAppSelector } from "@/redux/hook"


const SwiperCard = memo(({ type, data, time, isActor = false }: IProps) => {
    const appearance = useAppSelector((state) => state.appearance.theme)
    const router = useRouter();
    const handleClick = (movie_id: any, type: any) => {
        if (type === "tv") {
            router.push(`/tv-shows/tv/${movie_id}`);
            return;
        } else {
            router.push(`/movies/movie/${movie_id}`);
            return
        }
    }

    const swiperRef = useRef<any>(null);
    return <>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-between items-center  mb-3">
            <Swiper
                className="w-full"
                modules={[Autoplay]}
                spaceBetween={10}
                autoplay={{ delay: time, disableOnInteraction: false }}
                loop={(data?.data?.[isActor ? "cast" : "results"]?.length ?? 0) > 4}
                watchOverflow={true}
                breakpoints={{
                    0: {
                        slidesPerView: Math.min(
                            1,
                            (data?.data?.[isActor ? "cast" : "results"]?.length ?? 1)
                        ),
                    },
                    640: {
                        slidesPerView: Math.min(
                            2,
                            (data?.data?.[isActor ? "cast" : "results"]?.length ?? 2)
                        ),
                    },

                    1024: {
                        slidesPerView: Math.min(
                            3,
                            (data?.data?.[isActor ? "cast" : "results"]?.length ?? 3)
                        ),

                    },
                    1280: {
                        slidesPerView: Math.min(
                            4,
                            (data?.data?.[isActor ? "cast" : "results"]?.length ?? 4)
                        ),
                    },
                }}
            >

                {data?.data?.[isActor ? "cast" : "results"]?.map((tr: any, index: number) =>
                    <SwiperSlide key={index}>

                        <div onClick={() => handleClick(tr.id, type)}>
                            <Card className="w-full p-0 m-0 md:w-full md:h-[220px] cursor-pointer" shadow="none">
                                <Image
                                    removeWrapper
                                    decoding="async"

                                    draggable="false"
                                    loading="lazy"
                                    src={tr.backdrop_path == null ? cardNotFoundImage : `${TMDB_CONFIG.API_IMAGE_URL}${"w500"}${tr.backdrop_path}`}
                                    className={` w-full h-full bg-cover bg-center object-cover object-center z-0 ${appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""}`}
                                    alt={type === "tv" ? tr.name : tr.title}
                                />
                            </Card>
                            <div className="flex items-start justify-start flex-col mt-2 px-2">
                                <div className="w-full flex items-center justify-between">
                                    <span onClick={() => handleClick(tr.id, type)} className="text-sm  font-semibold text-wrap text-start hover:underline cursor-pointer">{`${type === "tv" ? tr.name : tr.title}`}</span>
                                    <Chip startContent={<IoMdStar />} className="font-medium text-xs" variant="dot" color="primary" size="sm" radius="sm">
                                        {formatVoteAverage(tr.vote_average)}
                                    </Chip>
                                </div>
                                <span className="text-start text-default-600 text-xs font-light">{type === "tv" ? tr.first_air_date : tr.release_date}</span>
                            </div>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </motion.div >
    </>;
});

export default SwiperCard;