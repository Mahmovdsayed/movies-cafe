'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Chip } from "@heroui/react";
import { FaPlay, FaRedo, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

interface ResumeData {
  currentTime: number;
  duration: number;
  progress: number;
}

interface IProps {
  movieID: string;
  type: "movie" | "tv";
  episodeID?: string;
  seasonNumber?: number;
  resumeData?: ResumeData | null;
  title?: string;
  poster?: string;
}

// Embed player base — vaplayer.ru per VidAPI docs
const EMBED_BASE = "https://vaplayer.ru";

function buildEmbedUrl(
  type: "movie" | "tv",
  movieID: string,
  seasonNumber?: number,
  episodeID?: string,
  resumeAt?: number,
  title?: string,
  poster?: string
): string {
  let path: string;

  if (type === "movie") {
    path = `${EMBED_BASE}/embed/movie/${movieID}`;
  } else {
    const season = seasonNumber ?? 1;
    const episode = episodeID ?? "1";
    path = `${EMBED_BASE}/embed/tv/${movieID}/${season}/${episode}`;
  }

  const url = new URL(path);

  if (resumeAt && resumeAt > 5) {
    url.searchParams.set("resumeAt", String(Math.floor(resumeAt)));
  }
  if (title) {
    url.searchParams.set("title", encodeURIComponent(title));
  }
  if (poster) {
    url.searchParams.set("poster", encodeURIComponent(poster));
  }

  return url.toString();
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const VideoPlayer = ({
  movieID,
  type,
  episodeID,
  seasonNumber,
  resumeData,
  title,
  poster,
}: IProps) => {
  const router = useRouter();
  const appearance = useAppSelector((state) => state.appearance.theme);

  const handleNextEpisode = useCallback(() => {
    if (type !== "tv" || !episodeID) return;
    const currentEpisode = parseInt(episodeID);
    const nextEpisode = currentEpisode + 1;
    router.push(`/watch/tv/${movieID}?season=${seasonNumber || 1}&episode=${nextEpisode}`);
  }, [type, episodeID, movieID, seasonNumber, router]);

  const handlePrevEpisode = useCallback(() => {
    if (type !== "tv" || !episodeID) return;
    const currentEpisode = parseInt(episodeID);
    if (currentEpisode <= 1) return;
    const prevEpisode = currentEpisode - 1;
    router.push(`/watch/tv/${movieID}?season=${seasonNumber || 1}&episode=${prevEpisode}`);
  }, [type, episodeID, movieID, seasonNumber, router]);

  const [showResumePrompt, setShowResumePrompt] = useState(
    () => !!(resumeData && resumeData.currentTime > 30)
  );

  // Start without resumeAt — show prompt first
  const [currentEmbedUrl, setCurrentEmbedUrl] = useState(() =>
    buildEmbedUrl(type, movieID, seasonNumber, episodeID, 0, title, poster)
  );

  // Sync state if props change (e.g. when changing episodes/seasons)
  useEffect(() => {
    progressRef.current = 0;
    durationRef.current = 0;
    setPlayerProgress(0);
    setPlayerDuration(0);
    setShowResumePrompt(!!(resumeData && resumeData.currentTime > 30));
    const url = buildEmbedUrl(type, movieID, seasonNumber, episodeID, 0, title, poster);
    setCurrentEmbedUrl(url);
    setIframeKey((k) => k + 1);
  }, [type, movieID, seasonNumber, episodeID, resumeData, title, poster]);

  const [iframeKey, setIframeKey] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [playerProgress, setPlayerProgress] = useState(0);
  const [playerDuration, setPlayerDuration] = useState(0);

  const progressRef = useRef(0);
  const durationRef = useRef(0);
  const saveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const saveProgressToApi = useCallback(
    async (completed = false) => {
      if (isSaving) return;
      if (progressRef.current < 5) return;
      setIsSaving(true);
      try {
        await fetch("/api/resume-playback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            movieID,
            type,
            currentTime: progressRef.current,
            duration: durationRef.current,
            isCompleted:
              completed ||
              (durationRef.current > 0 &&
                progressRef.current / durationRef.current >= 0.95),
            ...(episodeID && { episodeID }),
            ...(seasonNumber && { seasonNumber }),
          }),
        });
      } catch {
        // silent fail
      } finally {
        setIsSaving(false);
      }
    },
    [movieID, type, episodeID, seasonNumber, isSaving]
  );

  // ─── postMessage listener (VidAPI PLAYER_EVENT format) ──────────────────
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const msg = event.data;
        if (!msg || msg.type !== "PLAYER_EVENT") return;

        const { player_status, player_progress, player_duration } = msg.data ?? {};

        if (typeof player_progress === "number") {
          progressRef.current = player_progress;
          setPlayerProgress(player_progress);
        }
        if (typeof player_duration === "number") {
          durationRef.current = player_duration;
          setPlayerDuration(player_duration);
        }

        // Save on pause and every ~5s during playing (player already fires every 5s)
        if (player_status === "playing" || player_status === "paused") {
          saveProgressToApi();
        }
        if (player_status === "completed") {
          saveProgressToApi(true);
          // Auto-load next episode if TV
          if (type === "tv" && episodeID) {
            handleNextEpisode();
          }
        }
      } catch {
        // ignore malformed messages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [movieID, type, episodeID, seasonNumber, handleNextEpisode, saveProgressToApi]);

  // ─── Also save on interval as fallback ──────────────────────────────────
  useEffect(() => {
    saveTimerRef.current = setInterval(() => {
      if (progressRef.current > 5) {
        saveProgressToApi();
      }
    }, 10000); // fallback every 10s

    return () => {
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
      // Save on unmount
      if (progressRef.current > 5) saveProgressToApi();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieID, type, episodeID, seasonNumber]);

  // ─── Resume handlers ─────────────────────────────────────────────────────
  const handleContinue = () => {
    setShowResumePrompt(false);
    const url = buildEmbedUrl(
      type,
      movieID,
      seasonNumber,
      episodeID,
      resumeData?.currentTime,
      title,
      poster
    );
    setCurrentEmbedUrl(url);
    setIframeKey((k) => k + 1);
  };

  const handleStartOver = () => {
    setShowResumePrompt(false);
    const url = buildEmbedUrl(type, movieID, seasonNumber, episodeID, 0, title, poster);
    setCurrentEmbedUrl(url);
    setIframeKey((k) => k + 1);
  };

  const accentColor =
    appearance === "blackWhite"
      ? "bg-black text-white dark:bg-white dark:text-black"
      : appearance === "blossom"
      ? "bg-pink-500 text-white"
      : "bg-primary text-white";

  return (
    <div className="w-full space-y-3">
      {/* Resume prompt */}
      {showResumePrompt && resumeData && (
        <div className="rounded-xl border border-default-200 bg-default-50 dark:bg-default-100/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MdHistory className="text-2xl text-primary shrink-0" />
            <div>
              <p className="font-semibold text-sm">Resume watching?</p>
              <p className="text-xs text-default-500">
                Continue from{" "}
                <span className="font-mono font-bold">
                  {formatTime(resumeData.currentTime)}
                </span>
                {resumeData.progress > 0 && (
                  <span className="ml-2 text-default-400">
                    ({resumeData.progress}% watched)
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button
              id="video-player-continue-btn"
              size="sm"
              radius="sm"
              className={`${accentColor} font-medium`}
              startContent={<FaPlay className="text-xs" />}
              onPress={handleContinue}
            >
              Continue
            </Button>
            <Button
              id="video-player-start-over-btn"
              size="sm"
              radius="sm"
              variant="bordered"
              startContent={<FaRedo className="text-xs" />}
              onPress={handleStartOver}
            >
              Start Over
            </Button>
          </div>
        </div>
      )}

      {/* Player */}
      <div
        className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-black"
        style={{ paddingBottom: "56.25%" }}
      >
        <iframe
          key={iframeKey}
          src={currentEmbedUrl}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          title={title ?? "VidAPI Player"}
          loading="eager"
          referrerPolicy="origin"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-top-navigation-by-user-activation"
        />
      </div>

    </div>
  );
};

export default VideoPlayer;
