'use client'
import { Profile } from "@/types/profile.types";
import { Button, Form } from "@heroui/react";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import DrawerModel from "../ui/utils/DrawerModel";
import FormInput from "../ui/inputs/FormInput";
import useHandleResponse from "@/hooks/useHandleResponse";
import { AddToast } from "@/functions/AddToast";
import useFormHandler from "@/hooks/useFormHandler";
import { imageUploadInitialState } from "@/helpers/initialState";
import { uploadImageValidationSchema } from "@/validations/image/imageValidation";
import { updateAvatarAction } from "@/app/actions/user/updateAvatar.action";
import NestErrors from "../ui/inputs/NestErrors";
import { compressImage } from "@/helpers/compresImage";
import SubmitButton from "../ui/buttons/SubmitButton";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
    avatar: Profile["avatar"] | any;
    profile: Profile | null;
}
const UploadAvatar = ({ avatar, profile }: IProps) => {
    const QueryClient = useQueryClient();
    const [open, setopen] = useState(false)
    const handleResponse = useHandleResponse();

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const compressedImage = await compressImage(file, "default");
            if (!compressedImage) throw new Error("Failed to compress image");
            const compressedFile = new File([file], file.name, { type: file.type });
            formik.setFieldValue("avatar", compressedFile);
        } catch (error) {
            console.log(error)
            AddToast("Failed to upload image. Please try again.", 5000, "danger");
        }
    };

    const formik = useFormHandler(imageUploadInitialState, uploadImageValidationSchema, async (values) => {
        const formData = new FormData();
        if (values.avatar instanceof File) {
            formData.append("avatar", values.avatar);
        }
        await handleResponse(updateAvatarAction(formData), formik.resetForm)
        QueryClient.invalidateQueries({ queryKey: ["profile", profile?.userName, "user-info"] });
    });

    return <>
        <div className="w-full md:w-auto">
            <Button
                className="w-full"
                radius="full"
                color="default"
                variant="flat"
                onPress={() => setopen(true)}
                startContent={<FaUpload />}
            >
                Upload Avatar
            </Button>
        </div>

        <DrawerModel
            isOpen={open}
            onClose={() => setopen(false)}
            title="Upload Profile Picture"
            description="Upload a new profile picture to personalize your account. Choose a clear, recent photo that represents you well."
            startContent={<FaUpload />}
        >
            <form onSubmit={formik.handleSubmit} className="flex py-4 flex-col gap-4 overflow-hidden">
                <div>
                    {avatar?.url && (
                        <div className="w-full flex items-center justify-center">
                            <img
                                src={avatar?.url}
                                width={400}
                                height={400}
                                alt="avatar"
                                className="size-full rounded-xl object-cover"
                            />
                        </div>
                    )}
                </div>
                <FormInput
                    type="file"
                    accept
                    name="avatar"
                    placeholder="Change Profile Picture"
                    label="Profile Picture"
                    description="Choose a clear, recent photo that represents you well."
                    onBlur={formik.handleBlur}
                    onChange={handleImageChange}

                />
                {typeof formik.errors.avatar === "string" ? (
                    <NestErrors color="default" title={formik.errors.avatar} />
                ) : null}

                <SubmitButton
                    title="Upload Now"
                    isLoading={formik.isSubmitting}
                    isDisabled={!formik.isValid || formik.isSubmitting}
                    startContent={<FaUpload />}
                />
            </form>
        </DrawerModel>
    </>;
};

export default UploadAvatar;