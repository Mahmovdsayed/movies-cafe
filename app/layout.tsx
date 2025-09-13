import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/Providers/Providers";
import FooterIsland from "@/components/layout/FooterIsland";
import NavBar from "@/components/layout/NavBar";
import MainFooter from "@/components/layout/Footer";
import { Profile } from "@/types/profile.types";
import { getUserData } from "@/helpers/fetcher";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const metadataBase = new URL('https://moviescafe.vercel.app/');

export const metadata: Metadata = {
  metadataBase,
  title: "Movies Cafe | AI-Powered Movies & TV Hub",
  description: "Discover Movies Cafe, your ultimate hub for movies and TV shows. Explore detailed information about films and series, interact with AI in English or Arabic, and enjoy social features like reposting, commenting, liking, and sharing. Create your account to save favorites, add to watch later, and personalize your experience with custom themes. Stay connected with seamless search, profile customization, and effortless sharing with friends.",
  keywords: 'movies cafe, movies app, tv shows app, movie reviews, film information, tv series info, AI movie assistant, ask AI about movies, social movie app, repost movies, movie discussions, like and comment movies, favorite movies, watch later list, share movies, movie search, profile picture upload, light dark themes, pink theme, customizable themes, English Arabic AI responses',
  authors: [{ name: "Mahmoud Sayed" }],
  creator: "Mahmoud Sayed",
  publisher: "Mahmoud Sayed",
  applicationName: "Movies Cafe",
  referrer: "origin-when-cross-origin",
  verification: {
    google: "ulOMjNVtclcy6UefW0I5tTarzephutZ_D_j2ied0dTw",
  },

  alternates: {
    canonical: "https://moviescafe.vercel.app/",
  },

  openGraph: {
    title: "Movies Cafe | AI-Powered Movies & TV Hub",
    description: "Discover Movies Cafe, your ultimate hub for movies and TV shows. Explore detailed information about films and series, interact with AI in English or Arabic, and enjoy social features like reposting, commenting, liking, and sharing. Create your account to save favorites, add to watch later, and personalize your experience with custom themes. Stay connected with seamless search, profile customization, and effortless sharing with friends.",
    url: "https://moviescafe.vercel.app/",
    siteName: "Movies Cafe",
    images: [
      {
        url: "https://res.cloudinary.com/dtpsyi5am/image/upload/v1757732968/moviescafebanner_aewklg.png",
        width: 1200,
        height: 630,
        alt: "Movies Cafe Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Movies Cafe | AI-Powered Movies & TV Hub",
    description: "Discover Movies Cafe, your ultimate hub for movies and TV shows. Explore detailed information about films and series, interact with AI in English or Arabic, and enjoy social features like reposting, commenting, liking, and sharing. Create your account to save favorites, add to watch later, and personalize your experience with custom themes. Stay connected with seamless search, profile customization, and effortless sharing with friends.",
    creator: "@MahmoudSayed",
    images: ["https://res.cloudinary.com/dtpsyi5am/image/upload/v1757732968/moviescafebanner_aewklg.png"],
  },
  // icons: {
  //   shortcut: "/icon512_maskable.png",
  //   apple: "/icon512_maskable.png",
  // },
  // manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
    <html lang="en" dir="ltr" suppressHydrationWarning className="light scrollbar-thin scrollbar-dark">
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <Providers>
          <SmoothScroll>
            <NavBar user={profile} />
            {children}
            <Analytics />
            <FooterIsland />
            <MainFooter />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
