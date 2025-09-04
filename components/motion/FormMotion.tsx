'use client'

import { motion } from "framer-motion";

interface IProps {
    children: React.ReactNode
    delay: number
    isFullWidth?: boolean
}

const FormMotion = ({ children, delay, isFullWidth = false }: IProps) => {

    const inputVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    };

    return <>
        <motion.div
            className={`w-full ${isFullWidth ? "md:w-auto" : ""}`}
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay }}
        >
            {children}
        </motion.div>
    </>;
};

export default FormMotion;