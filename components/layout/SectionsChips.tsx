'use client'

import { Chips } from "@/types/chips.types";
import { Chip, Link } from "@heroui/react";
import { usePathname } from "next/navigation";

interface IProps {
    data: Chips[]
}

const SectionsChips = ({ data }: IProps) => {
    const pathName = usePathname();

    return (
        <div className="flex gap-2 items-center overflow-x-auto scrollbar-hide md:scrollbar-default mb-3">
            {data.map((item, index) => (
                <Chip
                    startContent={item.icon && <item.icon className=" size-3" />}
                    as={Link}
                    size="sm"
                    href={item.url}
                    key={index}
                    showAnchorIcon
                    className={pathName === item.url ? "bg-black text-white dark:bg-white dark:text-black whitespace-nowrap space-x-1" : " whitespace-nowrap space-x-1"}
                    radius="full"
                >
                    {item.title}
                </Chip>
            ))}
        </div>
    );
};

export default SectionsChips;
