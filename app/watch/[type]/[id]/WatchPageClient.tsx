'use client';

import { useEffect, useState } from "react";
import { Button, Chip, Image, Card, CardBody } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { BsCalendar2DateFill } from "react-icons/bs";
import { MdOutlineBlock } from "react-icons/md";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/redux/hook";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, seasonDetails } from "@/lib/tmdbAPI";
import { TMDB_CONFIG } from "@/constant/config";
import { cardNotFoundImage } from "@/constant/statics";
import CardMotion from "@/components/motion/CardMotion";

const VideoPlayer = dynamic(() => import("@/components/ui/VideoPlayer"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-black rounded-xl animate-pulse flex items-center justify-center">
      <div className="text-white/50 text-sm">Loading player...</div>
    </div>
  ),
});

interface ResumeData {
  currentTime: number;
  duration: number;
  progress: number;
}

interface IProps {
  id: string;
  type: "movie" | "tv";
  available: boolean;
  episodeID?: string;
  seasonNumber?: number;
  title: string;
  banner: string | null;
  poster: string | null;
  overview: string;
  releaseDate: string;
  voteAverage: number;
}

export default function WatchPageClient({
  id,
  type,
  available,
  episodeID,
  seasonNumber,
  title,
  banner,
  poster,
  overview,
  releaseDate,
  voteAverage,
}: IProps) {
  const router = useRouter();
  const imageSize = useAppSelector((state: any) => state.imageSize.size);
  const appearance = useAppSelector((state) => state.appearance.theme);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [resumeLoading, setResumeLoading] = useState(true);

  const accentColor =
    appearance === "blackWhite"
      ? "bg-black text-white dark:bg-white dark:text-black"
      : appearance === "blossom"
      ? "bg-pink-500 text-white"
      : "bg-primary text-white";

  // State to track selected season for the TV episodes list
  const [selectedSeason, setSelectedSeason] = useState<number>(seasonNumber || 1);

  // Sync selectedSeason if seasonNumber prop changes (e.g. initial load or URL change)
  useEffect(() => {
    if (seasonNumber) {
      setSelectedSeason(seasonNumber);
    }
  }, [seasonNumber]);

  // Fetch resume playback data client-side
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const params = new URLSearchParams({ movieID: id, type });
        if (episodeID) params.set("episodeID", episodeID);
        const res = await fetch(`/api/resume-playback?${params.toString()}`);
        const json = await res.json();
        if (json.success && json.data) {
          setResumeData({
            currentTime: json.data.currentTime,
            duration: json.data.duration,
            progress: json.data.progress,
          });
        }
      } catch {
        // ignore
      } finally {
        setResumeLoading(false);
      }
    };
    fetchResume();
  }, [id, type, episodeID]);

  // 1. Fetch TV show details (only if type === "tv" to populate seasons list)
  const { data: tvShowData } = useQuery({
    queryFn: () => getMovieDetails("tv", id),
    queryKey: [`tv-show-details-${id}`, id],
    enabled: type === "tv",
    staleTime: 1000 * 60 * 60,
  });

  const seasonsList = tvShowData?.seasons || [];

  // 2. Fetch episodes for the currently selected season
  const { data: seasonData, isLoading: episodesLoading } = useQuery({
    queryFn: () => seasonDetails(id, String(selectedSeason)),
    queryKey: [`tv-${id}-season-${selectedSeason}-episodes`, id, selectedSeason],
    enabled: type === "tv" && !!id,
    staleTime: 1000 * 60 * 60,
  });

  const episodesList = seasonData?.episodes || [];

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          id="watch-page-back-btn"
          variant="bordered"
          size="sm"
          radius="sm"
          startContent={<FaArrowLeft />}
          onPress={() => router.back()}
        >
          Back
        </Button>
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          {type === "tv" && seasonNumber && episodeID && (
            <p className="text-xs text-default-500">
              Season {seasonNumber} · Episode {episodeID}
            </p>
          )}
        </div>
      </div>

      {/* Not Available State */}
      {!available ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <MdOutlineBlock className="text-6xl text-default-400" />
          <div>
            <h2 className="text-2xl font-bold mb-2">Not Available</h2>
            <p className="text-default-500 max-w-md">
              This title is not currently available for streaming. Check back later or explore other content.
            </p>
          </div>
          <Button
            id="watch-not-available-back"
            className={`${accentColor} font-semibold mt-2`}
            radius="sm"
            onPress={() => router.back()}
          >
            Go Back
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Video Player */}
          {resumeLoading ? (
            <div className="w-full aspect-video bg-black rounded-xl animate-pulse flex items-center justify-center">
              <div className="text-white/50 text-sm">Preparing player...</div>
            </div>
          ) : (
            <VideoPlayer
              movieID={id}
              type={type}
              episodeID={episodeID}
              seasonNumber={seasonNumber}
              resumeData={resumeData}
              title={title}
              poster={poster ?? undefined}
            />
          )}

          {/* Content Info */}
          <div className="flex flex-col md:flex-row gap-6 items-start bg-default-50 dark:bg-default-100/10 p-5 rounded-xl border border-default-200/50">
            {poster && (
              <div className="shrink-0 mx-auto md:mx-0">
                <Image
                  src={poster}
                  alt={title}
                  className="w-32 h-48 object-cover rounded-lg shadow-lg"
                  radius="lg"
                />
              </div>
            )}
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-bold text-center md:text-start">{title}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {voteAverage > 0 && (
                  <Chip
                    startContent={<IoIosStar />}
                    size="sm"
                    radius="sm"
                    className={`${accentColor} font-medium space-x-1`}
                  >
                    {voteAverage.toFixed(1)} / 10
                  </Chip>
                )}
                {releaseDate && (
                  <Chip
                    startContent={<BsCalendar2DateFill />}
                    size="sm"
                    radius="sm"
                    variant="faded"
                    className="space-x-1"
                  >
                    {releaseDate}
                  </Chip>
                )}
                <Chip size="sm" radius="sm" variant="faded">
                  {type === "movie" ? "Movie" : "TV Show"}
                </Chip>
              </div>
              {overview && (
                <p className="text-sm text-default-600 leading-relaxed max-w-2xl text-center md:text-start">
                  {overview}
                </p>
              )}
              {resumeData && resumeData.progress > 0 && (
                <div className="mt-2 flex flex-col items-center md:items-start">
                  <div className="flex items-center justify-between text-xs text-default-500 mb-1 w-full max-w-xs">
                    <span>Progress</span>
                    <span>{resumeData.progress}%</span>
                  </div>
                  <div className="w-full bg-default-200 rounded-full h-1.5 max-w-xs">
                    <div
                      className={`h-full rounded-full ${
                        appearance === "blossom"
                          ? "bg-pink-500"
                          : appearance === "blackWhite"
                          ? "bg-black dark:bg-white"
                          : "bg-primary"
                      }`}
                      style={{ width: `${Math.min(resumeData.progress, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* TV Seasons and Episodes Selector Block */}
          {type === "tv" && (
            <div className="space-y-6 mt-8">
              <div className="border-b border-default-200/60 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">Episodes</h3>
                  <p className="text-xs text-default-500 mt-0.5">Choose an episode to continue watching</p>
                </div>

                {/* Season Select Dropdown */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-default-600 shrink-0">Season:</span>
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(Number(e.target.value))}
                    className="bg-default-100 dark:bg-default-100/20 hover:bg-default-200 border border-default-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none transition-colors"
                  >
                    {seasonsList
                      .filter((s: any) => s.season_number > 0)
                      .map((season: any) => (
                        <option key={season.id} value={season.season_number}>
                          {season.name} ({season.episode_count} Episodes)
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Episodes List - Identical to SeasonInfo.tsx Cards */}
              <div className="flex max-w-4xl flex-col items-start gap-4 my-4">
                {episodesLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-full h-32 flex gap-4 p-0 rounded-xl animate-pulse bg-default-100/50 border border-default-200/40">
                      <div className="w-2/5 aspect-[16/9] rounded-lg bg-default-200 shrink-0" />
                      <div className="flex-1 py-4 px-4 space-y-2">
                        <div className="h-3 w-1/4 bg-default-200 rounded" />
                        <div className="h-5 w-3/4 bg-default-200 rounded" />
                        <div className="h-3 w-5/6 bg-default-200 rounded" />
                      </div>
                    </div>
                  ))
                ) : episodesList.length === 0 ? (
                  <p className="text-sm text-default-400 py-8 text-center w-full">No episodes found for this season.</p>
                ) : (
                  episodesList.map((episode: any, index: number) => {
                    const isCurrent =
                      selectedSeason === seasonNumber &&
                      String(episode.episode_number) === episodeID;

                    const stillImg = episode.still_path
                      ? `${TMDB_CONFIG.API_IMAGE_URL}${imageSize}${episode.still_path}`
                      : cardNotFoundImage;

                    return (
                      <CardMotion key={episode.id} index={index}>
                        <Card
                          isPressable
                          onPress={() => {
                            router.push(`/watch/tv/${id}?season=${selectedSeason}&episode=${episode.episode_number}`);
                          }}
                          className={`w-full transition-all border ${
                            isCurrent
                              ? `${
                                  appearance === "blossom"
                                    ? "bg-pink-500/10 border-pink-500"
                                    : appearance === "blackWhite"
                                    ? "bg-default-200 dark:bg-default-100/20 border-default-500"
                                    : "bg-primary-500/10 border-primary-500"
                                } shadow-md`
                              : "bg-default-50/50 dark:bg-default-100/5 border-default-200/50 hover:border-default-300 dark:hover:border-default-100/30"
                          }`}
                          shadow="sm"
                        >
                          <CardBody className="flex flex-row items-center flex-wrap sm:flex-nowrap p-0">
                            {/* Episode still thumbnail */}
                            <Image
                              loading="lazy"
                              fetchPriority="high"
                              decoding="async"
                              radius="lg"
                              draggable="false"
                              removeWrapper
                              alt={episode.name}
                              className={`w-full sm:w-2/5 object-cover rounded-lg shrink-0 ${
                                appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""
                              }`}
                              src={stillImg}
                            />
                            {/* Episode metadata & description */}
                            <div className="py-4 px-4 flex-1 min-w-0 text-start">
                              <div className="flex justify-between items-center flex-wrap gap-2">
                                <p className="text-xs md:text-sm text-default-500 font-semibold">
                                  Episode {episode.episode_number}
                                </p>
                                {episode.air_date && (
                                  <p className="text-xs text-default-400">{episode.air_date}</p>
                                )}
                              </div>
                              <h4 className="text-sm md:text-lg font-bold mt-1 flex items-center gap-2">
                                {episode.name}
                                {isCurrent && (
                                  <Chip size="sm" radius="sm" className={accentColor}>
                                    Playing
                                  </Chip>
                                )}
                              </h4>
                              {episode.overview && (
                                <p className="text-xs md:text-sm text-default-600 mt-2 line-clamp-3 leading-normal">
                                  {episode.overview}
                                </p>
                              )}
                            </div>
                          </CardBody>
                        </Card>
                      </CardMotion>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
