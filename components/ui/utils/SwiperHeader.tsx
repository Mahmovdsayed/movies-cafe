'use client'
import { Button, Link } from "@heroui/react";
import { motion } from "framer-motion";


interface IProps {
    title: string
    button: boolean,
    buttonText?: string
    buttonLink?: string
    description?: string
}
const SwiperHeader = ({ title, button, buttonText, buttonLink, description }: IProps) => {
    return <>
        <div className="flex justify-between items-center mb-3 px-2 overflow-hidden">
            <div>
                <motion.span
                    initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 210,
                    }}
                    className="text-medium md:text-2xl text-wrap text-default-800 font-bold capitalize "
                >
                    {title}
                </motion.span>
                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                        className="text-default-500 text-xs md:text-sm"
                    >
                        {description}
                    </motion.p>
                )}
            </div>

            {button && (
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                >
                    <Button
                        as={Link}
                        href={buttonLink}
                        showAnchorIcon
                        variant="light"
                        color="default"
                        size="sm"
                        radius="sm"
                    >
                        {buttonText}
                    </Button>
                </motion.div>
            )}
        </div>
    </>;
};

export default SwiperHeader;