'use client'

import { cardNotFoundImage } from "@/constant/statics";
import { actorDetails } from "@/lib/tmdbAPI";
import { useAppSelector } from "@/redux/hook";
import { Chip, Image } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { BsCalendar2DateFill } from "react-icons/bs";
import { GrStatusGoodSmall } from "react-icons/gr";
import { MdOutlineLanguage } from "react-icons/md";
import ActorLinks from "../ui/Actor/ActorLinks";
import LoadingData from "./LoadingData";

interface IProps {
    id: string
}
const ActorInfo = ({ id }: IProps) => {
    const appearance = useAppSelector((state) => state.appearance.theme);
    const imageSize = useAppSelector((state) => state.imageSize.size);

    const { data, isLoading, isError } = useQuery({
        queryFn: () => actorDetails(id),
        queryKey: [`actor-${id}`, id],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchIntervalInBackground: true,
    })

    if (isLoading) return <LoadingData />
    if (isError) return <h3>Error loading movie details</h3>



    return <>
        <div className="relative w-full">
            <div
                className={`absolute inset-0 bg-cover bg-center object-cover object-center z-0 ${appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""}`}
                style={{ backgroundImage: `url(${data?.profile_path === null ? cardNotFoundImage : `http://image.tmdb.org/t/p/w200${data?.profile_path}`})` }}
            />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" />

            <div className="container mx-auto w-full px-4">
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center items-start justify-start  py-12 gap-6 lg:gap-12">
                    <div className="">
                        <Image
                            src={data?.profile_path === null ? cardNotFoundImage : `http://image.tmdb.org/t/p/${imageSize}${data?.profile_path}`}
                            alt={data?.name}
                            className={`w-40 h-60 md:48 md:h-72 lg:w-64 lg:h-96 object-cover rounded-lg z-10 shadow-xl ${appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""}`}
                            radius="lg"
                        />
                    </div>
                    <div className="text-start  lg:text-left w-full max-w-2xl text-white">
                        <ActorLinks id={id} />
                        {data?.also_known_as &&
                            <div className="flex items-center flex-wrap justify-start gap-2">
                                {data?.also_known_as?.map((name: string, index: number) => (
                                    <Chip key={index} variant="faded" className="space-x-1" size="sm" radius="full">{name}</Chip>
                                ))}
                            </div>
                        }
                        <h1 className="text-3xl md:text-5xl font-bold mt-2">{data?.name}</h1>
                        <p className="text-xs sm:text-sm md:text-base lg:text-lg mt-4 opacity-90 leading-relaxed line-clamp-[12]">{data?.biography}</p>
                        <div className="flex flex-wrap justify-start  lg:justify-start gap-x-2 gap-y-3 mt-8 text-sm md:text-base">
                            {data?.birthday && (
                                <Chip variant="faded" startContent={<BsCalendar2DateFill />} className="space-x-1" size="sm" radius="full">{data?.birthday}</Chip>
                            )}
                            {data?.place_of_birth && (
                                <Chip variant="faded" startContent={<MdOutlineLanguage />} className="space-x-1" size="sm" radius="full">{data?.place_of_birth}</Chip>
                            )}
                            {data?.gender && (
                                <Chip variant="faded" size="sm" startContent={<GrStatusGoodSmall />} className="space-x-1" radius="full">{data?.gender === 0 ? "Not set" : data?.gender === 1 ? "Female" : "Male"}</Chip>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>;
};

export default ActorInfo;