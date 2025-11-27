"use server";

import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";
import { NestApi } from "./NestAPI";

const userToken = async (): Promise<string | null> => {
  return (await cookies()).get("userToken")?.value || null;
};

const fetchUserData = async (token: string, url: string) => {
  const { data } = await NestApi.get(url, {
    headers: {
      Cookie: `userToken=${token}`,
      "x-api-key": process.env.API_KEY,
    },
  });
  return data.data;
};

const getUserData = async (url: string, tag: string) => {
  const token = await userToken();
  if (!token) return null;

  try {
    const cachedFetch = unstable_cache(
      async () => {
        const data = await fetchUserData(token, url);
        return data;
      },
      [tag, token],
      {
        tags: [tag],
        revalidate: 60,
      }
    );
    return await cachedFetch();
  } catch (error) {
    console.error(`Error fetching data for ${url}:`, error);
    return null;
  }
};

const generateAiResponse = async (url: string, body: any) => {
  const token = await userToken();
  if (!token) return null;
  try {
    const { data } = await NestApi.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
        "x-api-key": process.env.API_KEY,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};

const getUserInfo = async (url: string) => {
  try {
    const { data } = await NestApi.get(url, {
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    });
    return data.data;
  } catch (error) {
    return null;
  }
};

export { getUserData, generateAiResponse, getUserInfo };
