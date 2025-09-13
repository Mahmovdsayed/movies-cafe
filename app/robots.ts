import { MetadataRoute } from "next";
import { baseURL } from "@/constant/statics";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/settings", "/auth", "/api", "/discover"],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
