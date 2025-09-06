import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  theme: "default", // default value
};

const appearanceSlice = createSlice({
  name: "appearance",
  initialState,
  reducers: {
    setAppearance: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const { setAppearance } = appearanceSlice.actions;

export default appearanceSlice.reducer;
