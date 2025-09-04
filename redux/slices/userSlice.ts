import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "@/types/profile.types";
interface UserState {
  user: Profile | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Profile | null>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<Profile>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
