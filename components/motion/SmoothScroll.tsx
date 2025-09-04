"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface IProps {
    children: React.ReactNode;
}

const SmoothScroll = ({ children }: IProps) => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        ScrollSmoother.get()?.kill();

        const smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1, // desktop smooth
            effects: true,
            normalizeScroll: true,
            ignoreMobileResize: true,
            smoothTouch: 0.8, // smoother on touch devices
        });

        return () => {
            smoother.kill();
        };
    }, []);

    return (
        <div
            id="smooth-wrapper"
            className="relative w-full min-h-screen overflow-hidden"
        >
            <div id="smooth-content" className="w-full min-h-screen">
                {children}
            </div>
        </div>
    );
};

export default SmoothScroll;
