"use server";

import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";
import { NestApi } from "./NestAPI";

const userToken = async (): Promise<string | null> => {
  return (await cookies()).get("userToken")?.value || null;
};

const fetchUserData = async (token: string, url: string) => {
  try {
    const { data } = await NestApi.get(url, {
      headers: {
        Cookie: `userToken=${token}`,
        "x-api-key": process.env.API_KEY,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUserData = async (url: string, tag: string) => {
  const token = await userToken();
  if (!token) return null;

  return unstable_cache(() => fetchUserData(token, url), [tag, token], {
    tags: [tag],
    revalidate: 60,
  })();
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
