'use client'

import { useAppSelector } from "@/redux/hook";
import { Pagination } from "@heroui/react";

interface IProps {
    total: number;
    page: number;
    onChange: (page: number) => void;
}
const PaginationUi = ({ total, page, onChange }: IProps) => {
    const appearance = useAppSelector((state) => state.appearance.theme)
    return <>
        <div className="overflow-hidden my-6 flex justify-center items-center">
            <Pagination
                showControls
                total={total}
                page={page}
                onChange={onChange}
                variant="faded"
                size="md"
                classNames={{
                    cursor: `
      font-medium whitespace-nowrap space-x-1 
      ${appearance === "blackWhite"
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : appearance === "default"
                                ? "bg-primary text-white"
                                : appearance === "blossom"
                                    ? "bg-pink-600 text-white"
                                    : ""} 
      hover:opacity-90 transition-colors
    `,
                    prev: `
      ${appearance === "blackWhite"
                            ? "bg-black text-white dark:bg-white dark:text-black hover:opacity-80"
                            : appearance === "default"
                                ? "bg-primary text-white hover:bg-primary/80"
                                : appearance === "blossom"
                                    ? "bg-pink-500 text-white hover:bg-pink-400"
                                    : ""}
      transition-colors
    `,
                    next: `
      ${appearance === "blackWhite"
                            ? "bg-black text-white dark:bg-white dark:text-black hover:opacity-80"
                            : appearance === "default"
                                ? "bg-primary text-white hover:bg-primary/80"
                                : appearance === "blossom"
                                    ? "bg-pink-500 text-white hover:bg-pink-400"
                                    : ""}
      transition-colors
    `,
                    item: `
      font-medium whitespace-nowrap space-x-1
      ${appearance === "blackWhite"
                            ? "bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                            : appearance === "default"
                                ? "bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-800 hover:bg-gray-200"
                                : appearance === "blossom"
                                    ? "bg-pink-100 dark:bg-gray-800 dark:text-white text-pink-700 hover:bg-pink-200"
                                    : ""}
      transition-colors
    `,
                }}
                initialPage={1}
            />
        </div>
    </>;
};

export default PaginationUi;