'use client'
import { TMDB_CONFIG } from "@/constant/config";
import { cardNotFoundImage } from "@/constant/statics";
import { formatDate } from "@/functions/formatDate";
import { truncateText } from "@/functions/textUtils";
import { useAppSelector } from "@/redux/hook";
import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from "@heroui/react";
import { useRouter } from "next/navigation";
import { BsFillCalendarDateFill } from "react-icons/bs";
import FavAndWatchCardButtons from "./FavAndWatchCardButtons";
import { useIsUser } from "@/hooks/isUser";

interface IProps {
    itemType: 'favorites' | 'watchlist';
    movieID: string;
    movieTitle: string
    movieBanner: string
    movieReleaseDate: string;
    movieOverview: string
    itemID: string
    createdAt: string
    type: "movie" | "tv"
    user: string
}
const FavAndWatchCard = ({ itemID, itemType, movieID, movieTitle, movieBanner, movieReleaseDate, movieOverview, createdAt, type, user }: IProps) => {
    const { isUser, userID } = useIsUser()
    const appearance = useAppSelector((state) => state.appearance.theme)
    const imageSize = useAppSelector((state: any) => state.imageSize.size);
    const router = useRouter();
    const handleClick = (type: string, id: string) => {
        if (type === "tv") {
            router.push(`/tv-shows/tv/${id}`);
            return;
        } else {
            router.push(`/movies/movie/${id}`);
        }
    }

    return <>
        <Card
            isPressable
            onPress={() => handleClick(type, movieID)}
            shadow="sm"
            radius="lg"
            className="size-full z-0"
        >
            <CardHeader className="p-0 relative">
                {isUser && userID === user && (
                    <FavAndWatchCardButtons type={itemType} itemID={itemID} />
                )
                }
                <Image
                    loading="lazy"
                    fetchPriority="high"
                    decoding="async"
                    radius="none"
                    draggable="false"
                    removeWrapper
                    alt={movieTitle}
                    className={`w-full h-full bg-cover bg-center object-cover object-center z-0 ${appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""}`}
                    src={movieBanner === "null" ? cardNotFoundImage : `${TMDB_CONFIG.API_IMAGE_URL}${imageSize}${movieBanner}`}
                />
            </CardHeader>
            <CardBody>
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold text-wrap">{movieTitle}</h3>
                    {movieReleaseDate &&
                        <Chip
                            startContent={<BsFillCalendarDateFill />}
                            size="sm"
                            className={`whitespace-nowrap font-medium space-x-1
                                     ${appearance === "blackWhite"
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : appearance === "default"
                                        ? "bg-primary text-white"
                                        : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`}
                            radius="sm"
                        >{movieReleaseDate}</Chip>
                    }
                </div>
                <p className="text-wrap text-tiny md:text-sm mt-3 text-default-600">{truncateText(movieOverview, 100)}</p>

            </CardBody>
            <CardFooter className="justify-end">
                <Chip
                    size="sm"
                    variant="flat"
                    radius="sm"
                >Added <strong>{formatDate(createdAt, "time-ago")}</strong></Chip>
            </CardFooter>
        </Card>
    </>;
};

export default FavAndWatchCard;