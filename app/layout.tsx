import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "../Providers/Providers";
import Nav from "@/Components/layout/Navbar";
import Footer from "@/Components/layout/Footer";
import Banner from "@/Components/layout/Banner";
import { Head, Html } from "next/document";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react";

const inter = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], });
export const viewport: Viewport = {
  themeColor: "#0000FF",
  colorScheme: "dark"
}
export const metadata: Metadata = {
  metadataBase: new URL('https://moviescafe.vercel.app'),
  title: "Movies Cafe | Explore the World of Movies & TV Shows",
  manifest: "/manifest.json",
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  keywords: ['movies cafe', 'Movies Cafe', 'movies-cafe', 'Depolna', 'depolna'],
  icons: {
    icon: "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg",
    apple:
      "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg",
  },
  creator: "Mahmoud Sayed",
  applicationName: "Movies Cafe",

  description:
    "Welcome to our cinematic hub! Explore the world of movies and TV shows in a new light with our website powered by TMDb API. Dive into a vast database featuring details about films, actors, ratings, and more. Browse, save your favorite movies, and stay updated with the latest cinematic news. Immerse yourself in the seventh art effortlessly and enjoy a unique cinematic experience through our site!",
  openGraph: {
    images: [
      "https://i.ibb.co/QPVXJxS/Slide-16-9-1.png",
    ],
    title: "Movies Cafe | Explore the World of Movies & TV Shows",
    description:
      "Welcome to our cinematic hub! Explore the world of movies and TV shows in a new light with our website powered by TMDb API. Dive into a vast database featuring details about films, actors, ratings, and more. Browse, save your favorite movies, and stay updated with the latest cinematic news. Immerse yourself in the seventh art effortlessly and enjoy a unique cinematic experience through our site!",
    countryName: "Egypt",
  },
  twitter: {
    card: "summary_large_image",
    title: "Movies Cafe | Explore the World of Movies & TV Shows",
    description:
      "Welcome to our cinematic hub! Explore the world of movies and TV shows in a new light with our website powered by TMDb API. Dive into a vast database featuring details about films, actors, ratings, and more. Browse, save your favorite movies, and stay updated with the latest cinematic news. Immerse yourself in the seventh art effortlessly and enjoy a unique cinematic experience through our site!",
    images: [
      "https://i.ibb.co/QPVXJxS/Slide-16-9-1.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className}`}>
        <Providers>
          <Banner />
          <Nav />
          {children}
          <SpeedInsights />
          <Analytics />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
