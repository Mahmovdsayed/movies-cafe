'use client'

import { addPostAction } from "@/app/actions/post/addPost.action";
import { RepostInitialState } from "@/helpers/initialState";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { RepostValidationSchema } from "@/validations/post/RepostValidation";
import { Button } from "@heroui/react";
import { useState } from "react";
import { FaRepeat } from "react-icons/fa6";
import DrawerModel from "./DrawerModel";
import FormMotion from "../motion/FormMotion";
import FormInput from "./FormInput";
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

}
const RepostMovie = ({ movie }: IProps) => {
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
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("type", "repost");

        await handleResponse(addPostAction(formData), formik.resetForm);
        setOpen(false);
    })

    return <>
        <Button
            onPress={() => setOpen(true)}
            size="sm"
            as="div"
            isIconOnly
            className="bg-white text-black"
            radius="full"
            variant="flat">
            <FaRepeat />
        </Button >

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
                    <FormInput
                        type="text"
                        name="title"
                        label="Title"
                        placeholder="Enter your title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        description={"Add a title to your repost."}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <NestErrors title={formik.errors.title} color='default' />
                    )}
                </FormMotion>
                <FormMotion delay={0.3}>
                    <FormTextArea
                        name="description"
                        label="Description"
                        placeholder="Enter your description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        isRequired
                        onBlur={formik.handleBlur}
                        description={"Add a description to your repost."}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <NestErrors title={formik.errors.description} color='default' />
                    )}
                </FormMotion>
            </form>
        </DrawerModel >
    </>;
};

export default RepostMovie;