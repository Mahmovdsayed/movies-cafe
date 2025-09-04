type TvShowsTypes = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  first_air_date: string;
  genre_ids: number[];
  original_language: string;
  original_name: string;
  origin_country: string[];
  popularity: number;
  vote_count: number;
};

export type { TvShowsTypes };
