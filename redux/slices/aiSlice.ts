import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  aiLang: "en",
  style: "trailer",
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    setAiLang: (state, action: PayloadAction<string>) => {
      state.aiLang = action.payload;
    },
    setStyle: (state, action: PayloadAction<string>) => {
      state.style = action.payload;
    },
  },
});

export const { setAiLang, setStyle } = aiSlice.actions;
export default aiSlice.reducer;
