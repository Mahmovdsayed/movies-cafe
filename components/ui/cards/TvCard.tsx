'use client'

import { TMDB_CONFIG } from "@/constant/config";
import { cardNotFoundImage } from "@/constant/statics";
import { truncateText } from "@/functions/textUtils";
import { TvShowsTypes } from "@/types/tv.types";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from "@heroui/react";
import { IoMdStar } from "react-icons/io";
import { formatVoteAverage } from "@/functions/formatVoteAverage";
import { getGenres } from "@/functions/getGenres";
import AddTo from "../addTo/AddTo";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { GrLanguage } from "react-icons/gr";
import { useAppSelector } from "@/redux/hook";

interface IProps {
    data: TvShowsTypes
}
const TvCard = ({ data }: IProps) => {
    const appearance = useAppSelector((state) => state.appearance.theme)

    const imageSize = useAppSelector((state: any) => state.imageSize.size);
    const router = useRouter();

    const handleClick = () => {
        router.push(`/tv-shows/tv/${data.id}`);
    }


    const imgSrcBanner = data.backdrop_path == null ? cardNotFoundImage
        : `${TMDB_CONFIG.API_IMAGE_URL}${imageSize}${data.backdrop_path}`;
    const truncatedOverview = truncateText(data.overview, 150);

    return <>
        <Card isPressable onPress={handleClick} className="w-full h-full z-0!" shadow="sm" radius="lg">
            <CardHeader className="p-1">
                <Image
                    loading="lazy"
                    fetchPriority="high"
                    decoding="async"
                    radius="lg"
                    draggable="false"
                    removeWrapper
                    // isBlurred
                    alt={data.name}
                    className={` w-full h-full bg-cover bg-center object-cover object-center z-0 ${appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""}`}
                    src={imgSrcBanner}
                />
            </CardHeader>
            <CardBody>
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">{data.name}</h3>
                    {data.vote_average &&
                        <Chip
                            className={`whitespace-nowrap font-medium space-x-1
                                     ${appearance === "blackWhite"
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : appearance === "default"
                                        ? "bg-primary text-white"
                                        : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`}
                            startContent={<IoMdStar />} size="sm" radius="sm">
                            {formatVoteAverage(data.vote_average)}
                        </Chip>
                    }
                </div>
                <span className="text-sm text-default-500 text-wrap mb-3 mt-1">{getGenres(data.genre_ids)}</span>
                <p className="text-wrap text-tiny md:text-sm text-default-600">{truncatedOverview}</p>
            </CardBody>
            <CardFooter className="flex justify-between items-center gap-2">
                <div className="flex gap-2 items-start">
                    <AddTo
                        favorites={{
                            movieID: String(data.id),
                            movieTitle: data.name,
                            moviePoster: data.poster_path,
                            movieReleaseDate: data.first_air_date,
                            movieBanner: data.backdrop_path,
                            type: "tv",
                            movieOverview: data.overview
                        }}
                        Ai={false} />
                </div>
                <div className="space-x-2">
                    {data.first_air_date &&
                        <Chip startContent={<BsFillCalendarDateFill />} size="sm" className={`whitespace-nowrap font-medium space-x-1
                                     ${appearance === "blackWhite"
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : appearance === "default"
                                    ? "bg-primary text-white"
                                    : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`} radius="sm">
                            {data.first_air_date}
                        </Chip>
                    }
                    {data.original_language &&
                        <Chip startContent={<GrLanguage />} size="sm" className={`whitespace-nowrap font-medium space-x-1
                                     ${appearance === "blackWhite"
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : appearance === "default"
                                    ? "bg-primary text-white"
                                    : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`} radius="sm">
                            {data.original_language}
                        </Chip>
                    }
                </div>
            </CardFooter>
        </Card>
    </>;
};

export default TvCard;