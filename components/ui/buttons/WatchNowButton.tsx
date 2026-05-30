'use client';

import { Button, Tooltip } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { MdOutlineBlock } from "react-icons/md";
import { useAppSelector } from "@/redux/hook";

interface IProps {
  id: string;
  type: "movie" | "tv";
  episodeID?: string;
  seasonNumber?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabel?: boolean;
  isIconOnly?: boolean;
}

const WatchNowButton = ({
  id,
  type,
  episodeID,
  seasonNumber,
  size = "sm",
  className = "",
  showLabel = true,
  isIconOnly = false,
}: IProps) => {
  const router = useRouter();
  const appearance = useAppSelector((state) => state.appearance.theme);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/check-availability?id=${encodeURIComponent(id)}&type=${type}`
        );
        const json = await res.json();
        if (!cancelled) {
          setAvailable(json.available ?? false);
        }
      } catch {
        if (!cancelled) setAvailable(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    check();
    return () => {
      cancelled = true;
    };
  }, [id, type]);

  const handleWatch = () => {
    if (!available) return;
    const params = new URLSearchParams();
    if (episodeID) params.set("episode", episodeID);
    if (seasonNumber) params.set("season", String(seasonNumber));
    const query = params.toString() ? `?${params.toString()}` : "";
    router.push(`/watch/${type}/${id}${query}`);
  };

  const colorClass =
    appearance === "blackWhite"
      ? "bg-black text-white dark:bg-white dark:text-black"
      : appearance === "blossom"
      ? "bg-pink-500 text-white"
      : "bg-primary text-white";

  if (loading) {
    return (
      <Button
        id={`watch-now-loading-${id}`}
        isLoading
        size={size}
        radius={isIconOnly ? "full" : "sm"}
        isIconOnly={isIconOnly}
        className={`${colorClass} opacity-60 ${className}`}
        disabled
      >
        {!isIconOnly && showLabel && <span className="text-xs">Checking...</span>}
      </Button>
    );
  }

  const buttonContent = (
    <Button
      id={`watch-now-${id}${episodeID ? `-${episodeID}` : ""}`}
      size={size}
      radius={isIconOnly ? "full" : "sm"}
      isIconOnly={isIconOnly}
      startContent={isIconOnly ? null : (available ? <FaPlay className="text-xs" /> : <MdOutlineBlock className="text-sm" />)}
      className={`${available ? colorClass : "bg-default-200 text-default-500"} font-medium transition-all ${className}`}
      onPress={handleWatch}
      isDisabled={!available}
      title={available ? "Watch now" : "Not available for streaming"}
    >
      {isIconOnly ? (
        available ? <FaPlay className="text-xs" /> : <MdOutlineBlock className="text-sm" />
      ) : (
        showLabel && (
          <span className="text-xs">{available ? "Watch Now" : "Unavailable"}</span>
        )
      )}
    </Button>
  );

  if (isIconOnly) {
    return (
      <Tooltip
        size="sm"
        placement="top"
        className={`whitespace-nowrap ${
          appearance === "blackWhite"
            ? "bg-black text-white dark:bg-white dark:text-black"
            : appearance === "default"
            ? "bg-primary text-white"
            : appearance === "blossom"
            ? "bg-pink-500 text-white"
            : ""
        }`}
        radius="lg"
        content={
          <div className="px-1 py-2">
            <div className="text-small font-bold">Watch Now</div>
            <div className="text-tiny">
              {available ? "Start streaming this content." : "Not available for streaming."}
            </div>
          </div>
        }
      >
        {buttonContent}
      </Tooltip>
    );
  }

  return buttonContent;
};

export default WatchNowButton;
