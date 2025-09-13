'use client'
import ContainerLayout from "@/components/layout/ContainerLayout";
import SectionsChips from "@/components/layout/SectionsChips";
import ProfileHeader from "@/components/sections/ProfileHeader";
import { useIsUser } from "@/hooks/isUser";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const { userName } = useIsUser();
    const pathname = usePathname();
    const segments = pathname.split("/");
    const userID = segments.indexOf("user");
    const id = userID !== -1 ? segments[userID + 1] : "";
    const router = useRouter();

    useEffect(() => {
        if (pathname.endsWith("edit") && id !== userName) {
            router.replace(`/user/${id}/edit`);
        } else if (pathname.endsWith("aiContent") && id !== userName) {
            router.replace(`/user/${id}`);
        }
    }, [pathname, id, userName, router]);

    const chipsProfile = [
        { title: `Profile`, url: `/user/${id}` },
        { title: "Favorites", url: `/user/${id}/favorites` },
        { title: "Watchlist", url: `/user/${id}/watchlist` },
        { title: "Reposts", url: `/user/${id}/reposts` },
        ...(id === userName ? [{ title: "Edit", url: `/user/${id}/edit` }] : []),
    ];

    return (
        <>
            <ProfileHeader />
            <ContainerLayout>
                <div className="my-4">
                    <SectionsChips data={chipsProfile} />
                    {children}
                </div>
            </ContainerLayout>
        </>
    );
}
