'use client';

import ActorInfo from "@/components/layout/ActorInfo";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {

    const pathname = usePathname();
    const segments = pathname.split("/");
    const actorIndex = segments.indexOf("actor");
    const id = actorIndex !== -1 ? segments[actorIndex + 1] : null;

    return (
        <>
            {id && (
                <ActorInfo id={id} />
            )}
            {children}
        </>
    );
};

export default Layout;
