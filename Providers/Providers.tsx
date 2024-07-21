"use client";
import LoadingScreen from "@/Components/layout/LoadingScreen";
import { NextUIProvider, Button } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Offline, Online } from "react-detect-offline";
import { MdOutlineWifiOff } from "react-icons/md";
import { UserContextProvider } from "@/Context/UserContext";
import authReducer from '../state/index'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"
import storage from "redux-persist/lib/storage";

import { PersistGate } from "redux-persist/integration/react";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'

const persistConfig = { key: "root", storage, version: 1 }
const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware({

      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],

      },
    }),
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (

    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class">

        <Toaster position="top-center" />
        <div className="text-sm fixed top-[60px] mx-4 z-50  rounded-md">
          <Offline>
            <Button
              startContent={<MdOutlineWifiOff />}
              size="sm"
              color="warning"
              className="transition-all"
            >
              You're offline right now. Check your connection.
            </Button>
          </Offline>
        </div>
        <Provider store={store}>
          <PersistGate loading={<LoadingScreen />} persistor={persistStore(store)}>
            
              {children}
          
          </PersistGate>

        </Provider>
      </NextThemesProvider>
    </NextUIProvider>




  );
}
