'use client'

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from "react-redux";
import { store } from '@/redux/store';

export function Providers({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient());
    const router = useRouter()
    const [loading, setLoading] = useState(true);

    return <>
        
        <HeroUIProvider navigate={router.push}>
            <Provider store={store}>
                <NextThemesProvider
                    attribute="class"
                    defaultTheme="light"
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
    </>
}