'use client'

import { useAppSelector } from "@/redux/hook";
import { Chips } from "@/types/chips.types";
import { Chip, Link } from "@heroui/react";
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
                <Chip
                    startContent={item.icon && <item.icon className="size-3" />}
                    as={Link}
                    size="sm"
                    href={item.url}
                    key={index}
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
            ))}
        </div>
    );
};

export default SectionsChips;
