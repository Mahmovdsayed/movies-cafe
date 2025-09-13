'use client'

import { TMDB_CONFIG } from "@/constant/config";
import { cardNotFoundImage } from "@/constant/statics";
import { formatDate } from "@/functions/formatDate";
import { truncateText } from "@/functions/textUtils";
import { useIsUser } from "@/hooks/isUser";
import { useAppSelector } from "@/redux/hook";
import { Repost } from "@/types/repost.types";
import { Card, CardBody, CardFooter, CardHeader, Chip, Image, User } from "@heroui/react";
import { useRouter } from "next/navigation";
import { BsFillCalendarDateFill, BsPatchCheckFill } from "react-icons/bs";
// import { FaShare } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import PostConfig from "./PostConfig";
import LikePost from "./LikePost";

interface IProps {
    post: Repost
}
const RepostCard = ({ post }: IProps) => {
    const { isUser, userID } = useIsUser()
    const appearance = useAppSelector((state) => state.appearance.theme)
    const imageSize = useAppSelector((state: any) => state.imageSize.size);
    const router = useRouter();
    const imgSrcBanner = post.movieBanner == "null" ? cardNotFoundImage : `${TMDB_CONFIG.API_IMAGE_URL}${imageSize}${post.movieBanner}`;
    const truncatedOverview = truncateText(post.movieOverview, 150);
    const isArabic = /[\u0600-\u06FF]/.test(post.content);
    const formattedContent = post.content.replace(/(?:\r\n|\n)/g, "<br />");

    const handleClick = () => {
        if (post.movieType === "tv") {
            router.push(`/tv-shows/tv/${post.movieID}`);
            return;
        } else {
            router.push(`/movies/movie/${post.movieID}`);
        }
    }

    return <>
        <div className="p-2">
            <div className="flex justify-between mb-3 items-center">
                <User
                    avatarProps={{
                        src: `${post.userID.avatar.url}`,
                        className: `bg-cover bg-center object-cover object-center z-0 ${appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""}`
                    }}
                    description={"@" + post.userID.userName}
                    name={
                        <div className="flex font-semibold items-center gap-1">
                            <span onClick={() => router.push(`/user/${post.userID.userName}`)} className=" hover:underline">
                                {post.userID.name}
                            </span>
                            <BsPatchCheckFill className="text-blue-500" /> ·
                            <span className="text-xs font-semibold text-default-500">{formatDate(post.createdAt, "time-ago")}</span>
                        </div>
                    }
                    isFocusable={false}
                />
                {
                    isUser && userID === post.userID._id && (
                        <PostConfig content={post.content} id={post._id} />
                    )
                }
            </div>
            <p
                className={`font-semibold  text-base my-3 px-1 leading-relaxed  whitespace-pre-line 
                ${isArabic ? "text-end" : "text-start"}`}
                dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
            <Card
                isBlurred
                isPressable
                onPress={handleClick}
                className="border border-divider"
                shadow="sm"
                radius="lg"
            >
                <CardHeader className="p-1">
                    <Image
                        loading="lazy"
                        fetchPriority="high"
                        decoding="async"
                        radius="lg"
                        draggable="false"
                        removeWrapper
                        alt={post.movieTitle}
                        className={` w-full h-full bg-cover bg-center object-cover object-center z-0 ${appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""}`}
                        src={imgSrcBanner}
                    />
                </CardHeader>
                <CardBody>
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-semibold">{post.movieTitle}</h3>
                        {post.movieReleaseDate &&
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
                            >{post.movieReleaseDate}</Chip>
                        }
                    </div>
                    <p className="text-wrap text-tiny md:text-sm mt-3 text-default-600">{truncatedOverview}</p>

                </CardBody>
                <CardFooter>
                    <div className="flex gap-2 items-center justify-between">
                        <Chip startContent={<FaRepeat className="ms-1" />} className="space-x-1" size="sm" variant="flat"><strong>{post.userID.name}</strong> Reposted</Chip>
                        {/* <Chip startContent={<RiTimeFill className="ms-1" />} className="space-x-1" size="sm" variant="flat">{formatDate(post.createdAt, "time-ago")}</Chip> */}
                    </div>


                </CardFooter>
            </Card>
            <div className="flex items-center justify-between w-full mt-4 gap-2">
                <LikePost
                    userID={userID} postID={post._id} postLikes={post.likes}
                />
                {/* <Button variant="flat" radius="full" size="sm">
                    <FaShare />
                </Button> */}
            </div>
        </div>
    </>;
};

export default RepostCard;