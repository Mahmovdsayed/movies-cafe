'use client'

import { AddToast } from "@/functions/AddToast";
import { generateAiResponse } from "@/helpers/fetcher";
import { useIsUser } from "@/hooks/isUser";
import { useAppSelector } from "@/redux/hook";
import { Button, Skeleton, Tooltip } from "@heroui/react";
import { useState, useEffect, useRef } from "react";
import { BsStars } from "react-icons/bs";
import { gsap } from "gsap";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
} from "@heroui/modal";

interface IMovie {
    movieID: string;
    movieTitle: string;
    moviePoster: string;
    movieReleaseDate: string;
    movieBanner: string;
    movieType: "movie" | "tv";
    movieOverview: string;
}

interface IProps {
    movie: IMovie;
    appearance: string;
}

const AiGeneratedContent = ({ movie, appearance }: IProps) => {
    const aiLang = useAppSelector((state) => state.ai.aiLang);
    const style = useAppSelector((state) => state.ai.style);
    const { isUser } = useIsUser();

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const textRef = useRef<HTMLDivElement>(null);

    const handleGenerateContent = async () => {
        try {
            setOpen(true);
            setLoading(true);
            const res = await generateAiResponse("/generate", {
                movieID: movie.movieID,
                movieTitle: movie.movieTitle,
                moviePoster: movie.moviePoster,
                movieReleaseDate: movie.movieReleaseDate,
                movieBanner: movie.movieBanner,
                movieType: movie.movieType,
                movieOverview: movie.movieOverview,
                lang: aiLang,
                style,
            });

            if (!res?.success) {
                setOpen(false);
                setLoading(false);
                AddToast(res.message, 5000, "warning");
            } else {
                setContent(res.data.content);
                setLoading(false);
                AddToast(res.message, 5000, "success");
            }
        } catch (error: any) {
            setOpen(false);
            setLoading(false);
            AddToast("Something went wrong!", 5000, "danger");
        }
    };

    useEffect(() => {
        if (!loading && content && textRef.current) {
            textRef.current.innerHTML = "";
            const isArabic = aiLang === "ar";

            const parts = isArabic ? content.split(" ") : content.split("");

            parts.forEach((part, i) => {
                const span = document.createElement("span");
                span.textContent = isArabic ? part + " " : part;
                span.style.opacity = "0";
                textRef.current!.appendChild(span);

                gsap.to(span, {
                    opacity: 1,
                    delay: i * 0.05,
                    duration: 0.2,
                });
            });

            if (isArabic) {
                textRef.current.setAttribute("dir", "rtl");
                textRef.current.style.textAlign = "right";
            } else {
                textRef.current.setAttribute("dir", "ltr");
                textRef.current.style.textAlign = "left";
            }
        }
    }, [loading, content]);


    return (
        <>
            <Tooltip
                size="sm"
                placement="top"
                className="whitespace-nowrap bg-violet-600 text-white hover:bg-violet-700 shadow-md"
                radius="lg"
                content={
                    <div className="px-1 py-2">
                        <div className="text-small font-bold">Ask AI</div>
                        <div className="text-tiny">
                            Ask AI about this movie (Beta).
                        </div>
                    </div>
                }
            >
                <Button
                    isDisabled={!isUser}
                    className="whitespace-nowrap bg-violet-600 text-white hover:bg-violet-700 shadow-md"
                    size="sm"
                    as="div"
                    onPress={handleGenerateContent}
                    isIconOnly
                    radius="full"
                    variant="flat"
                >
                    <BsStars />
                </Button>
            </Tooltip>

            <Modal
                classNames={{ backdrop: "bg-black/30" }}
                placement="center"
                backdrop="blur"
                className="dark:bg-black/20 backdrop-blur-2xl"
                shadow="sm"
                isOpen={open}
                onOpenChange={setOpen}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 dark:text-white">
                                <h4>AI Generated Content</h4>
                                <div className="text-xs md:text-sm text-default-500 font-medium">
                                    {loading
                                        ? "Generating content..."
                                        : "Here's what AI has to say about this movie:"}
                                </div>
                            </ModalHeader>
                            <ModalBody className="pb-10">
                                {loading ? (
                                    <>
                                        <Skeleton className="w-full h-3 bg-blue-500 rounded-lg"></Skeleton>
                                        <Skeleton className="w-full h-3 bg-blue-400 rounded-lg"></Skeleton>
                                        <Skeleton className="w-2/3 h-3 bg-blue-400 rounded-lg"></Skeleton>
                                        <Skeleton className="w-1/4 h-3 bg-blue-400 rounded-lg"></Skeleton>
                                    </>
                                ) : (
                                    <div
                                        ref={textRef}
                                        className="text-sm md:text-base font-medium dark:text-white text-black leading-relaxed whitespace-pre-wrap"
                                    ></div>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AiGeneratedContent;
