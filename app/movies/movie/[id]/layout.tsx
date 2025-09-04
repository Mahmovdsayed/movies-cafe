'use client'

import MovieInfo from "@/components/pages/MovieInfo";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const movieIndex = segments.indexOf("movie");
    const id = movieIndex !== -1 ? segments[movieIndex + 1] : null;

    return (
        <>
            {id && (
                <MovieInfo
                    type="movie"
                    id={String(id)}
                />
            )}
            {children}
        </>
    );
};

export default Layout;
