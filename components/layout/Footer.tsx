'use client'

import { Button } from "@heroui/react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, } from "react-icons/fa";

const MainFooter = () => {
    return <>
        <div className="p-6 shadow bg-gray-200 dark:text-white dark:bg-[#181818] backdrop-blur-lg">
            <div className="flex  flex-col md:flex-row justify-center md:justify-between items-center">
                <div className="space-x-2 mb-2 md:mb-0 opacity-75">
                    <Button
                        href={`https://www.facebook.com/nest.development/`}
                        size="sm"
                        radius="sm"
                        isIconOnly
                        variant="flat"
                        color="primary"
                        target="_blank"            >
                        <FaFacebookF />
                    </Button>
                    <Button
                        href={`https://www.instagram.com/nest.dev`}
                        size="sm"
                        radius="sm"
                        isIconOnly
                        as={Link}
                        variant="flat"
                        color="primary"
                        target="_blank"            >
                        <FaInstagram />
                    </Button>
                    <Button
                        href={`https://x.com/nest__dev`}
                        size="sm"
                        radius="sm"
                        isIconOnly
                        as={Link}
                        variant="flat"
                        color="primary"
                        target="_blank"
                    >
                        <FaTwitter />
                    </Button>
                    <Button
                        href={`https://www.tiktok.com/@nest.dev`}
                        size="sm"
                        radius="sm"
                        isIconOnly
                        variant="flat"
                        color="primary"
                        as={Link}

                        target="_blank"
                    >
                        <FaTiktok />
                    </Button>
                </div>
                <div className="mt-2 md:mt-0">
                    <h3 className="text-sm font-light md:text  opacity-75">
                        © 2024{" "}
                        <span

                            className="font-bold cursor-pointer"
                        >
                            <span

                                className="font-bold text-inherit cursor-pointer"
                            >
                                MOVIES<span className="text-bold ">CAFE</span>
                            </span>
                        </span>
                        , All rights reserved.
                    </h3>
                </div>
                <div className="mt-2 md:mt-0 opacity-75">
                    <h3 className="text-sm font-medium md:text">Powered by{" "} <span onClick={() => (window.location.href = "https://www.instagram.com/nest.dev")} className="font-bold cursor-pointer">NEST</span></h3>
                </div>
            </div>
        </div>
    </>;
};

export default MainFooter;