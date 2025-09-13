'use client'

import { useAppSelector } from "@/redux/hook";
import { Chips } from "@/types/chips.types";
import { Chip, Link } from "@heroui/react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface IProps {
    data: Chips[]
}

const SectionsChips = ({ data }: IProps) => {
    const pathName = usePathname();
    const appearance = useAppSelector((state) => state.appearance.theme)

    return (
        <div className="flex gap-2 items-center overflow-x-auto scrollbar-hide md:scrollbar-default mb-3">
            {data.map((item, index) => (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    key={index}>
                    <Chip
                        startContent={item.icon && <item.icon className="size-3" />}
                        as={Link}
                        size="sm"
                        href={item.url}

                        showAnchorIcon
                        className={`whitespace-nowrap space-x-1
                        ${pathName === item.url && appearance === "blackWhite"
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : appearance === "default" && pathName === item.url
                                    ? "bg-primary text-white"
                                    : appearance === "blossom" && pathName === item.url ? "bg-pink-500 text-white" : ""}`}
                        radius="full"
                    >
                        {item.title}
                    </Chip>
                </motion.div>
            ))}
        </div>
    );
};

export default SectionsChips;
