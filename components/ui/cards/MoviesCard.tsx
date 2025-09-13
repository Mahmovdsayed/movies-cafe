'use client'
import { TMDB_CONFIG } from "@/constant/config";
import { formatVoteAverage } from "@/functions/formatVoteAverage";
import { truncateText } from "@/functions/textUtils";
import { MovieType } from "@/types/movie.type";
import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from "@heroui/react";
import { useRouter } from "next/navigation";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { GrLanguage } from "react-icons/gr";
import { IoMdStar } from "react-icons/io";
import { getGenres } from "@/functions/getGenres"
import { cardNotFoundImage } from "@/constant/statics";
import AddTo from "../addTo/AddTo";
import { useAppSelector } from "@/redux/hook";

interface IProps {
    data: MovieType
}
const MoviesCard = ({ data }: IProps) => {
    const appearance = useAppSelector((state) => state.appearance.theme)
    const imageSize = useAppSelector((state: any) => state.imageSize.size);
    const router = useRouter();

    const handleClick = () => {
        router.push(`/movies/movie/${data.id}`);
    }


    const imgSrcBanner = data.backdrop_path == null ? cardNotFoundImage : `${TMDB_CONFIG.API_IMAGE_URL}${imageSize}${data.backdrop_path}`;
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
                    alt={data.title}
                    className={` w-full h-full bg-cover bg-center object-cover object-center z-0 ${appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""}`}
                    src={imgSrcBanner}
                />
            </CardHeader>
            <CardBody>
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">{data.title}</h3>
                    {data.vote_average &&
                        <Chip startContent={<IoMdStar />}
                            className={`whitespace-nowrap font-medium space-x-1
                                     ${appearance === "blackWhite"
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : appearance === "default"
                                        ? "bg-primary text-white"
                                        : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`}
                            size="sm" radius="sm">
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
                        favorites={
                            {
                                movieID: String(data.id),
                                movieTitle: data.title,
                                moviePoster: data.poster_path,
                                movieReleaseDate: data.release_date,
                                movieBanner: data.backdrop_path,
                                type: "movie",
                                movieOverview: data.overview,
                            }
                        }
                        Ai={false} />
                </div>
                <div className="space-x-2">
                    {data.release_date &&
                        <Chip startContent={<BsFillCalendarDateFill />} size="sm"
                            className={`whitespace-nowrap font-medium space-x-1
                                     ${appearance === "blackWhite"
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : appearance === "default"
                                        ? "bg-primary text-white"
                                        : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`}
                            // color={appearance === "blackWhite" ? "default" : "primary"}
                            radius="sm">
                            {data.release_date}
                        </Chip>
                    }
                    {data.original_language &&
                        <Chip startContent={<GrLanguage />} size="sm"
                            className={`whitespace-nowrap font-medium space-x-1
                                     ${appearance === "blackWhite"
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : appearance === "default"
                                        ? "bg-primary text-white"
                                        : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`}
                            radius="sm">
                            {data.original_language}
                        </Chip>
                    }
                </div>
            </CardFooter>
        </Card >
    </>;
};

export default MoviesCard;