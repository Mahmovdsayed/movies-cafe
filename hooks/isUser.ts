"use client";

import { useQuery } from "@tanstack/react-query";
import { NestApi } from "@/helpers/NestAPI";

interface IsUserResponse {
  success: boolean;
  id?: string;
  username?: string;
}

const fetchIsUser = async (): Promise<IsUserResponse> => {
  try {
    const { data } = await NestApi.get<IsUserResponse>("/isUser");
    return data;
  } catch (error) {
    return { success: false };
  }
};

export const useIsUser = () => {
  const { data, isLoading, isError, refetch } = useQuery<IsUserResponse>({
    queryKey: ["isUser"],
    queryFn: fetchIsUser,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return {
    isUser: data?.success ?? false,
    isLoading,
    isError,
    userID: data?.id ?? null,
    userName: data?.username ?? null,
    refetch,
  };
};
