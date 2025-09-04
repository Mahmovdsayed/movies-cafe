'use client'

import MovieInfo from "@/components/pages/MovieInfo";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const tvIndex = segments.indexOf("tv");
    const id = tvIndex !== -1 ? segments[tvIndex + 1] : null;

    return (
        <>
            {id && (
                <MovieInfo
                    type="tv"
                    id={String(id)}
                />
            )}
            {children}
        </>
    );
};

export default Layout;
