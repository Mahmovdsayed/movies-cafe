'use client';
import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
            // syncTouch: true,
        });

        lenisRef.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        const updateLenis = () => {
            lenis.raf(performance.now());
        };

        gsap.ticker.add(updateLenis);
        gsap.ticker.fps(-1);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(updateLenis);
        };
    }, []);


    return (
        <div data-lenis-container>
            {children}
        </div>
    );
}