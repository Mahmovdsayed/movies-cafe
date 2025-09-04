"use client";

import dynamic from "next/dynamic";

const SortBy = dynamic(() => import("@/components/layout/SortBy"), { ssr: false });

export default function SortByWrapper({ type = "movie" }: { type?: "movie" | "tv" }) {
    return <SortBy type={type} />;
}
