'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Select, SelectItem } from "@heroui/react";
import React from "react";
import { setFilters } from "@/redux/slices/movieFiltersSlice";
import MoviesFilters from "../sections/MoviesFilters";
import { setSort } from "@/redux/slices/moviesSortSlice";

const SortBy = ({ type = "movie" }: { type?: "movie" | "tv" }) => {
    const itemsMovies = [
        { key: "popularity.desc", label: "Most Popular First" },
        { key: "popularity.asc", label: "Least Popular First" },
        { key: "vote_average.desc", label: "Highest Rated First" },
        { key: "vote_average.asc", label: "Lowest Rated First" },
        { key: "primary_release_date.desc", label: "Newest Releases First" },
        { key: "primary_release_date.asc", label: "Oldest Releases First" },
        { key: "original_title.asc", label: "Title (A–Z)" },
        { key: "original_title.desc", label: "Title (Z–A)" },
    ];

    const itemsTv = [
        { key: "popularity.desc", label: "Most Popular First" },
        { key: "popularity.asc", label: "Least Popular First" },
        { key: "vote_average.desc", label: "Highest Rated First" },
        { key: "vote_average.asc", label: "Lowest Rated First" },
        { key: "first_air_date.desc", label: "Newest Releases First" },
        { key: "first_air_date.asc", label: "Oldest Releases First" },
        { key: "original_name.asc", label: "Title (A–Z)" },
        { key: "original_name.desc", label: "Title (Z–A)" },
    ];

    const dispatch = useAppDispatch();

    const movieSortBy = useAppSelector((state) => state.movieFilters.sort_by);
    const tvSortBy = useAppSelector((state) => state.sortBy.sort);

    const sort = type === "movie" ? movieSortBy : tvSortBy;

    const items = type === "movie" ? itemsMovies : itemsTv;

    const handleSortChange = (keys: any) => {
        const selectedSortItem = Array.from(keys)[0] as string;

        if (type === "movie") {
            dispatch(setFilters({ sort_by: selectedSortItem }));
        } else {
            dispatch(setSort(selectedSortItem));
        }
    };

    return (
        <div className="flex items-center justify-between w-full gap-4 my-4">
            <Select
                items={items}
                label="Sort By"
                size="sm"
                radius="sm"
                className="max-w-sm"
                variant="underlined"
                selectedKeys={[String(sort)]}
                onSelectionChange={handleSortChange}
                placeholder="Select an option"
                description="Sort by the selected option"
            >
                {(item) => (
                    <SelectItem key={item.key} color="default">
                        {item.label}
                    </SelectItem>
                )}
            </Select>
            <MoviesFilters />
        </div>
    );
};

export default SortBy;
