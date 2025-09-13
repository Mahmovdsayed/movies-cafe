"use client"

import { formatDate } from "@/functions/formatDate";
import { useIsUser } from "@/hooks/isUser";
import { useAppSelector } from "@/redux/hook";
import { Repost } from "@/types/repost.types";
import { User } from "@heroui/react";
import { BsPatchCheckFill } from "react-icons/bs";
// import { FaRegCommentDots, FaShare } from "react-icons/fa";
import PostConfig from "./PostConfig";
import LikePost from "./LikePost";
import { useRouter } from "next/navigation";

interface IProps {
    post: Repost
}

const PostCard = ({ post }: IProps) => {
    const { isUser, userID } = useIsUser()
    const appearance = useAppSelector((state) => state.appearance.theme);
    const router = useRouter()
    const isArabic = /[\u0600-\u06FF]/.test(post.content);

    const formattedContent = post.content.replace(/(?:\r\n|\n)/g, "<br />");

    return (
        <div className="p-2">
            <div className="flex justify-between mb-3 items-center">
                <User
                    avatarProps={{
                        src: `${post.userID.avatar.url}`,
                        className: `bg-cover bg-center object-cover object-center z-0 ${appearance === "blackWhite"
                            ? "filter grayscale hover:grayscale-0 transition"
                            : ""}`
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
            <div className="flex items-center justify-between w-full mt-4 gap-2">
                <LikePost
                    userID={userID} postID={post._id} postLikes={post.likes}
                />
                {/* <Button as={Link} href={`/discover/${post._id}`} variant="bordered" fullWidth radius="full" size="sm">
                    <FaRegCommentDots />
                </Button>
                <Button variant="flat" radius="full" size="sm">
                    <FaShare />
                </Button> */}
            </div>
        </div>
    );
};

export default PostCard;
