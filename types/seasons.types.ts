type Season = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  air_date: string;
  episode_count: number;
  seasons: Season[];
  season_number: number;
};

export type { Season };
