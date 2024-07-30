"use client";
interface Iprops { }

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaLink } from "react-icons/fa6";
import ShareOnSocial from "react-share-on-social";
import ReactPlayer from "react-player";
import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { TbRating18Plus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

import Box from "@mui/material/Box";
import {
    Chip,
    Modal,
    ModalContent,
    ScrollShadow,
    Image,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Avatar,
    Breadcrumbs,
    BreadcrumbItem,
    Link,
    Card,
    CardBody,
    Skeleton,
    CardFooter,
    CardHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { UserIcon } from "@/icons/UserIcon";
import { changeDateFormat } from "@/functions/changeDateFormat";
import { Metadata } from "next";
import { useParams } from "next/navigation";
import LoadingScreen from "@/Components/layout/LoadingScreen";
import FavButton from "@/Components/utils/FavButton";

const PopularTV = ({ }: Iprops) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        });
    }, []);
    const router = useRouter();

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWRlNmIzNDM5MDI2ZjdlOGRlMzEzMzBkYmRmM2VlOSIsInN1YiI6IjY1M2RmY2I0MTA5Y2QwMDBlYWUzY2JiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VcxBDxU_aw-KTBH7nzMcQUb7y95PtOm6AdhklQyTwcE`,
        },
    };
    const { slug } = useParams();
    const [mox, setmox] = useState<any>([]);
    const [watch, setWatch] = useState<any>([]);
    const [actors, setActors] = useState<any>([]);
    const [test, setTEST] = useState<any>([]);
    const [reviews, setreviews] = useState<any>([]);
    const [image, setImage] = useState<any>([]);
    const [REC, setREC] = useState<any>([]);
    const [links, setLinks] = useState<any>([]);

    const Recommendations = `https://api.themoviedb.org/3/trending/tv/day?language=en-US`;
    function handleCardClick(id: any) {
        toast.loading("Please Wait", {
            duration: 1500,
            position: "top-center",
        });
        router.push(`${id}`);
    }

    const getStaticProps = async () => {
        setLoading(true);

        const RecData = await fetch(Recommendations, options);
        const recdata = await RecData.json();

        setREC(recdata.results);

        setLoading(false);
    };
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    };
    useEffect(() => {
        getStaticProps();
    }, []);

    return (
        <>
            {loading == true ? (
                <div className="hidden">
                </div>
            ) : (
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ duration: 2 * 0.3 }}
                    variants={{
                        visible: { opacity: 1 },

                        hidden: { opacity: 0 },
                    }}
                >
                    <div className="container  mx-auto px-4">

                        <div className="container mx-auto">
                            <div className="flex overflow-x-scroll scrollbar-hide space-x-4 my-6">
                                {REC.map((reco: any) => (
                                    <div key={reco.id}>
                                        <Card
                                            isPressable
                                            onClick={() => handleCardClick(`/tv/${reco.id}`)}
                                            shadow="sm"
                                            className="w-[250px] relative"
                                        >


                                            <Image
                                                alt={reco.original_name}
                                                draggable={false}

                                                className="z-0 w-full h-[400px] object-cover"
                                                src={`${reco.poster_path == null
                                                    ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                                    : `https://image.tmdb.org/t/p/original${reco.poster_path}`
                                                    }`}
                                            />
                                            <CardFooter className="absolute  bottom-0 bg-gray-200 dark:bg-[#181818]  flex-col items-start space-y-3">
                                                <div className="text-start">
                                                    <p className="text-tiny">{reco.original_name}</p>
                                                    <p className="text-tiny dark:text-white/60">
                                                        {reco.first_air_date}
                                                    </p>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default PopularTV;
