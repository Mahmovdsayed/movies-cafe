import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  size: "w500", // default value
};

const imageSizeSlice = createSlice({
  name: "imageSize",
  initialState,
  reducers: {
    setImageSize: (state, action: PayloadAction<string>) => {
      state.size = action.payload;
    },
  },
});

export const { setImageSize } = imageSizeSlice.actions;

export default imageSizeSlice.reducer;
