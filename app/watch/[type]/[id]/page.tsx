import { Suspense } from "react";
import { notFound } from "next/navigation";
import ContainerLayout from "@/components/layout/ContainerLayout";

import { checkAvailability } from "@/lib/vidapi.service";
import { getMovieDetails } from "@/lib/tmdbAPI";
import { Metadata } from "next";
import WatchPageClient from "./WatchPageClient";

interface IProps {
  params: Promise<{ type: string; id: string }>;
  searchParams: Promise<{ episode?: string; season?: string }>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { type, id } = await params;
  let title = "Watch";
  try {
    const data = await getMovieDetails(type as "movie" | "tv", id);
    title = `Watch ${data?.title || data?.name || ""}`;
  } catch {
    // ignore
  }
  return {
    title,
    description: `Stream ${title} on Movies Cafe`,
    robots: { index: false, follow: false },
  };
}

export default async function WatchPage({ params, searchParams }: IProps) {
  const { type, id } = await params;
  const { episode, season } = await searchParams;

  if (type !== "movie" && type !== "tv") notFound();

  // Check availability server-side (queries the correct ID list by type)
  const available = await checkAvailability(id, type as "movie" | "tv");

  // Fetch content metadata for display
  let contentData: any = null;
  try {
    contentData = await getMovieDetails(type as "movie" | "tv", id);
  } catch {
    // ignore
  }

  const title = contentData?.title || contentData?.name || "Unknown Title";
  const banner = contentData?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${contentData.backdrop_path}`
    : null;
  const poster = contentData?.poster_path
    ? `https://image.tmdb.org/t/p/w500${contentData.poster_path}`
    : null;
  const overview = contentData?.overview || "";
  const releaseDate =
    contentData?.release_date || contentData?.first_air_date || "";
  const voteAverage = contentData?.vote_average || 0;

  return (
    <ContainerLayout>
      <Suspense fallback={<div className="h-64 animate-pulse bg-default-100 rounded-xl" />}>
        <WatchPageClient
          id={id}
          type={type as "movie" | "tv"}
          available={available}
          episodeID={episode}
          seasonNumber={season ? parseInt(season) : undefined}
          title={title}
          banner={banner}
          poster={poster}
          overview={overview}
          releaseDate={releaseDate}
          voteAverage={voteAverage}
        />
      </Suspense>
    </ContainerLayout>
  );
}
