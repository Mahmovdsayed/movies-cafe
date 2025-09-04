type Actor = {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  adult: boolean;
  popularity: number;
  biography?: string;
  birthday?: string;
  deathday?: string | null;
  place_of_birth?: string;
  also_known_as?: string[];
  gender: number;
  imdb_id?: string;
  homepage?: string | null;
  external_ids?: {
    imdb_id?: string | null;
    facebook_id?: string | null;
    instagram_id?: string | null;
    twitter_id?: string | null;
  };
  images?: {
    profiles: Array<{
      file_path: string;
      width: number;
      height: number;
      iso_639_1: string | null;
      aspect_ratio: number;
      vote_average: number;
      vote_count: number;
    }>;
  };
};

export type { Actor };
