'use client'

import React from "react";
import GradualBlurMemo from "../motion/GradualBlur";

interface ContainerLayoutProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

const ContainerLayout = ({ children, ...rest }: ContainerLayoutProps) => {
    return (
        <main
            {...rest}
            className={`relative min-h-dvh overflow-x-hidden ${rest.className ?? ""}`}
        >
            {/* <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="hidden md:block absolute top-10 left-10 w-80 h-80 bg-gray-500/50 rounded-full blur-[120px]" />
                <div className="hidden md:block absolute bottom-20 right-10 w-96 h-96 bg-gray-500/50 rounded-full blur-[120px]" />
                <div className="hidden md:block absolute top-1/3 left-1/2 w-[500px] h-[500px] bg-gray-500/50 rounded-full blur-[150px] -translate-x-1/2" />
            </div> */}

            <div className="container mx-auto px-4 py-6 relative z-10">
                {children}
            </div>

            {/* <div className="fixed bottom-[-1px] left-1/2 -translate-x-1/2 w-full max-w-screen z-40 pointer-events-none">
                <GradualBlurMemo
                    target="parent"
                    position="bottom"
                    height="5rem"
                    strength={2}
                    divCount={10}
                    curve="bezier"
                    exponential={true}
                    opacity={1}
                />
            </div> */}
        </main>
    );
};

export default ContainerLayout;
