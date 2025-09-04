import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./helpers/verifyToken";

export async function middleware(req: any) {
  const token = (await cookies()).get("userToken")?.value;
  const { pathname } = req.nextUrl;

  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Max-Age", "86400");

  if (!token) {
    console.warn("🔴 No token found in cookies.");
    return pathname.startsWith("/profile") || pathname.startsWith("/discover")
      ? NextResponse.redirect(new URL("/auth/signin", req.url))
      : response;
  }

  const decodedToken = await verifyToken(token);

  if (!decodedToken) {
    console.error("🔴 Invalid or expired token.");
    // (await cookies()).delete("userToken");
    return pathname.startsWith("/profile") || pathname.startsWith("/discover")
      ? NextResponse.redirect(new URL("/auth/signin", req.url))
      : response;
  }

  if (pathname === "/auth/signin" || pathname === "/auth/signup") {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/auth/signin",
    "/auth/signup",
    "/discover/:path*",
  ],
};
