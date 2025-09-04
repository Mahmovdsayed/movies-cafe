'use client';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import React from "react";
import SubmitButton from "./SubmitButton";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter
} from "@heroui/drawer";

interface DashBoardModalProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    description?: string;
    submitButtonText?: string;
    submitButtonLoading?: boolean;
    submitButtonDisabled?: boolean;
    startContent?: React.ReactNode;
    onButtonPress?: () => void;
    isModal?: boolean;
    className?: string;
}

const DrawerModel = ({
    isModal,
    onButtonPress,
    title,
    children,
    isOpen,
    onClose,
    description,
    submitButtonText,
    submitButtonLoading,
    className,
    submitButtonDisabled,
    startContent
}: DashBoardModalProps) => {
    const commonProps = {
        scrollBehavior: "inside" as const,
        isKeyboardDismissDisabled: true,
        className: "ios-no-zoom",
        shadow: "sm" as const,
        size: "sm" as const,
        radius: "lg" as const,
        backdrop: "blur" as const,
        isOpen,
        onOpenChange: onClose
    };

    const renderFooter = () => {
        if (!submitButtonText) return null;

        return (
            <ModalFooter>
                <SubmitButton
                    title={submitButtonText}
                    isDisabled={submitButtonDisabled}
                    isLoading={submitButtonLoading}
                    startContent={startContent}
                    className={`${className} w-full font-medium`}
                    onPress={onButtonPress}
                />
            </ModalFooter>
        );
    };

    const renderHeader = () => (
        <>
            <div>{title}</div>
            {description && (
                <div className="text-xs md:text-sm text-default-500 font-medium">
                    {description}
                </div>
            )}
        </>
    );

    if (isModal) {
        return (
            <Modal  {...commonProps} size="md" placement="center">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        {renderHeader()}
                    </ModalHeader>
                    <ModalBody className="">
                        {children}
                    </ModalBody>
                    {renderFooter()}
                </ModalContent>
            </Modal>
        );
    }

    return (
        <Drawer {...commonProps} placement="right">
            <DrawerContent>
                <DrawerHeader className="flex flex-col gap-1">
                    {renderHeader()}
                </DrawerHeader>
                <DrawerBody >
                    {children}
                </DrawerBody>
                {renderFooter()}
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerModel;