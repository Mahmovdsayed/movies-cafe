"use client";

import { useQuery } from "@tanstack/react-query";
import { NestApi } from "@/helpers/NestAPI";

const fetchIsUser = async (): Promise<boolean> => {
  try {
    const { data } = await NestApi.get("/isUser");
    return data?.success === true;
  } catch (error) {
    return false;
  }
};

export const useIsUser = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["isUser"],
    queryFn: fetchIsUser,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return {
    isUser: data ?? false,
    isLoading,
    isError,
    refetch,
  };
};
