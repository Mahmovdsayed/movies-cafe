'use client'
interface IProps {
    type: string
    data: any
    isActor?: boolean
    time: number
}
import { Button, Card, Chip, Image } from "@heroui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { memo, useRef } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Parallax } from 'swiper/modules';
import { useRouter } from "next/navigation";
import { TMDB_CONFIG } from "@/constant/config";
import { motion } from "framer-motion";
import { formatVoteAverage } from "@/functions/formatVoteAverage";
import { IoIosArrowBack, IoIosArrowForward, IoMdStar } from "react-icons/io";
import { cardNotFoundImage } from "@/constant/statics";


const SwiperCard = memo(({ type, data, time, isActor = false }: IProps) => {
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
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-between items-center  mb-3">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                autoplay={{
                    delay: time,
                    disableOnInteraction: false
                }}
                autoFocus
                loop={true}
                onSwiper={(swiper) => swiperRef.current = swiper}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
            >

                {data?.data?.[isActor ? "cast" : "results"]?.map((tr: any, index: number) =>
                    <SwiperSlide key={index} style={{ width: 'auto' }}>

                        <div onClick={() => handleClick(tr.id, type)}>
                            <Card className="w-full p-0 m-0 md:w-full md:h-[220px] cursor-pointer" shadow="none">
                                <Image
                                    removeWrapper
                                    decoding="async"

                                    draggable="false"
                                    loading="lazy"
                                    src={tr.backdrop_path == null ? cardNotFoundImage : `${TMDB_CONFIG.API_IMAGE_URL}${"w500"}${tr.backdrop_path}`}
                                    className="size-full object-cover object-center z-0 filter grayscale hover:grayscale-0 transition"
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