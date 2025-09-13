'use client'

import { deleteFromFavorites } from "@/app/actions/favorites/deleteFromFavorites.action";
import { deleteFromWatchlist } from "@/app/actions/watchlist/deleteFromWatchlist.action";
import { AddToast } from "@/functions/AddToast";
import useHandleResponse from "@/hooks/useHandleResponse";
import { DeleteDocumentIcon } from "@/icons/DeleteDocumentIcon";
import { Button } from "@heroui/react";
import { useState } from "react";
import { ModalModel } from "../post/PostConfig";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
    itemID: string
    type: 'favorites' | 'watchlist'
}
const FavAndWatchCardButtons = ({ itemID, type }: IProps) => {
    const queryClient = useQueryClient();

    const handleResponse = useHandleResponse()
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true);
            if (type === 'favorites') {
                await handleResponse(deleteFromFavorites(itemID));
                queryClient.invalidateQueries({ queryKey: ["user-favorites"] });
            } else if (type === 'watchlist') {
                await handleResponse(deleteFromWatchlist(itemID));
                queryClient.invalidateQueries({ queryKey: ["user-watchlist"] });
            }
            setLoading(false);
            setOpen(false);
        } catch (error) {
            setLoading(false);
            setOpen(false);
            AddToast("Something went wrong!", 5000, "danger")
        }
    }
    return <>
        <div className=" absolute right-0 mx-2 my-2 top-0 z-40">
            <div className="flex items-center gap-2">
                <Button onPress={() => setOpen(true)} aria-label="Delete" as={"div"} isIconOnly size="md" className="dark:bg-black/20 text-white backdrop-blur-sm backdrop-grayscale-100"><DeleteDocumentIcon /></Button>
            </div>
        </div>
        <ModalModel onPress={handleDelete} loading={loading} isOpen={open} setIsOpen={() => setOpen(false)} title="Delete Item">
            <p>Are you sure you want to delete this {type === "favorites" ? "favorite" : "watchlist"} item</p>
        </ModalModel >
    </>;
};

export default FavAndWatchCardButtons;