"use server";
import { tmdbApi } from "@/helpers/api";

export const getMovieDetails = async (type: string, movie_id: string) => {
  const { data } = await tmdbApi.get(`/${type}/${movie_id}?language=en-US`);
  return data;
};

export const getMovieActors = async (
  type: string,
  movie_id: string,
  cast = "credits"
) => {
  const { data } = await tmdbApi.get(
    `/${type}/${movie_id}/${cast}?language=en-US`
  );
  return data;
};

export const getMovieCredits = async (movie_id: number) => {
  const { data } = await tmdbApi.get(`/movie/${movie_id}/credits`);
  return data;
};

export const getMovieVideos = async (movie_id: number) => {
  const { data } = await tmdbApi.get(`/movie/${movie_id}/videos`);
  return data;
};

export const getMovieImages = async (movie_id: number) => {
  const { data } = await tmdbApi.get(`/movie/${movie_id}/images`);
  return data;
};

export const getMovieKeywords = async (movie_id: number) => {
  const { data } = await tmdbApi.get(`/movie/${movie_id}/keywords`);
  return data;
};

export const getMovieRecommendations = async (
  type: string,
  movie_id: string,
  page: number = 1
) => {
  const { data } = await tmdbApi.get(
    `/${type}/${movie_id}/recommendations?language=en-US&page=${page}`
  );
  return data;
};

export const getMovieSimilar = async (movie_id: number) => {
  const { data } = await tmdbApi.get(`/movie/${movie_id}/similar`);
  return data;
};

export const getMovieReviews = async (movie_id: number) => {
  const { data } = await tmdbApi.get(`/movie/${movie_id}/reviews`);
  return data;
};

export const getMovieWatchProviders = async (movie_id: number) => {
  const { data } = await tmdbApi.get(`/movie/${movie_id}/watch/providers`);
  return data;
};

export const getMovieExternalIDs = async (movie_id: number) => {
  const { data } = await tmdbApi.get(`/movie/${movie_id}/external_ids`);
  return data;
};

export const getMovieReleaseDates = async (movie_id: number) => {
  const { data } = await tmdbApi.get(`/movie/${movie_id}/release_dates`);
  return data;
};

export const getMovieTranslations = async (movie_id: number) => {
  const { data } = await tmdbApi.get(`/movie/${movie_id}/translations`);
  return data;
};

export const getMovieAlternativeTitles = async (movie_id: number) => {
  const { data } = await tmdbApi.get(`/movie/${movie_id}/alternative_titles`);
  return data;
};

export const getMovieTrending = async (page: number = 1) => {
  const { data } = await tmdbApi.get(
    `/trending/movie/day?language=en-US?page=${page}`
  );
  return data;
};

export const getMovieNowPlaying = async (page: number = 1) => {
  const { data } = await tmdbApi.get(`/movie/now_playing?page=${page}`);
  return data;
};

export const getMoviePopular = async (page: number = 1) => {
  const { data } = await tmdbApi.get(`/movie/popular?page=${page}`);
  return data;
};

export const getMovieTopRated = async (page: number = 1) => {
  const { data } = await tmdbApi.get(`/movie/top_rated?page=${page}`);
  return data;
};

export const getMovieUpcoming = async (page: number = 1) => {
  const { data } = await tmdbApi.get(
    `/movie/upcoming?language=en-US&page=${page}`
  );
  return data;
};

export const searchMovies = async (query: string, page: number = 1) => {
  const { data } = await tmdbApi.get(
    `/search/movie?query=${query}&page=${page}`
  );
  return data;
};

export const discoverMovies = async (
  filters: {
    primary_release_year?: number;
    sort_by?: string;
    vote_average_gte?: number;
    vote_average_lte?: number;
    with_origin_country?: string;
  } = {},
  page: number = 1,
  type: "movie" | "tv" = "movie"
) => {
  try {
    const params = new URLSearchParams();

    const dotNotationKeys = ["vote_average_gte", "vote_average_lte"];

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        let tmdbKey: string = key;
        let tmdbValue: string | number = value;

        if (dotNotationKeys.includes(key)) {
          tmdbKey = key.replace(/_/g, ".");
        }

        if (key === "primary_release_year" && type === "tv") {
          tmdbKey = "first_air_date_year";
        }

        if (key === "sort_by" && typeof value === "string") {
          if (type === "movie") {
            if (value.includes("first_air_date")) {
              tmdbValue = value.replace(
                "first_air_date",
                "primary_release_date"
              );
            }
            if (value.includes("original_name")) {
              tmdbValue = value.replace("original_name", "original_title");
            }
          } else {
            if (value.includes("primary_release_date")) {
              tmdbValue = value.replace(
                "primary_release_date",
                "first_air_date"
              );
            }
            if (value.includes("original_title")) {
              tmdbValue = value.replace("original_title", "original_name");
            }
          }
        }

        params.set(tmdbKey, String(tmdbValue));
      }
    });

    if (!params.has("language")) params.set("language", "en-US");
    if (!params.has("include_adult")) params.set("include_adult", "false");
    if (!params.has("sort_by")) params.set("sort_by", "popularity.desc");

    params.set("page", String(page));

    const { data } = await tmdbApi.get(
      `/discover/${type}?${params.toString()}`
    );
    return data;
  } catch (error) {
    return { results: [], page: 1, total_pages: 0, total_results: 0 };
  }
};

export const getAiringToday = async (page: number = 1) => {
  const { data } = await tmdbApi.get(
    `/tv/airing_today?language=en-US&page=${page}`
  );
  return data;
};

export const getOnTheAir = async (page: number = 1) => {
  const { data } = await tmdbApi.get(
    `/tv/on_the_air?language=en-US&page=${page}`
  );
  return data;
};

export const getPopularTVShows = async (page: number = 1) => {
  const { data } = await tmdbApi.get(`/tv/popular?language=en-US&page=${page}`);
  return data;
};

export const getTopRatedTVShows = async (page: number = 1) => {
  const { data } = await tmdbApi.get(
    `/tv/top_rated?language=en-US&page=${page}`
  );
  return data;
};

export const SearchData = async (
  query: string,
  page: number = 1,
  type: "person" | "company" | "keyword" | "tv" | "movie" = "movie"
) => {
  const { data } = await tmdbApi.get(
    `/search/${type}?query=${encodeURIComponent(query)}&page=${page}`
  );
  return data;
};

export const getAllActors = async (page: number = 1) => {
  const { data } = await tmdbApi.get(`/person/popular?page=${page}`);
  return data;
};

export const actorDetails = async (id: string) => {
  const { data } = await tmdbApi.get(`/person/${id}`);
  return data;
};

export const actorCredits = async (
  id: string,
  type: "movie_credits" | "tv_credits"
) => {
  const { data } = await tmdbApi.get(`/person/${id}/${type}`);
  return data;
};

export const actorExternalIds = async (id: string) => {
  const { data } = await tmdbApi.get(`/person/${id}/external_ids`);
  return data;
};

export const seasonDetails = async (seriesID: string, seasonID: string) => {
  const { data } = await tmdbApi.get(
    `/tv/${seriesID}/season/${seasonID}?language=en-US`
  );
  return data;
};
