"use client";

import { useQuery } from "@tanstack/react-query";

interface UsePaginatedQueryProps<T> {
  queryFn: (page: number) => Promise<T>;
  queryKey: string;
  page: number;
  staleTime?: number;
  refetchInterval?: number;
  enabled?: boolean;
}

export function usePaginatedQuery<T>({
  queryFn,
  queryKey,
  page,
  staleTime = 1000 * 60 * 60,
  refetchInterval = 1000 * 60 * 60,
  enabled = true,
}: UsePaginatedQueryProps<T>) {
  return useQuery({
    queryFn: () => queryFn(page),
    queryKey: [queryKey, page],
    staleTime,
    refetchOnWindowFocus: false,
    refetchInterval,
    refetchIntervalInBackground: true,
    enabled,
  });
}
