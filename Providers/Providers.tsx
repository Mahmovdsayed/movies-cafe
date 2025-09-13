'use client'

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from "react-redux";
import { store } from '@/redux/store';
import MainLoadingScreen from "@/components/layout/MainLoadingScreen";

export function Providers({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient());
    const router = useRouter()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    return <>
        {loading ? (
            <MainLoadingScreen />
        ) : (
            <HeroUIProvider navigate={router.push}>
                <Provider store={store}>
                    <NextThemesProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem={false}
                        storageKey="nest"
                    >
                        <ToastProvider
                            placement='top-center'
                        />
                        <QueryClientProvider client={queryClient}>
                            {children}
                        </QueryClientProvider>
                    </NextThemesProvider>
                </Provider>
            </HeroUIProvider>
        )}
    </>
}