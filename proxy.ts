import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./helpers/verifyToken";
import { baseURL } from "./constant/statics";

export async function proxy(req: any) {
  const token = (await cookies()).get("userToken")?.value;
  const { pathname } = req.nextUrl;

  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", baseURL);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Max-Age", "86400");

  const restrictedMatch = pathname.match(/^\/user\/([^/]+)\/(edit|aiContent)$/);

  if (restrictedMatch) {
    const id = restrictedMatch[1];

    if (!token) {
      console.warn("🔴 No token found, redirecting from restricted page.");
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    const decodedToken = await verifyToken(token);
    const userName = decodedToken?.userName;

    if (!decodedToken || !userName) {
      console.error("🔴 Invalid or expired token.");
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    if (id !== userName) {
      console.warn(
        `🔴 User ${userName} tried to access restricted page of ${id}`
      );
      const url = req.nextUrl.clone();
      url.pathname = `/user/${id}`;
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/discover") && !token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (pathname === "/auth/signin" || pathname === "/auth/signup") {
    if (token) {
      return NextResponse.redirect(new URL("/movies", req.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/auth/signin",
    "/auth/signup",
    "/discover/:path*",
    "/user/:path*",
    "/api/:path*",
  ],
};
