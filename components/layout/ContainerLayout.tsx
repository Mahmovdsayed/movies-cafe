'use client'

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";
import BlurWrapper from "../motion/BlurWrapper";

interface ContainerLayoutProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    isDiscover?: boolean
}

const ContainerLayout = ({ children, isDiscover = false, ...rest }: ContainerLayoutProps) => {
    const appearance = useAppSelector((state) => state.appearance.theme)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) return null;

    return (
        <main
            {...rest}
            className={`relative min-h-dvh overflow-x-hidden ${rest.className ?? ""}`}
        >
            {/* {appearance === "blossom" && (
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="
    absolute top-5 left-5
    hidden sm:block sm:w-56 sm:h-56 md:w-72 md:h-72 
    bg-pink-500/50 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px]
  " />

                    <div className="
    absolute bottom-10 right-5
    hidden sm:block sm:w-72 sm:h-72 md:w-96 md:h-96
    bg-pink-500/50 rounded-full blur-[90px] sm:blur-[110px] md:blur-[120px]
  " />

                    <div className="
    absolute top-1/3 left-1/2
    hidden sm:block sm:w-80 sm:h-80 md:w-[500px] md:h-[500px]
    bg-pink-500/50 rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px]
    -translate-x-1/2
  " />
                </div>
            )} */}


            <div className={isDiscover ? "container mx-auto relative z-10" : "container mx-auto relative z-10 px-4 py-6"}>
                {children}
            </div>

            {/* <BlurWrapper /> */}
        </main>
    );
};

export default ContainerLayout;
