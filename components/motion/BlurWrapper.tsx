"use client";
import { useEffect, useState } from "react";
import GradualBlurMemo from "./GradualBlur";

export default function BlurWrapper() {
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase();

        const isMac = /macintosh|mac os x/.test(ua);
        const isWindows = /windows nt/.test(ua);
        const isIOS = /iphone|ipad|ipod/.test(ua);

        if ((isMac && !isIOS) || isWindows) {
            setIsAllowed(true);
        }
    }, []);

    if (!isAllowed) return null;

    return (
        <div className="fixed bottom-[-1px] left-1/2 -translate-x-1/2 w-full max-w-screen z-40 pointer-events-none">
            <GradualBlurMemo
                target="parent"
                position="bottom"
                height="5rem"
                strength={2}
                divCount={30}
                curve="bezier"
                exponential={true}
                opacity={1}
            />
        </div>
    );
}
