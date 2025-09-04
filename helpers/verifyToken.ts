"use server";

import jwt from "jsonwebtoken";
import { jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";

const verifyToken = async (
  token: string | undefined
): Promise<JWTPayload | null> => {
  if (!token) {
    console.error("No token provided");
    return null;
  }

  try {
    const secretKey = process.env.LOGIN_SIG;
    if (!secretKey) {
      console.error("Missing LOGIN_SIG environment variable");
      return null;
    }

    const secret = new TextEncoder().encode(secretKey);
    const { payload } = await jwtVerify(token, secret);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      console.error("Token has expired");
      return null;
    }

    if (!payload.id) {
      console.error("Invalid token: Missing user ID");
      return null;
    }

    return payload;
  } catch (err) {
    console.error("Invalid token:");
    return null;
  }
};

const DecodedJWT = async () => {
  const token = (await cookies()).get("userToken")?.value;
  const decoded = jwt.decode(token as any);
  return decoded;
};

export { verifyToken, DecodedJWT };