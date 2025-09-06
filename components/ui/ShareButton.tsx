'use client'

import { baseURL } from "@/constant/statics";
import { AddToast } from "@/functions/AddToast";
import { Button, Tooltip } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuShare } from "react-icons/lu";
interface IProps {
    appearance: string
}
const ShareButton = ({ appearance }: IProps) => {
    const pathname = usePathname();
    const [fullUrl, setFullUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setFullUrl(baseURL + pathname);
        }
    }, [pathname]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    text: "Check this out!",
                    url: fullUrl,
                });
            } catch (err) {
                AddToast("Share cancelled or failed.", 5000, "warning")
            }
        } else {
            AddToast("Sharing not supported on this browser.", 5000, "danger")
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
            content={<div className="px-1 py-2">
                <div className="text-small font-bold">Share</div>
                <div className="text-tiny">Share this movie with your friends via social media.</div>
            </div >
            }
        >
            <Button
                onPress={handleShare}
                size="sm" as="div" isIconOnly className={`whitespace-nowrap 
                        ${appearance === "blackWhite"
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : appearance === "default"
                            ? "bg-primary text-white"
                            : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`} radius="full" variant="flat">
                <LuShare />
            </Button >
        </Tooltip >
    </>;
};

export default ShareButton;