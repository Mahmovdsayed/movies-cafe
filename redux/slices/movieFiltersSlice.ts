import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MovieFilters {
  include_adult?: boolean;
  language?: string;
  primary_release_year?: string;
  sort_by?: string;
  vote_average_gte?: number;
  vote_average_lte?: number;
  with_origin_country?: string;
}

const initialState: MovieFilters = {
  include_adult: false,
  language: "en-US",
  sort_by: "popularity.desc",
};

const movieFiltersSlice = createSlice({
  name: "movieFilters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<MovieFilters>>) => {
      return { ...state, ...action.payload };
    },

    resetFilters: () => initialState,
  },
});

export const { setFilters, resetFilters } = movieFiltersSlice.actions;
export default movieFiltersSlice.reducer;
