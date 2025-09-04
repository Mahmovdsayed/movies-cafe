"use client";

import Banner from "@/components/layout/Banner";
import ContainerLayout from "@/components/layout/ContainerLayout";
import { Input, Link, Select, SelectItem } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(searchParams.get("q") || "");
    const url = pathname.split("/")[2];

    useEffect(() => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (query) {
            current.set("q", query);
        } else {
            current.delete("q");
        }

        const search = current.toString();
        const newPath = search ? `${pathname}?${search}` : pathname;

        router.replace(newPath);
    }, [query, pathname, router]);

    return (
        <ContainerLayout className="flex items-start mt-4 justify-center ">
            <Banner
                isCentered
                title="Search Movies & TV Shows"
                description="Search for movies, TV shows, and more. Find your favorite content easily. With our powerful search engine, you can quickly locate any movie or TV show you're looking for, whether it's a classic film or the latest series. Discover new titles, explore genres, and dive into a world of entertainment tailored to your preferences."
            />
            <div className="flex flex-col md:flex-row items-center gap-4 my-8 md:justify-center">
                <Input
                    aria-label="Search movies and TV shows"
                    isClearable
                    onClear={() => setQuery("")}
                    className="max-w-full md:max-w-xl"
                    placeholder="Search..."
                    startContent={<FaSearch />}
                    description="Search for movies, TV shows, and more. Find your favorite content easily."
                    classNames={{
                        description: "text-start md:text-center",
                        inputWrapper: "py-6",
                    }}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <Select
                    aria-label="Search type"
                    placeholder="Select a search type"
                    selectedKeys={url ? [url] : []}
                    className="max-w-full md:max-w-xs"
                    description="Choose the type of content you want to search for."
                    classNames={{
                        description: "text-start md:text-center",
                        trigger: "py-6",
                    }}
                >
                    <SelectItem as={Link} href="/search/movies" key={"movies"}>
                        Movies
                    </SelectItem>
                    <SelectItem as={Link} href="/search/tv-shows" key={"tv-shows"}>
                        TV Shows
                    </SelectItem>
                    <SelectItem as={Link} href="/search/people" key={"people"}>
                        People
                    </SelectItem>
                    <SelectItem as={Link} href="/search/keywords" key={"keywords"}>
                        Keywords
                    </SelectItem>
                    <SelectItem as={Link} href="/search/companies" key={"companies"}>
                        Companies
                    </SelectItem>
                </Select>
            </div>
            {children}
        </ContainerLayout>
    );
};

export default Layout;
