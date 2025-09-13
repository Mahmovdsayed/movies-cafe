'use client'
import { Button, Tooltip } from "@heroui/react";
import { BsStars } from "react-icons/bs";
import { FaRepeat } from "react-icons/fa6";
import { LuShare } from "react-icons/lu";
import { MdWatchLater } from "react-icons/md";
import AddToFavorites from "./AddToFavorites";
import AddToWatchList from "./AddToWatchList";
import RepostMovie from "../post/RepostMovie";
import ShareButton from "../buttons/ShareButton";
import { useAppSelector } from "@/redux/hook";
import AiGeneratedContent from "./AiGeneratedContent";

interface IProps {
    Ai?: boolean
    favorites: {
        movieID: string
        movieTitle: string
        moviePoster: string
        movieReleaseDate: string
        movieBanner: string
        type: "movie" | "tv"
        movieOverview: string
    }
}
const AddTo = ({ Ai = true, favorites }: IProps) => {
    const appearance = useAppSelector((state) => state.appearance.theme)
    return <>
        <AddToFavorites appearance={appearance} favorite={{
            movieID: favorites.movieID,
            movieTitle: favorites.movieTitle,
            moviePoster: favorites.moviePoster,
            movieReleaseDate: favorites.movieReleaseDate,
            movieBanner: favorites.movieBanner,
            type: favorites.type,
            movieOverview: favorites.movieOverview,
        }}
        />
        <AddToWatchList
            appearance={appearance}
            watchList={{
                movieID: favorites.movieID,
                movieTitle: favorites.movieTitle,
                moviePoster: favorites.moviePoster,
                movieReleaseDate: favorites.movieReleaseDate,
                movieBanner: favorites.movieBanner,
                type: favorites.type,
                movieOverview: favorites.movieOverview,
            }}
        />
        <Tooltip
            size="sm"
            placement="top"
            radius="lg"

            content={
                <div className="px-1 py-2">
                    <div className="text-small font-bold">Repost</div>
                    <div className="text-tiny">Share this movie with your friends.</div>
                </div>
            }
        >
            <RepostMovie
                appearance={appearance}
                movie={{
                    movieID: favorites.movieID,
                    movieTitle: favorites.movieTitle,
                    moviePoster: favorites.moviePoster,
                    movieReleaseDate: favorites.movieReleaseDate,
                    movieBanner: favorites.movieBanner,
                    movieType: favorites.type,
                    movieOverview: favorites.movieOverview,
                }}
            />

        </Tooltip>
        {Ai && (
            <ShareButton appearance={appearance} />
        )}
        {Ai && (
            <AiGeneratedContent
                movie={{
                    movieID: favorites.movieID,
                    movieTitle: favorites.movieTitle,
                    moviePoster: favorites.moviePoster,
                    movieReleaseDate: favorites.movieReleaseDate,
                    movieBanner: favorites.movieBanner,
                    movieType: favorites.type,
                    movieOverview: favorites.movieOverview,
                }}
                appearance={appearance}
            />
        )}
    </>;
};

export default AddTo;