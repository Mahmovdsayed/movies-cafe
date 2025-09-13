'use client'

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter
} from "@heroui/drawer";
import { Avatar, Button, Divider, Input, Select, SelectItem, useDisclosure } from "@heroui/react";
import React from "react";
import { FiFilter } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setFilters, resetFilters } from "@/redux/slices/movieFiltersSlice";
import { Countries } from "@/static/countries";
import { FaFilter } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";

const MoviesFilters = () => {
    const appearance = useAppSelector((state) => state.appearance.theme)

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [primaryReleaseYear, setPrimaryReleaseYear] = React.useState("");
    const [voteAverageGte, setVoteAverageGte] = React.useState(0);
    const [voteAverageLte, setVoteAverageLte] = React.useState(10);
    const [withOriginCountry, setWithOriginCountry] = React.useState("");

    const dispatch = useAppDispatch();
    const filters = useAppSelector((state: any) => state.movieFilters);

    React.useEffect(() => {

        setPrimaryReleaseYear(filters.primary_release_year || "");
        setVoteAverageGte(filters.vote_average_gte || 0);
        setVoteAverageLte(filters.vote_average_lte || 10);
        setWithOriginCountry(filters.with_origin_country || "");
    }, [filters]);

    const handleApplyFilters = () => {
        dispatch(setFilters({
            primary_release_year: primaryReleaseYear,
            vote_average_gte: voteAverageGte,
            vote_average_lte: voteAverageLte,
            with_origin_country: withOriginCountry,
        }));
        onOpenChange();
    };

    const handleClearFilters = () => {
        dispatch(resetFilters());
        onOpenChange();
    };

    return (
        <>
            <Button
                radius="full"
                color="default"
                size="md"
                isIconOnly
                className={`whitespace-nowrap 
                        ${appearance === "blackWhite"
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : appearance === "default"
                            ? "bg-primary text-white"
                            : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`}
                onPress={onOpen}
            >
                <FiFilter />
            </Button>

            <Drawer className="bg-white dark:bg-black/20 backdrop-blur-2xl" backdrop={"blur"} size={"sm"} isOpen={isOpen} onOpenChange={onOpenChange}>
                <DrawerContent>
                    {() => (
                        <>
                            <DrawerHeader>
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-lg font-semibold">Movie Filters</h2>
                                    <p className="text-xs md:text-sm text-default-500">
                                        Narrow down movies by year, country, and ratings to match your preferences.
                                    </p>
                                </div>
                            </DrawerHeader>
                            <Divider />
                            <DrawerBody>
                                <div className="flex flex-col w-full my-4 gap-4">
                                    <Input
                                        label="Primary Release Year"
                                        description="Movies first released in this year"
                                        value={primaryReleaseYear}
                                        onValueChange={setPrimaryReleaseYear}
                                        size="sm"
                                        placeholder="e.g., 2025"
                                        variant="bordered"
                                        fullWidth
                                        color="default"
                                    />
                                    <Select
                                        size="sm"
                                        variant="bordered"
                                        color="default"
                                        items={Countries}
                                        label="Select a Country"
                                        startContent={<Avatar
                                            className="w-3 h-3"
                                            src={`https://flagcdn.com/${withOriginCountry.toLowerCase()}.svg`}
                                        />
                                        }
                                        placeholder="Select a country"
                                        fullWidth
                                        selectedKeys={[withOriginCountry]}
                                        onSelectionChange={(e: any) => setWithOriginCountry(e.currentKey)}
                                    >
                                        {[...Countries]
                                            .sort((a, b) => a.english_name.localeCompare(b.english_name))
                                            .map((item) => (
                                                <SelectItem
                                                    startContent={
                                                        <Avatar
                                                            className="w-6 h-6"
                                                            src={`https://flagcdn.com/${item.iso_3166_1.toLowerCase()}.svg`}
                                                        />
                                                    }
                                                    id={item.iso_3166_1}
                                                    key={item.iso_3166_1}
                                                >
                                                    {item.english_name}
                                                </SelectItem>
                                            ))}
                                    </Select>
                                    <Input
                                        label="Vote Average Min"
                                        description="Minimum average rating (0–10)"
                                        type="number"
                                        min={0}
                                        fullWidth
                                        max={10}
                                        value={String(voteAverageGte)}
                                        onValueChange={(v) => setVoteAverageGte(Number(v))}
                                        size="sm"
                                        variant="bordered"
                                        color="default"
                                    />
                                    <Input
                                        label="Vote Average Max"
                                        description="Maximum average rating (0–10)"
                                        min={0}
                                        fullWidth
                                        max={10}
                                        type="number"
                                        value={String(voteAverageLte)}
                                        onValueChange={(v) => setVoteAverageLte(Number(v))}
                                        size="sm"
                                        variant="bordered"
                                        color="default"
                                    />
                                </div>
                            </DrawerBody>
                            <Divider />
                            <DrawerFooter className="flex-col gap-2">
                                <Button startContent={<FaFilter />} color="default" className="text-white bg-black" onPress={handleApplyFilters}>Apply Filters</Button>
                                <Button startContent={<RiResetLeftFill />} className="bg-black/20 backdrop-blur-md" variant="flat" onPress={handleClearFilters}>Clear Filters</Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default MoviesFilters;
