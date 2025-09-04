type Cast = {
  adult: boolean;
  cast_id: string;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
  roles: {
    character: string;
    credit_id: string;
    id: number;
    name: string;
    order: number;
    original_name: string;
  }[];
};

export type { Cast };
