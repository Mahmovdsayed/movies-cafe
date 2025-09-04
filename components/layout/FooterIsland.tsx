"use client";
import { Tab, Tabs } from "@heroui/react";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers } from "react-icons/fa";
import { IoSearchSharp, IoSettings, IoTvSharp } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { motion } from "framer-motion";
import { CiUser } from "react-icons/ci";
import { useIsUser } from "@/hooks/isUser";

const FooterIsland = () => {
    const { isUser } = useIsUser()
    const pathname = usePathname();

    const getActiveKey = () => {
        if (pathname.startsWith("/movies")) return "/movies";
        if (pathname.startsWith("/tv-shows")) return "/tv-shows";
        if (pathname.startsWith("/search")) return "/search";
        if (pathname.startsWith("/actors")) return "/actors";
        if (pathname.startsWith("/profile")) return "/profile";
        if (pathname.startsWith("/settings")) return "/settings";
        if (pathname.startsWith("/discover")) return "/discover";
        return pathname;
    };

    return (
        <motion.div className="fixed bottom-[-1px] left-1/2 -translate-x-1/2 z-40">
            <motion.div
                layout
                className="
          px-1 py-1 rounded-b-none rounded-t-3xl
          backdrop-blur-xl shadow-2xl border
          border-black/10 dark:border-white/10
          bg-white/70 dark:bg-black/50
          transition-colors duration-500
          mb-0
        "
            >
                <Tabs
                    selectedKey={getActiveKey()}
                    radius="full"
                    color="default"
                    variant="underlined"
                    size="md"
                    aria-label="Dynamic Island Tabs"
                    classNames={{
                        tabList: "gap-1",
                    }}
                >
                    <Tab
                        key="/movies"
                        href="/movies"
                        title={
                            <motion.div layout className="flex items-center gap-1">
                                <MdLocalMovies />
                                <span className="hidden md:inline">Movies</span>
                            </motion.div>
                        }
                    />
                    <Tab
                        key="/tv-shows"
                        href="/tv-shows"
                        title={
                            <motion.div layout className="flex items-center gap-1">
                                <IoTvSharp />
                                <span className="hidden md:inline">TV Shows</span>
                            </motion.div>
                        }
                    />
                    <Tab
                        key="/actors"
                        href="/actors"
                        title={
                            <motion.div layout className="flex items-center gap-1">
                                <FaUsers />
                                <span className="hidden md:inline">Actors</span>
                            </motion.div>
                        }
                    />

                    {isUser &&

                        <Tab
                            key="/discover"
                            href="/discover"
                            title={
                                <motion.div layout className="flex items-center gap-1">
                                    <FaHome />
                                    <span className="hidden md:inline">Discover</span>
                                </motion.div>
                            }
                        />

                    }

                    <Tab
                        key="/search"
                        href="/search/movies"
                        title={
                            <motion.div layout className="flex items-center gap-1">
                                <IoSearchSharp />
                                <span className="hidden md:inline">Search</span>
                            </motion.div>
                        }
                    />
                    {isUser &&

                        <Tab
                            key="/profile"
                            href="/profile"
                            title={
                                <motion.div layout className="flex items-center gap-1">
                                    <CiUser />
                                    <span className="hidden md:inline">Profile</span>
                                </motion.div>
                            }
                        />

                    }


                    <Tab
                        key="/settings"
                        href="/settings"
                        title={
                            <motion.div layout className="flex items-center gap-1">
                                <IoSettings />
                                <span className="hidden md:inline">Settings</span>
                            </motion.div>
                        }
                    />
                </Tabs>
            </motion.div>
        </motion.div>
    );
};

export default FooterIsland;
