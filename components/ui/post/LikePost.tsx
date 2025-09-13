'use client'

import { likePostAction } from "@/app/actions/post/likePost.action";
import { AddToast } from "@/functions/AddToast";
import useHandleResponse from "@/hooks/useHandleResponse";
import { Button } from "@heroui/react";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { formatLikesAndComments } from "@/functions/formatLikesAndComments";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
    userID: any;
    postID: string;
    postLikes: string[];
}

const LikePost = ({ userID, postID, postLikes }: IProps) => {
    const queryClient = useQueryClient();
    
    const [loading, setLoading] = useState(false);
    const [likes, setLikes] = useState(postLikes);
    const handleResponse = useHandleResponse();

    const isLiked = likes.includes(userID);


    const handleLike = async () => {
        try {
            setLoading(true);
            await handleResponse(likePostAction(userID, postID));
             queryClient.invalidateQueries({ queryKey: ["user-reposts"] });
            setLikes((prev) =>
                isLiked ? prev.filter((id) => id !== userID) : [...prev, userID]
            );

            setLoading(false);
        } catch (error) {
            setLoading(false);
            AddToast("Something went wrong!", 5000, "danger");
        }
    };

    return (
        <Button
            radius="full"
            size="sm"
            variant="flat"
          
            onPress={handleLike}
            isDisabled={loading}
        >
            <motion.div
                key={isLiked ? "liked" : "unliked"}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
            >
                {isLiked ? (
                    <>
                        <FaHeart className="text-red-500" />
                        {likes.length > 0 && (
                            <span className="text-red-500 text-sm">
                                {formatLikesAndComments(likes.length)}
                            </span>
                        )}
                    </>
                ) : (
                    <>
                        <FaRegHeart className="text-gray-600" />
                        {likes.length > 0 && (
                            <span className="text-gray-600 text-sm">
                                {formatLikesAndComments(likes.length)}
                            </span>
                        )}
                    </>
                )}
            </motion.div>
        </Button>
    );
};

export default LikePost;
