'use client'
import { TMDB_CONFIG } from "@/constant/config";
import { NotFoundUserImage } from "@/constant/statics";
import { Cast } from "@/types/cast.types";
import { Card, CardBody, CardHeader, Image } from "@heroui/react";
import { useRouter } from "next/navigation";

interface IProps {
    data: Cast
    type?: "movie" | "tv"
}
const CastCard = ({ data, type = "movie" }: IProps) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/actors/actor/${data.id}`)
    }
    return <>
        <Card onPress={handleClick} shadow="none" className="bg-transparent" isPressable >
            <CardHeader className="flex items-center justify-center">
                <Image
                    src={data.profile_path == null ? NotFoundUserImage : ` ${TMDB_CONFIG.API_IMAGE_URL}w200${data.profile_path}`}
                    alt={data.name}
                    radius="full"
                    className=" h-[100px] w-[100px] object-center object-cover filter grayscale hover:grayscale-0 transition"
                />
            </CardHeader>
            <CardBody>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-sm font-semibold text-center cursor-pointer hover:underline">{data.name}</span>
                    <span className="text-xs text-center text-default-500">{type === "movie" ? data.character : type === "tv" ? data.roles[0]?.character : data.roles[0]?.character}</span>
                </div>
            </CardBody>
        </Card>
    </>;
};

export default CastCard;