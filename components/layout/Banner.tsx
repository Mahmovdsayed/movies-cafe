'use client'

import { motion } from "framer-motion";

interface IProps {
    title: string,
    description: string
    isCentered?: boolean
}
const Banner = ({ title, description, isCentered = false }: IProps) => {



    return <>
        {
            <div className={`${isCentered ? "text-center" : "text-start"} overflow-hidden container mx-auto`}>
                <motion.h1
                    initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.8, ease: "easeOut", type: "spring", stiffness: 210
                    }}
                    className="leading-snug tracking-wide text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-2">
                    {title}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    className={`${isCentered ? "m-auto text-center" : "text-start"} text-default-500 leading-relaxed font-normal text-xs md:text-sm lg:text-base md:w-10/12 xl:w-9/12`}>
                    {description}
                </motion.p>
            </div>
        }

    </>;
};

export default Banner;