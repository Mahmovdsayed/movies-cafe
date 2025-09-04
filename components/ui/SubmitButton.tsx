'use client'
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

    return (
        <Button
            isLoading={isLoading}
            isDisabled={isDisabled}
            startContent={startContent}
            type={"submit"}
            radius="full"
            size="md"
            variant="flat"
            className={`${className}`}
            onPress={onPress}
        >
            {title}
        </Button>
    );
};

export default SubmitButton;