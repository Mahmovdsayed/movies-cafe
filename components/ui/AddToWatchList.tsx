'use client'

import { addToWatchlistAction } from "@/app/actions/watchlist/addToWatchlist.action";
import { AddToast } from "@/functions/AddToast";
import { triggerConfetti } from "@/helpers/ConfettiFireworks";
import { Button, Tooltip } from "@heroui/react";
import { useState } from "react";
import { MdWatchLater } from "react-icons/md";


interface IWatchList {
    movieID: string;
    movieTitle: string;
    moviePoster: string;
    movieReleaseDate: string;
    movieBanner: string;
    type: "movie" | "tv";
    movieOverview: string;
}

interface IProps {
    watchList: IWatchList;
    appearance: string

}
const AddToWatchList = ({ watchList, appearance }: IProps) => {
    const [loading, setLoading] = useState(false);

    const handleAddToWatchList = async () => {
        if (!watchList) return;

        try {
            setLoading(true);

            const formData = new FormData();
            Object.entries(watchList).forEach(([key, value]) => {
                formData.append(key, String(value));
            });

            const res = await addToWatchlistAction(formData);
            if (!res?.success) {
                AddToast(res?.message, 5000, "warning");
            } else {
                AddToast(res?.message, 5000, "success");
                triggerConfetti();
            }
        } catch (error) {
            console.error("Error adding to watchList:", error);
        } finally {
            setLoading(false);
        }
    };

    return <>
        <Tooltip
            size="sm"
            placement="top"
            radius="lg"
            className={`whitespace-nowrap 
                        ${appearance === "blackWhite"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : appearance === "default"
                        ? "bg-primary text-white"
                        : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`}
            content={
                <div className="px-1 py-2">
                    <div className="text-small font-bold">Watch later</div>
                    <div className="text-tiny">Add this movie to your watch later list.</div>
                </div>
            }
        >
            <Button className={`whitespace-nowrap 
                        ${appearance === "blackWhite"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : appearance === "default"
                        ? "bg-primary text-white"
                        : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`}

                onPress={handleAddToWatchList} isLoading={loading} isDisabled={loading} size="sm" as="div" isIconOnly radius="full" variant="flat">
                <MdWatchLater />
            </Button>
        </Tooltip>
    </>;
};

export default AddToWatchList;