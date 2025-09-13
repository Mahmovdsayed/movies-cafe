'use client'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { BsThreeDots } from "react-icons/bs";
import { EditDocumentIcon } from "@/icons/EditDocumentIcon";
import { DeleteDocumentIcon } from "@/icons/DeleteDocumentIcon";
import useHandleResponse from "@/hooks/useHandleResponse";
import { deletePostAction } from "@/app/actions/post/deletePost.action";
import { useState } from "react";
import { AddToast } from "@/functions/AddToast";
import { RepostInitialState } from "@/helpers/initialState";
import { RepostValidationSchema } from "@/validations/post/RepostValidation";
import useFormHandler from "@/hooks/useFormHandler";
import { updatePostAction } from "@/app/actions/post/updatePost.action";
import FormMotion from "../../motion/FormMotion";
import FormTextArea from "../inputs/FormTextArea";
import NestErrors from "../inputs/NestErrors";

interface IProps {
    id: string
    content: string
}

interface ModalModelProps {
    isOpen: boolean
    setIsOpen: () => void
    children: React.ReactNode
    title: string
    onPress: () => void
    loading: boolean
}

export const ModalModel = ({ isOpen, setIsOpen, children, title, onPress, loading }: ModalModelProps) => {
    return <>
        <Modal
            classNames={{ backdrop: "bg-black/30" }}
            placement="center"
            backdrop="blur"
            className="dark:bg-gray-900/10  backdrop-blur-xl border border-divider"
            shadow="lg"
            isOpen={isOpen}
            onOpenChange={setIsOpen}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 dark:text-white">
                            <h4>{title}</h4>
                        </ModalHeader>
                        <ModalBody className="pb-10">
                            {children}
                        </ModalBody>
                        <ModalFooter className="mt-0 pt-0">
                            <Button startContent={<DeleteDocumentIcon />} className="dark:bg-black/20 border border-divider dark:text-white backdrop-blur-sm backdrop-grayscale-100" type="submit" isLoading={loading} isDisabled={loading} onPress={onPress} variant="flat" radius="full" fullWidth >{title} Now</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>

        </Modal>
    </>
}

const PostConfig = ({ id, content }: IProps) => {
    const handleResponse = useHandleResponse()
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    const handleDelete = async () => {
        try {
            setLoading(true);
            await handleResponse(deletePostAction(id))
            setLoading(false);
            setOpen(false);
        } catch (error) {
            setLoading(false);
            setOpen(false);
            AddToast("Something went wrong!", 5000, "danger")
        }

    }


    const initialState = {
        content: content
    }
    const formik = useFormHandler(initialState, RepostValidationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append("content", values.content);
        setLoading(true);
        await handleResponse(updatePostAction(id, formData));
        setLoading(false);
        setOpenEdit(false);
    })


    return (
        <>
            <Dropdown classNames={{
                content: "dark:bg-gray-900/10 backdrop-grayscale-100 backdrop-blur-xl"
            }} backdrop="opaque">
                <DropdownTrigger>
                    <Button
                        isIconOnly
                        variant="flat"
                        className="bg-transparent"
                    >
                        <BsThreeDots />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dropdown menu with description" variant="flat">
                    <DropdownItem
                        key="edit post"
                        showDivider
                        description="Allows you to edit your post"
                        // shortcut="⌘⇧E"
                        onPress={() => setOpenEdit(true)}
                        startContent={<EditDocumentIcon />}
                    >
                        Edit Post
                    </DropdownItem>
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        description="Allows you to delete your post"
                        onPress={() => setOpen(true)}
                        // shortcut="⌘⇧D"
                        startContent={<DeleteDocumentIcon />}
                    >
                        Delete Post
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <ModalModel onPress={handleDelete} loading={loading} isOpen={open} setIsOpen={() => setOpen(false)} title="Delete Post">
                <p>Are you sure you want to delete this post?</p>
            </ModalModel>

            <ModalModel onPress={formik.handleSubmit} loading={loading} isOpen={openEdit} setIsOpen={() => setOpenEdit(false)} title="Edit Post">
                <form className="w-full flex mx-auto flex-col gap-3" onSubmit={formik.handleSubmit}>
                    <FormMotion delay={0.2}>
                        <FormTextArea
                            name="content"
                            label="Content"
                            placeholder="Enter your Content"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            isRequired
                            onBlur={formik.handleBlur}
                            description={"Add a content to your post."}
                        />
                        {formik.touched.content && formik.errors.content && (
                            <NestErrors title={formik.errors.content} color='default' />
                        )}
                    </FormMotion>
                </form>
            </ModalModel>


        </>
    );
};

export default PostConfig;
