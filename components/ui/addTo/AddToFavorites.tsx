"use client";
import { addToFavorites } from "@/app/actions/favorites/addToFavorites.action";
import { AddToast } from "@/functions/AddToast";
import { triggerConfetti } from "@/helpers/ConfettiFireworks";
import { Button, Tooltip } from "@heroui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MdFavorite } from "react-icons/md";

interface IFavorite {
    movieID: string;
    movieTitle: string;
    moviePoster: string;
    movieReleaseDate: string;
    movieBanner: string;
    type: "movie" | "tv";
    movieOverview: string;
}

interface IProps {
    favorite: IFavorite;
    appearance: string
}

const AddToFavorites = ({ favorite, appearance }: IProps) => {
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);

    const handleAddToFavorites = async () => {
        if (!favorite) return;

        try {
            setLoading(true);

            const formData = new FormData();
            Object.entries(favorite).forEach(([key, value]) => {
                formData.append(key, String(value));
            });

            const res = await addToFavorites(formData);
            if (!res?.success) {
                AddToast(res?.message, 5000, "warning");
            } else {
                AddToast(res?.message, 5000, "success");
                triggerConfetti();
                queryClient.invalidateQueries({ queryKey: ["user-favorites"] });
            }
        } catch (error) {
            console.error("Error adding to favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Tooltip
            size="sm"
            placement="top"
            className={`whitespace-nowrap 
                        ${appearance === "blackWhite"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : appearance === "default"
                        ? "bg-primary text-white"
                        : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`}
            radius="lg"
            content={
                <div className="px-1 py-2">
                    <div className="text-small font-bold">Add to favorites</div>
                    <div className="text-tiny">Add this movie to your favorites list.</div>
                </div>
            }
        >

            <Button
                as="div"
                size="sm"
                isIconOnly
                className={`whitespace-nowrap 
                        ${appearance === "blackWhite"
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : appearance === "default"
                            ? "bg-primary text-white"
                            : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`}
                radius="full"
                variant="flat"
                onPress={handleAddToFavorites}
                isLoading={loading}
                isDisabled={loading}
            >
                <MdFavorite />
            </Button>
        </Tooltip>
    );
};

export default AddToFavorites;
