'use client'

import { Chip, Image } from "@heroui/react";
import { BsCalendar2DateFill } from "react-icons/bs";
import { GrStatusGoodSmall } from "react-icons/gr";
import { IoIosStar, IoIosTimer } from "react-icons/io";
import { MdOutlineLanguage } from "react-icons/md";
import AddTo from "../addTo/AddTo";
import { cardNotFoundImage } from "@/constant/statics";
import { useAppSelector } from "@/redux/hook";

interface IProps {
    banner: string;
    title: string;
    description: string;
    poster: string;
    genres: { id: number; name: string }[];
    runtime: number;
    vote_average: number;
    release_date: string;
    original_language: string;
    production_countries: { iso_3166_1: string; name: string }[];
    spoken_languages: { iso_639_1: string; english_name: string }[];
    status: string;
    tagline: string;
    homepage: string;
    type: "movie" | "tv";
    id: string;
}

const MovieHeader = ({ type, id, banner, title, description, poster, genres, runtime, vote_average, release_date, original_language, production_countries, spoken_languages, status, tagline, homepage }: IProps) => {
    const appearance = useAppSelector((state) => state.appearance.theme);
    const imageSize = useAppSelector((state) => state.imageSize.size);
    return (
        <div className="relative w-full">
            <div
                className={`absolute inset-0 bg-cover bg-center object-cover object-center z-0 ${appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""}`}
                style={{ backgroundImage: `url(${banner === null ? cardNotFoundImage : `https://image.tmdb.org/t/p/w200${banner}`})` }}
            />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-2xl" />

            <div className="container mx-auto w-full px-4">
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center items-start justify-start  py-12 gap-6 lg:gap-12">
                    <div className="">
                        <Image
                            src={poster === null ? cardNotFoundImage : `https://image.tmdb.org/t/p/${imageSize}${poster}`}
                            alt={title}
                            className={`w-40 h-60 md:48 md:h-72 lg:w-64 lg:h-96 object-cover rounded-lg z-10 shadow-xl ${appearance === "blackWhite" ? "filter grayscale hover:grayscale-0 transition" : ""}`}
                            radius="lg"
                        />
                    </div>
                    <div className="text-start  lg:text-left w-full max-w-2xl text-white">
                        {tagline && (
                            <p className="mt-4 text-xs md:text-sm italic opacity-80">"{tagline}"</p>
                        )}
                        <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
                        <p className="text-sm lg:text-lg mt-4 opacity-90">{description}</p>
                        <div className="flex flex-wrap justify-start  lg:justify-start items-center gap-2 mt-4">
                            <AddTo
                                favorites={{
                                    movieID: id,
                                    movieTitle: title,
                                    moviePoster: poster,
                                    movieOverview: description,
                                    movieBanner: banner,
                                    type,
                                    movieReleaseDate: release_date,
                                }}
                                Ai={description && poster && title && banner ? true : false} />
                        </div>

                        <div className="flex flex-wrap justify-start  lg:justify-start gap-x-2 gap-y-3 mt-8 text-sm md:text-base">
                            {
                                runtime && <Chip variant="faded" startContent={<IoIosTimer />} className="space-x-1" size="sm" radius="full">{runtime} {runtime > 1 ? "mins" : "min"} {runtime > 1 ? "" : ""}</Chip>
                            }
                            <Chip variant="faded" startContent={<IoIosStar />} className="space-x-1" size="sm" radius="full">{vote_average?.toFixed(1)} / 10</Chip>
                            <Chip variant="faded" startContent={<BsCalendar2DateFill />} className="space-x-1" size="sm" radius="full">{release_date}</Chip>
                            <Chip variant="faded" startContent={<MdOutlineLanguage />} className="space-x-1" size="sm" radius="full">{original_language?.toUpperCase()}</Chip>
                            <Chip variant="faded" size="sm" startContent={<GrStatusGoodSmall />} className="space-x-1" radius="full">{status}</Chip>
                        </div>
                        <div className="mt-4 text-sm md:text-base">
                            {genres && genres.length > 0 && (
                                <div className="flex flex-wrap justify-start  lg:justify-start mb-2 gap-2">
                                    <span className="text-sm font-semibold">Genres:</span>
                                    {genres.map((genre) => (

                                        <Chip key={genre.id} variant="faded" color="default" size="sm" radius="full">
                                            {genre.name}
                                        </Chip>
                                    ))}
                                </div>
                            )}
                        </div>


                        {production_countries && production_countries.length > 0 && (
                            <div className="flex flex-wrap justify-start  lg:justify-start gap-2  ">
                                <span className="text-sm font-semibold">Countries:</span>
                                {production_countries.map((country) => (
                                    <Chip key={country.iso_3166_1} variant="faded" color="default" size="sm" radius="full">
                                        {country.name}
                                    </Chip>
                                ))}
                            </div>
                        )}
                        {spoken_languages && spoken_languages.length > 0 && (
                            <div className="flex flex-wrap justify-start  lg:justify-start mt-2 gap-2">
                                <span className="text-sm font-semibold">Spoken Languages:</span>
                                {spoken_languages.map((lang) => (
                                    <Chip key={lang.iso_639_1} variant="faded" color="default" size="sm" radius="full">
                                        {lang.english_name}
                                    </Chip>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MovieHeader;
