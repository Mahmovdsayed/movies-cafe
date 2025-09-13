'use client'
import { NotFoundUserImage } from "@/constant/statics";
import { Button, Chip, Image, Link } from "@heroui/react";
import { BsCalendar2DateFill, BsPatchCheckFill, BsQrCode } from "react-icons/bs";
import { GrStatusGoodSmall } from "react-icons/gr";
import { MdOutlineLanguage } from "react-icons/md";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hook";
import { formatDate } from "@/functions/formatDate";
import { notFound, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/helpers/fetcher";
import { FaFacebook, FaInstagram, FaSnapchatGhost, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import LoadingData from "../layout/LoadingData";
import QrCodeButton from "../ui/buttons/QrCodeButton";


const ProfileHeader = () => {
    const appearance = useAppSelector((state) => state.appearance.theme);
    const pathname = usePathname();
    const segments = pathname.split("/");
    const userID = segments.indexOf("user");
    const id = userID !== -1 ? segments[userID + 1] : "";
    const { data: profile, isLoading, isError } = useQuery({
        queryFn: () => getUserInfo(`/users/${id}`),
        queryKey: ["profile", id, 'user-info'],
        enabled: !!id && pathname.startsWith("/user"),
        // placeholderData: null,
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: false,
    })


    if (isLoading) return <LoadingData />
    if (!profile || Object.keys(profile).length === 0) {
        notFound();
    }
    if (isError) return <div>Error loading profile</div>


    const avatarUrl = profile.avatar?.url === null ? NotFoundUserImage : profile.avatar.url;

    return (
        <div className="relative w-full">
            <div
                className={`absolute inset-0 bg-cover bg-center object-cover object-center z-0  ${appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""}`}
                style={{ backgroundImage: `url(${avatarUrl})` }}
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />

            <div className="container mx-auto w-full px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 flex flex-col lg:flex-row lg:items-center items-start justify-start py-12 gap-6 lg:gap-12"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="shrink-0"
                    >
                        <Image
                            src={avatarUrl}
                            alt={profile.name}
                            fetchPriority="high"
                            decoding="async"
                            radius="lg"
                            removeWrapper
                            className={`w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-cover rounded-2xl shadow-xl ${appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""}`}
                            draggable="false"
                        />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    staggerChildren: 0.15,
                                    delayChildren: 0.3,
                                },
                            },
                        }}
                        className="text-start lg:text-left w-full max-w-2xl text-white"
                    >
                        <motion.div
                            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                            className="flex items-center mb-3 gap-2"
                        >
                            {profile.links?.facebook &&
                                <Button className={`
                                    ${appearance === "blackWhite"
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : appearance === "default"
                                            ? "bg-primary text-white"
                                            : appearance === "blossom"
                                                ? "bg-pink-500 text-white"
                                                : ""
                                    }
                                 `}
                                    aria-label="Facebook"
                                    as={Link}
                                    href={profile.links.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    isIconOnly
                                    size="sm"
                                    variant="flat"
                                    radius="full"
                                >
                                    <FaFacebook size={14} />
                                </Button>
                            }
                            {
                                profile.links?.instagram &&
                                <Button className={`
                                    ${appearance === "blackWhite"
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : appearance === "default"
                                            ? "bg-primary text-white"
                                            : appearance === "blossom"
                                                ? "bg-pink-500 text-white"
                                                : ""
                                    }
                                 `}
                                    as={Link}
                                    href={profile.links.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    isIconOnly
                                    aria-label="Instagram"
                                    size="sm"
                                    variant="flat"
                                    radius="full"
                                >
                                    <FaInstagram size={14} />
                                </Button>
                            }
                            {
                                profile.links?.twitter &&

                                <Button className={`
                                    ${appearance === "blackWhite"
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : appearance === "default"
                                            ? "bg-primary text-white"
                                            : appearance === "blossom"
                                                ? "bg-pink-500 text-white"
                                                : ""
                                    }
                                 `}
                                    as={Link}
                                    href={profile.links.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter"
                                    isIconOnly
                                    size="sm"
                                    radius="full"
                                    variant="flat"

                                >
                                    <FaXTwitter size={14} />
                                </Button>
                            }

                            {
                                profile.links?.snapchat &&
                                <Button className={`
                                    ${appearance === "blackWhite"
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : appearance === "default"
                                            ? "bg-primary text-white"
                                            : appearance === "blossom"
                                                ? "bg-pink-500 text-white"
                                                : ""
                                    }
                                 `}
                                    as={Link}
                                    href={profile.links.snapchat}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Snapchat"
                                    isIconOnly
                                    size="sm"
                                    variant="flat"
                                    radius="full"
                                >
                                    <FaSnapchatGhost size={14} />
                                </Button>
                            }
                            {
                                profile.links?.tiktok &&
                                <Button className={`
                                    ${appearance === "blackWhite"
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : appearance === "default"
                                            ? "bg-primary text-white"
                                            : appearance === "blossom"
                                                ? "bg-pink-500 text-white"
                                                : ""
                                    }
                                 `}
                                    as={Link}
                                    href={profile.links.tiktok}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Tiktok"
                                    isIconOnly
                                    size="sm"
                                    variant="flat"
                                    radius="full"
                                >
                                    <FaTiktok size={14} />
                                </Button>
                            }

                            <QrCodeButton />
                        </motion.div>

                        <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="flex items-center gap-2">
                            <h1 className="text-3xl md:text-5xl font-bold capitalize">
                                {profile.name}
                            </h1>
                            <BsPatchCheckFill
                                className={
                                    `text-xl ${appearance === "blossom"
                                        ? "text-pink-300"
                                        : appearance === "default"
                                            ? "text-indigo-300"
                                            : ""
                                    }`
                                } />
                        </motion.div>

                        <motion.p
                            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                            className="text-default-200 dark:text-default-700 font-medium text-sm md:text-base"
                        >
                            @{profile.userName}
                        </motion.p>

                        {profile.about && (
                            <motion.p
                                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                                className="text-xs md:text-sm lg:text-lg mt-4 opacity-90"
                            >
                                {profile.about}
                            </motion.p>
                        )}

                        <motion.div
                            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                            className="flex flex-wrap justify-start gap-x-2 gap-y-3 mt-6 text-sm md:text-base"
                        >
                            {profile.country && (
                                <Chip
                                    variant="flat"
                                    startContent={<MdOutlineLanguage className="ms-1" />}
                                    size="sm"
                                    radius="full"
                                    className={`
                                    ${appearance === "blackWhite"
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : appearance === "default"
                                                ? "bg-primary text-white"
                                                : appearance === "blossom"
                                                    ? "bg-pink-500 text-white"
                                                    : ""

                                        }
                                space-x-1 brightness-90 `}
                                >
                                    {profile.country}
                                </Chip>
                            )}
                            {profile.gender && (
                                <Chip
                                    variant="flat"
                                    startContent={<GrStatusGoodSmall className="ms-1" />}
                                    size="sm"
                                    radius="full"
                                    className={`
                                    ${appearance === "blackWhite"
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : appearance === "default"
                                                ? "bg-primary text-white"
                                                : appearance === "blossom"
                                                    ? "bg-pink-500 text-white"
                                                    : ""

                                        }
                                space-x-1 brightness-90 `}
                                >
                                    {profile.gender}
                                </Chip>
                            )}
                            {profile.birthday && (
                                <Chip
                                    variant="flat"
                                    startContent={<BsCalendar2DateFill className="ms-1" />}
                                    size="sm"
                                    radius="full"
                                    className={`
                                    ${appearance === "blackWhite"
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : appearance === "default"
                                                ? "bg-primary text-white"
                                                : appearance === "blossom"
                                                    ? "bg-pink-500 text-white"
                                                    : ""

                                        }
                                space-x-1 brightness-90 `}
                                >
                                    {formatDate(profile.birthday)}
                                </Chip>
                            )}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div >
    );
};

export default ProfileHeader;
