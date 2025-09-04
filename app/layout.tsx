import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/Providers/Providers";
import FooterIsland from "@/components/layout/FooterIsland";
import NavBar from "@/components/layout/NavBar";
import MainFooter from "@/components/layout/Footer";
import { Profile } from "@/types/profile.types";
import { getUserData } from "@/helpers/fetcher";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movies Cafe",
  description: "A website to find your favorite movies",
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile: Profile = await getUserData("/profile", "user-info");
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className="light">
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <Providers>
          <NavBar user={profile} />
          {children}
          <FooterIsland />
          <MainFooter />
        </Providers>
      </body>
    </html>
  );
}
