'use client'

import { motion } from "framer-motion";

interface IProps {
    children: React.ReactNode
    index: number
}
const CardMotion = ({ children, index }: IProps) => {
    return <>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 * index, type: "spring", stiffness: 100 }}
        >
            {children}
        </motion.div>
    </>;
};

export default CardMotion;