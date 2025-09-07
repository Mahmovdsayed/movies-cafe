import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import imageSizeReducer from "./slices/imageSizeSlice";
import moviesSortByReducer from "./slices/moviesSortSlice";
import movieFiltersReducer from "./slices/movieFiltersSlice";
import userReducer from "./slices/userSlice";
import appearanceSliceReducer from "./slices/appearanceSlice";
import aiSliceReducer from "./slices/aiSlice";
import storage from "./storage";

const rootReducer = combineReducers({
  imageSize: imageSizeReducer,
  sortBy: moviesSortByReducer,
  movieFilters: movieFiltersReducer,
  user: userReducer,
  appearance: appearanceSliceReducer,
  ai: aiSliceReducer,
});

const persistConfig = {
  key: "global",
  storage,
  whitelist: [
    "imageSize",
    "sortBy",
    "movieFilters",
    "user",
    "appearance",
    "ai",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddlewar: any) =>
    getDefaultMiddlewar({
      serializableCheck: false,
      immutableCheck: false,
      thunk: true,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
