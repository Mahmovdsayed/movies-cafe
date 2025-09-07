'use client'

import { addPostAction } from "@/app/actions/post/addPost.action";
import { RepostInitialState } from "@/helpers/initialState";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { RepostValidationSchema } from "@/validations/post/RepostValidation";
import { Button, Tooltip } from "@heroui/react";
import { useState } from "react";
import { FaRepeat } from "react-icons/fa6";
import DrawerModel from "./DrawerModel";
import FormMotion from "../motion/FormMotion";
import FormTextArea from "./FormTextArea";
import NestErrors from "./NestErrors";

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
    appearance: string
}
const RepostMovie = ({ movie, appearance }: IProps) => {
    const [open, setOpen] = useState(false)
    const handleResponse = useHandleResponse();

    const formik = useFormHandler(RepostInitialState, RepostValidationSchema, async (values) => {
        const formData = new FormData();
        formData.append("movieID", movie.movieID);
        formData.append("movieTitle", movie.movieTitle);
        formData.append("moviePoster", movie.moviePoster);
        formData.append("movieReleaseDate", movie.movieReleaseDate);
        formData.append("movieBanner", movie.movieBanner);
        formData.append("movieType", movie.movieType);
        formData.append("movieOverview", movie.movieOverview);
        formData.append("content", values.content);
        formData.append("type", "repost");

        await handleResponse(addPostAction(formData), formik.resetForm);
        setOpen(false);
    })

    return <>
        <Tooltip
            size="sm"
            placement="top"
            className={`whitespace-nowrap 
                        ${appearance === "blackWhite"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : appearance === "default"
                        ? "bg-primary text-white"
                        : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`}
            radius="lg"
            content={
                <div className="px-1 py-2">
                    <div className="text-small font-bold">Repost Movie</div>
                    <div className="text-tiny">Share this movie with your friends.</div>
                </div>
            }
        >
            <Button
                className={`whitespace-nowrap 
                        ${appearance === "blackWhite"
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : appearance === "default"
                            ? "bg-primary text-white"
                            : appearance === "blossom" ? "bg-pink-500 text-white" : ""}`}
                onPress={() => setOpen(true)}
                size="sm"
                as="div"
                isIconOnly
                radius="full"
                variant="flat">
                <FaRepeat />
            </Button >
        </Tooltip>

        <DrawerModel
            title={`Repost ${movie.movieTitle}`}
            isOpen={open}
            onClose={() => setOpen(false)}
            isModal={true}
            description={"Share your thoughts about this movie with your friends."}
            submitButtonText="Repost Now"
            submitButtonLoading={formik.isSubmitting}
            submitButtonDisabled={!formik.isValid || formik.isSubmitting}
            onButtonPress={formik.handleSubmit}
            startContent={<FaRepeat />}
        >
            <form className="w-full flex mx-auto flex-col gap-3" onSubmit={formik.handleSubmit} >
                <FormMotion delay={0.2}>
                    <FormTextArea
                        name="content"
                        label="Content"
                        placeholder="Enter your Content"
                        value={formik.values.content}
                        onChange={formik.handleChange}

                        isRequired
                        onBlur={formik.handleBlur}
                        description={"Add a content to your repost."}
                    />
                    {formik.touched.content && formik.errors.content && (
                        <NestErrors title={formik.errors.content} color='default' />
                    )}
                </FormMotion>
            </form>
        </DrawerModel >
    </>;
};

export default RepostMovie;