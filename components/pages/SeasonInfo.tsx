'use client'

import { seasonDetails } from "@/lib/tmdbAPI";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { formatVoteAverage } from "@/functions/formatVoteAverage";
import CardMotion from "../motion/CardMotion";
import { Card, CardBody, CardHeader, Image } from "@heroui/react";
import { useAppSelector } from "@/redux/hook";
import { cardNotFoundImage } from "@/constant/statics";
import { TMDB_CONFIG } from "@/constant/config";

interface IProps {
    seasonID: string;
}
const SeasonInfo = ({ seasonID }: IProps) => {
    const imageSize = useAppSelector((state: any) => state.imageSize.size);

    const pathname = usePathname();
    const segments = pathname.split("/");
    const tvIndex = segments.indexOf("tv");
    const id = tvIndex !== -1 ? segments[tvIndex + 1] : null;

    const { data, isLoading, isError } = useQuery({
        queryFn: () => seasonDetails(String(id), seasonID),
        queryKey: [`tv-${id}-season-${seasonID}`, id, seasonID],
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
        refetchInterval: 1000 * 60 * 60,
        refetchIntervalInBackground: true,
    })

    return (
        <div className="my-8 w-full†">
            {data && (
                <>
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                type: "spring",
                                stiffness: 210,
                            }}
                            className="text-medium md:text-2xl text-wrap text-default-800 font-bold capitalize "
                        >
                            {data?.name}
                        </motion.span>

                        {data.overview ? (
                            <motion.p
                                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                                className="text-default-500 text-xs md:text-sm mt-2"
                            >
                                {data?.overview}
                            </motion.p>
                        ) : (
                            <motion.p
                                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                                className="text-default-500 text-xs md:text-sm mt-2"
                            >
                                No official overview available for this season.
                                Here you can explore the air date, rating, and episodes list.
                            </motion.p>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                            className="my-6 space-y-1 text-sm md:text-base text-default-600"
                        >
                            {data?.episodes && (
                                <p><strong>Total Episodes:</strong> {data.episodes?.length || 0}</p>
                            )}
                        </motion.div>

                        <div className="flex max-w-4xl flex-col items-start gap-4 my-4">
                            {data?.episodes && data.episodes.map((episode: any, index: number) => (
                                <CardMotion key={episode.id} index={index}>
                                    <Card shadow="sm" isPressable className="w-full ">

                                        <CardBody className="flex flex-row items-center flex-wrap sm:flex-nowrap p-0">
                                            <Image
                                                loading="lazy"
                                                fetchPriority="high"
                                                decoding="async"
                                                radius="lg"
                                                draggable="false"
                                                removeWrapper
                                                alt={data.name}
                                                className="w-full sm:w-2/5 object-cover rounded-lg filter grayscale hover:grayscale-0 transition"
                                                src={
                                                    episode.still_path == null
                                                        ? cardNotFoundImage
                                                        : `${TMDB_CONFIG.API_IMAGE_URL}${imageSize}${episode.still_path}`
                                                }
                                            />
                                            <div className="py-4 px-4">
                                                <p className="text-xs md:text-sm text-default-500">{episode.air_date}</p>
                                                <h4 className="text-sm md:text-lg font-semibold">{episode.name}</h4>
                                                <p className="text-xs md:text-sm text-default-600 mt-2">{episode.overview}</p>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </CardMotion>
                            ))}
                        </div>
                    </div>
                </>
            )
            }
        </div >
    );
};

export default SeasonInfo;
