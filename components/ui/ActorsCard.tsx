'use client'
import { TMDB_CONFIG } from "@/constant/config";
import { NotFoundUserImage } from "@/constant/statics";
import { useAppSelector } from "@/redux/hook";
import { Actor } from "@/types/actor.types";
import { Card, CardFooter, CardHeader, Image } from "@heroui/react";
import { useRouter } from "next/navigation";
import AddTo from "./AddTo";

interface IProps {
    data: Actor
}
const ActorsCard = ({ data }: IProps) => {
    const router = useRouter();

    const imageSize = useAppSelector((state) => state.imageSize.size)
    const image = data.profile_path == null ? NotFoundUserImage : ` ${TMDB_CONFIG.API_IMAGE_URL}${imageSize}${data.profile_path}`

    const handleClick = () => {
        router.push(`/actors/actor/${data.id}`);
    }

    return <>
        <Card
            isPressable
            className="w-full h-full z-0!"
            shadow="sm"
            radius="lg"
            onPress={handleClick}
        >
            <CardHeader className="absolute z-10 bottom-0 flex-col items-start bg-black/40 backdrop-blur-md rounded-lg p-2">
                <div className="flex flex-col justify-start text-start items-start">
                    <h3 className="text-tiny text-white/60 uppercase font-bold">
                        {data.name}
                    </h3>
                    <span className="text-tiny text-white/60 font-medium">
                        {data.known_for_department}
                    </span>
                </div>
            </CardHeader>
            <Image
                loading="lazy"
                fetchPriority="high"
                decoding="async"
                radius="lg"
                isZoomed
                draggable="false"
                alt={data.name}
                className="w-full bg-cover bg-center object-cover h-full object-center filter grayscale hover:grayscale-0 transition z-0"
                src={image}
            />
        </Card>
    </>;
};

export default ActorsCard;