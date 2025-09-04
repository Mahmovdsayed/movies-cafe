'use client'
import { LogoutFunc } from "@/helpers/helpers";
import { useIsUser } from "@/hooks/isUser";
import { Button, Divider } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const Settings = () => {
    const { isUser } = useIsUser();
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return <>
        <Divider className="mb-8" />
        <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Theme Settings</h3>
            <p className="text-sm md:text-base text-default-500">Choose your preferred theme for the application.</p>
            <div className="flex items-center mt-4 gap-2">
                <Button radius="full" startContent={<FaSun />} onPress={() => setTheme('light')} className={theme === 'light' ? 'bg-blue-500 text-white' : ''}>Light Mode</Button>
                <Button radius="full" startContent={<FaMoon />} onPress={() => setTheme('dark')} className={theme === 'dark' ? 'bg-blue-500 text-white' : ''}>Dark Mode</Button>
            </div>
        </div>
        {isUser && (
            <>
                <Divider className="my-8" />
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Log out</h3>
                    <p className="text-sm md:text-base text-default-500">Log out from your account and start a new session.</p>
                    <div className="flex items-center mt-4 gap-2">
                        <Button
                            startContent={<IoLogOut />}
                            radius="full"
                            onPress={LogoutFunc}
                            className="bg-red-500 text-white"

                        >
                            Log out
                        </Button>
                    </div>
                </div>
            </>
        )}
    </>;
};

export default Settings;