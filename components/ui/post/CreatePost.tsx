'use client'

import { PostInitialState } from "@/helpers/initialState";
import { useIsUser } from "@/hooks/isUser";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { RepostValidationSchema } from "@/validations/post/RepostValidation";
import { Button, Textarea } from "@heroui/react";
import { HiOutlineUpload } from "react-icons/hi";
import NestErrors from "../inputs/NestErrors";
import { addPostAction } from "@/app/actions/post/addPost.action";

const CreatePost = () => {
    const { isUser } = useIsUser()
    const handleResponse = useHandleResponse();

    const formik = useFormHandler(PostInitialState, RepostValidationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append("content", values.content);
        formData.append("movieType", "movie");
        formData.append("type", "post");
        await handleResponse(addPostAction(formData), formik.resetForm);

    })

    return <>
        {
            isUser &&
            <>
                <div className="mb-3">
                    <h2 className="font-semibold text-base  text-default-700 mb-3">What's on your mind?</h2>
                    <form className="w-full flex mx-auto flex-col gap-3" onSubmit={formik.handleSubmit} >
                        <Textarea
                            variant="bordered"
                            size="sm"
                            name="content"
                            placeholder="Share your thoughts with the community..."
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isRequired
                            min={2}
                            radius="lg"
                            max={500}
                            classNames={{
                                input: "font-semibold"
                            }}

                            description="Maximum 500 characters."
                        />
                        {formik.touched.content && formik.errors.content && (
                            <NestErrors title={formik.errors.content} color='default' />
                        )}
                        <div className="my-3">
                            <Button
                                startContent={<HiOutlineUpload />}
                                radius="full"
                                variant="flat"
                                size="sm"
                                isDisabled={formik.isSubmitting}
                                isLoading={formik.isSubmitting}
                                fullWidth
                                type="submit"
                            >Post Now</Button>

                        </div>
                    </form>
                </div>
            </>
        }
    </>;
};

export default CreatePost;