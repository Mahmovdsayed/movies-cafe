'use client';

import { colors } from "@/types/colors.types";
import { Alert } from "@heroui/react";



interface IProps {
    title?: string | null;
    color?: colors;
}

const NestErrors = ({ title, color = "default" }: IProps) => {
    if (!title) return null;

    return (
        <Alert radius="md" className="mb-1" color={"default"} title={title} />
    );
};

export default NestErrors;