'use client'

import { TMDB_CONFIG } from "@/constant/config";
import { cardNotFoundImage } from "@/constant/statics";
import { truncateText } from "@/functions/textUtils";
import { TvShowsTypes } from "@/types/tv.types";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from "@heroui/react";
import { IoMdStar } from "react-icons/io";
import { formatVoteAverage } from "@/functions/formatVoteAverage";
import { getGenres } from "@/functions/getGenres";
import AddTo from "./AddTo";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { GrLanguage } from "react-icons/gr";

interface IProps {
    data: TvShowsTypes
}
const TvCard = ({ data }: IProps) => {
    const imageSize = useSelector((state: any) => state.imageSize.size);
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
                    className="w-full bg-cover bg-center object-cover h-full object-center filter grayscale hover:grayscale-0 transition"
                    src={imgSrcBanner}
                />
            </CardHeader>
            <CardBody>
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">{data.name}</h3>
                    <Chip startContent={<IoMdStar />} className="font-medium " color="default" size="sm" radius="sm">
                        {formatVoteAverage(data.vote_average)}
                    </Chip>
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
                    {data.first_air_date === null ? "" :
                        <Chip startContent={<BsFillCalendarDateFill />} size="sm" color="default" radius="sm">
                            {data.first_air_date}
                        </Chip>
                    }
                    {data.original_language === null ? "" :
                        <Chip startContent={<GrLanguage />} size="sm" color="default" radius="sm">
                            {data.original_language}
                        </Chip>
                    }
                </div>
            </CardFooter>
        </Card>
    </>;
};

export default TvCard;