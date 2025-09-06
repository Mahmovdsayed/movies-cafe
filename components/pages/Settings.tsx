'use client'
import { LogoutFunc } from "@/helpers/helpers";
import { useIsUser } from "@/hooks/isUser";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setImageSize } from "@/redux/slices/imageSizeSlice";
import { Button, Divider, Select, SelectItem } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaImage, FaMoon, FaSun } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { RiColorFilterAiFill, RiColorFilterAiLine } from "react-icons/ri";
import { PiButterflyDuotone } from "react-icons/pi";
import { setAppearance } from "@/redux/slices/appearanceSlice";

const Settings = () => {
    const imgSize = useAppSelector((state) => state.imageSize.size)
    const appearance = useAppSelector((state) => state.appearance.theme)
    const { isUser } = useIsUser();
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const dispatch = useAppDispatch();
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

        <Divider className="my-8" />
        <h3 className="text-lg font-semibold">Appearance</h3>
        <p className="text-sm md:text-base text-default-500">Personalize the app’s color style to match your taste or improve readability.</p>
        <div className="flex items-center my-4 gap-2">
            <Button onPress={() => dispatch(setAppearance("default"))} size="sm" startContent={<RiColorFilterAiLine />} radius="full" >Default</Button>
            <Button onPress={() => dispatch(setAppearance("blackWhite"))} size="sm" className="bg-black text-white dark:bg-white dark:text-black" startContent={<RiColorFilterAiFill />} radius="full" >Black & White</Button>
            <Button
                size="sm"
                className="bg-pink-500 !text-white"
                startContent={<PiButterflyDuotone />}
                radius="full"
                variant="solid"
                onPress={() => dispatch(setAppearance("blossom"))}
            >
                Blossom
            </Button>
        </div>
        <span className=" text-xs sm:text-sm ">your current theme is <strong>{appearance === "blackWhite" ? "Black & White" : appearance === "default" ? "Default" : "Blossom"}</strong></span>

        <Divider className="my-8" />
        <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Image Quality</h3>
            <p className="text-sm md:text-base text-default-500">Adjust the quality of movie and TV show images to save data or improve loading times.</p>
            <div className="flex items-center mt-4 gap-2">
                <Select
                    className="max-w-xl"
                    variant="faded"
                    placeholder="Please Select Image Quality"
                    selectedKeys={[imgSize]}
                    onChange={(e) => dispatch(setImageSize(e.target.value))}
                    description={`Adjust the image quality to balance performance and data usage. Higher quality may look sharper but can slow down loading times, while lower quality loads faster and uses less data.`}
                    label="Image Quality"
                    startContent={<FaImage />}
                >
                    <SelectItem key={"original"}>4K Quality</SelectItem>
                    <SelectItem key={"w500"}>HD Quality</SelectItem>
                    <SelectItem key={"w400"}>SD Quality</SelectItem>
                    <SelectItem key={"w300"}>LOW Quality</SelectItem>
                </Select>
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