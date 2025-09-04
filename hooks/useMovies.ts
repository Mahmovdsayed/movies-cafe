"use client";
import { useQuery } from "@tanstack/react-query";
import { discoverMovies } from "@/lib/tmdbAPI";
import { useAppSelector } from "@/redux/hook";

export const useMovies = ({
  page,
  type = "movie",
}: {
  page: number;
  type?: "movie" | "tv";
}) => {
  const filters = useAppSelector((state) => state.movieFilters);
  const movieSort = useAppSelector((state) => state.movieFilters.sort_by);
  const tvSort = useAppSelector((state) => state.sortBy.sort);

  const sort = type === "movie" ? movieSort : tvSort;

  const parsedFilters = {
    ...filters,
    sort_by: sort,
    primary_release_year: filters.primary_release_year
      ? Number(filters.primary_release_year)
      : undefined,
  };

  return useQuery({
    queryKey: [`all-${type}`, parsedFilters, page, type],
    queryFn: () => discoverMovies(parsedFilters, page, type),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 60,
    refetchIntervalInBackground: true,
  });
};
