'use client';

import { useAppSelector } from "@/redux/hook";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

const socialLinks = [
    {
        href: "https://www.facebook.com/nest.development/",
        label: "Facebook",
        icon: <FaFacebookF />,
    },
    {
        href: "https://www.instagram.com/nest.dev",
        label: "Instagram",
        icon: <FaInstagram />,
    },
    {
        href: "https://x.com/nest__dev",
        label: "Twitter",
        icon: <FaTwitter />,
    },
    {
        href: "https://www.tiktok.com/@nest.dev",
        label: "Tiktok",
        icon: <FaTiktok />,
    },
];

const MainFooter = () => {
    const appearance = useAppSelector((state) => state.appearance.theme);

    const btnStyle =
        appearance === "blackWhite"
            ? "bg-black text-white dark:bg-white dark:text-black"
            : appearance === "default"
                ? "bg-primary text-white"
                : appearance === "blossom"
                    ? "bg-pink-500 text-white"
                    : "";

    return (

        <footer className="p-6 shadow bg-gray-200 dark:bg-[#181818] dark:text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                <div className="flex space-x-2 opacity-80">
                    {socialLinks.map(({ href, label, icon }) => (
                        <Button
                            key={label}
                            as={Link}
                            href={href}
                            target="_blank"
                            aria-label={label}
                            isIconOnly
                            size="sm"
                            radius="sm"
                            variant="flat"
                            color="primary"
                            className={btnStyle}
                        >
                            {icon}
                        </Button>
                    ))}
                </div>

                {/* Copyright */}
                <div className="opacity-75">
                    <p className="text-sm font-light">
                        © {new Date().getFullYear()}{" "}
                        <span className="font-bold text-inherit cursor-pointer">
                            MOVIES <span className="font-bold">CAFE</span>
                        </span>
                        , All rights reserved.
                    </p>
                </div>

                <div className="opacity-75">
                    <p className="text-sm font-medium">
                        Powered by{" "}
                        <span
                            onClick={() =>
                                (window.location.href = "https://www.instagram.com/nest.dev")
                            }
                            className="font-bold cursor-pointer hover:underline"
                        >
                            NEST
                        </span>
                    </p>
                </div>
            </div>
        </footer>

    );
};

export default MainFooter;
