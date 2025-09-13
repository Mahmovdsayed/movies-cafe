'use client'
import { useAppSelector } from "@/redux/hook";
import { Button } from "@heroui/react";

interface ButtonComponentProps {
    title: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    startContent?: React.ReactNode;
    className?: string;
    onPress?: () => void;
}

const SubmitButton: React.FC<ButtonComponentProps> = ({
    title,
    isLoading = false,
    isDisabled = false,
    startContent,
    className = "w-full",
    onPress
}) => {
    const appearance = useAppSelector((state) => state.appearance.theme)
    return (
        <Button
            className={`
                ${appearance === "blackWhite"
                    ? "bg-black/50 backdrop-blur-md text-white dark:bg-white dark:text-black"
                    : appearance === "default"
                        ? "bg-primary/50 backdrop-blur-md text-white"
                        : appearance === "blossom"
                            ? "bg-pink-500/50 backdrop-blur-md text-white"
                            : ""
                }
                ${className}
            `}
            isLoading={isLoading}
            isDisabled={isDisabled}
            startContent={startContent}
            type={"submit"}
            radius="full"
            size="md"
            variant="flat"
            onPress={onPress}
        >
            {title}
        </Button>
    );
};

export default SubmitButton;