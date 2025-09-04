import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SortState {
  sort: string;
}

const initialState: SortState = {
  sort: "popularity.desc",
};

const moviesSortSlice = createSlice({
  name: "tvSortBy",
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
  },
});

export const { setSort } = moviesSortSlice.actions;
export default moviesSortSlice.reducer;
