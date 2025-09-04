'use client'
import { NotFoundUserImage } from "@/constant/statics";
import { Profile } from "@/types/profile.types";
import { Button, Chip, Image } from "@heroui/react";
import { BsCalendar2DateFill } from "react-icons/bs";
import { GrStatusGoodSmall } from "react-icons/gr";
import { MdOutlineLanguage } from "react-icons/md";
import { motion } from "framer-motion";

interface IProps {
    profile: Profile | null;
}

const ProfileHeader = ({ profile }: IProps) => {
    if (!profile) return null;

    const avatarUrl =
        profile.avatar?.url === null ? NotFoundUserImage : profile.avatar.url;

    const birthdayDate = new Date(profile.birthday).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="relative w-full">
            <div
                className="absolute inset-0 bg-cover bg-center filter grayscale brightness-150"
                style={{ backgroundImage: `url(${avatarUrl})` }}
            />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" />

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
                            className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-cover rounded-2xl shadow-xl filter grayscale hover:grayscale-0 transition-all duration-500"
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
                        <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="flex items-center gap-2">
                            <h1 className="text-3xl md:text-5xl font-bold capitalize">
                                {profile.name}
                            </h1>
                        </motion.div>

                        <motion.p
                            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                            className="text-gray-300 text-sm md:text-base"
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
                                    variant="faded"
                                    startContent={<MdOutlineLanguage />}
                                    size="sm"
                                    radius="full"
                                    className="space-x-1 brightness-90"
                                >
                                    {profile.country}
                                </Chip>
                            )}
                            {profile.gender && (
                                <Chip
                                    variant="faded"
                                    startContent={<GrStatusGoodSmall />}
                                    size="sm"
                                    radius="full"
                                    className="space-x-1 brightness-90"
                                >
                                    {profile.gender}
                                </Chip>
                            )}
                            {profile.birthday && (
                                <Chip
                                    variant="faded"
                                    startContent={<BsCalendar2DateFill />}
                                    size="sm"
                                    radius="full"
                                    className="space-x-1 brightness-90"
                                >
                                    {birthdayDate}
                                </Chip>
                            )}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProfileHeader;
