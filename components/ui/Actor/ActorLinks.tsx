'use client'

import { actorExternalIds } from "@/lib/tmdbAPI";
import { Button, Link } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

interface IProps {
    id: string
}
const ActorLinks = ({ id }: IProps) => {

    const { data, isLoading, isError } = useQuery({
        queryFn: () => actorExternalIds(id),
        queryKey: [`actorExternalIds-${id}`, id],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchIntervalInBackground: true,
    })

    if (isLoading || isError) return null;

    return <>
        <div className="flex items-center justify-start gap-2 mb-3">
            {data?.facebook_id && (
                <Button
                    href={`https://www.facebook.com/${data.facebook_id}`}
                    target="_blank"
                    as={Link}
                    rel="noopener noreferrer"
                    isIconOnly
                    size="sm"
                    className="text-white"
                    variant="flat"
                >
                    <FaFacebook />
                </Button>
            )}
            {data?.twitter_id && (
                <Button
                    href={`https://twitter.com/${data.twitter_id}`}
                    target="_blank"
                    as={Link}
                    rel="noopener noreferrer"
                    isIconOnly
                    size="sm"
                    className="text-white"
                    variant="flat"
                >
                    <FaTwitter />
                </Button>
            )}
            {data?.instagram_id && (
                <Button
                    href={`https://www.instagram.com/${data.instagram_id}`}
                    target="_blank"
                    as={Link}
                    rel="noopener noreferrer"
                    isIconOnly
                    size="sm"
                    className="text-white"
                    variant="flat"
                >
                    <FaInstagram />
                </Button>
            )}
            {data?.tiktok_id && (
                <Button
                    href={`https://www.tiktok.com/@${data.tiktok_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    isIconOnly
                    as={Link}
                    size="sm"
                    className="text-white"
                    variant="flat"
                >
                    <FaTiktok />
                </Button>
            )}
        </div>
    </>;
};

export default ActorLinks;