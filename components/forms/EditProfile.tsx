'use client'
import { updateUserAction } from "@/app/actions/user/updateUser.action";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { Countries } from "@/static/countries";
import { Profile } from "@/types/profile.types";
import updateUserValidationSchema from "@/validations/user/UpdateUserValidation";
import { Avatar, Button, Select, SelectItem } from "@heroui/react";
import { FaSave, FaTrash } from "react-icons/fa";
import FormMotion from "../motion/FormMotion";
import FormInput from "../ui/inputs/FormInput";
import NestErrors from "../ui/inputs/NestErrors";
import FormTextArea from "../ui/inputs/FormTextArea";
import SubmitButton from "../ui/buttons/SubmitButton";
import UploadAvatar from "./UploadAvatar";
import { deleteUserAction } from "@/app/actions/user/deleteUser.action";
import { AddToast } from "@/functions/AddToast";
import { useState } from "react";
import { LogoutFunc } from "@/helpers/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { ModalModel } from "../ui/post/PostConfig";

interface IProps {
    profile: Profile | null
}
const EditProfile = ({ profile }: IProps) => {
    const queryClient = useQueryClient();
    const handleResponse = useHandleResponse();
    const [loading, setLoading] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const deleteAccount = async () => {
        try {
            setOpenDelete(true);
            setLoading(true);
            const res = await deleteUserAction(String(profile?._id));
            if (!res.success) {
                AddToast(res?.message, 5000, "danger")
            } else {
                AddToast(res?.message, 5000, "success")
                await LogoutFunc()
            }
            setOpenDelete(false);
            setLoading(false);
        } catch (error) {
            // AddToast("Failed to delete account", 5000, "danger")
        }
    }
    const initialValues = {
        name: profile?.name || "",
        about: profile?.about || "",
        country: profile?.country || "",
        gender: profile?.gender || "",
        birthday: profile?.birthday ? new Date(profile.birthday).toISOString().split("T")[0] : "",
        links: {
            facebook: profile?.links?.facebook || "",
            instagram: profile?.links?.instagram || "",
            twitter: profile?.links?.twitter || "",
            tiktok: profile?.links?.tiktok || "",
            snapchat: profile?.links?.snapchat || "",
        }
    };

    const formik = useFormHandler(initialValues, updateUserValidationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("about", values.about);
        formData.append("country", values.country);
        formData.append("gender", values.gender);
        formData.append("birthday", values.birthday);
        formData.append("links.facebook", values.links.facebook);
        formData.append("links.instagram", values.links.instagram);
        formData.append("links.twitter", values.links.twitter);
        formData.append("links.tiktok", values.links.tiktok);
        formData.append("links.snapchat", values.links.snapchat);

        handleResponse(updateUserAction(formData));
        queryClient.invalidateQueries({ queryKey: ["profile", profile?.userName, "user-info"] });

    });

    const handleCountryChange = (selectedCountry: string) => {
        const country = Countries.find((c: any) => c.english_name === selectedCountry);
        if (country) {
            formik.setFieldValue("country", selectedCountry);
        }
    };
    return <>
        <div>
            <form
                onSubmit={formik.handleSubmit}
                className="w-full flex mx-auto flex-col gap-3"
            >
                <div className="md:flex w-full items-center justify-between gap-3">
                    <FormMotion delay={0.4}>
                        <FormInput
                            name="name"
                            label="Full Name"
                            value={formik.values.name}
                            type="text"
                            onBlur={formik.handleBlur}
                            size="md"
                            onChange={formik.handleChange}
                            placeholder="Enter Your Full Name"
                            description="Enter your full name as it appears on your official website."
                        />
                        {formik.touched.name && formik.errors.name && (
                            <NestErrors title={formik.errors.name} color='default' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.5}>
                        <Select
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}

                            label="Gender"
                            placeholder="Select Gender"
                            onBlur={formik.handleBlur}
                            size="md"
                            variant="faded"
                            description="Select your gender"
                            selectedKeys={[formik.values.gender || ""]}
                            labelPlacement="outside"
                        >
                            <SelectItem key={"male"}>Male</SelectItem>
                            <SelectItem key={"female"}>Female</SelectItem>
                        </Select>
                        {formik.touched.gender && formik.errors.gender && (
                            <NestErrors title={formik.errors.gender} color='primary' />
                        )}
                    </FormMotion>
                </div>
                <div className="md:flex w-full items-center justify-between gap-3">
                    <FormMotion delay={0.6}>
                        <FormInput
                            name="birthday"
                            label="Birthday"
                            value={formik.values.birthday}
                            type="date"
                            onBlur={formik.handleBlur}
                            size="md"
                            onChange={formik.handleChange}
                            placeholder="Enter Your Birthday"
                            description="Enter your birthday."
                        />
                        {formik.touched.birthday && formik.errors.birthday && (
                            <NestErrors title={formik.errors.birthday} color='primary' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.7}>
                        <Select
                            name="country"
                            value={formik.values.country}
                            onChange={(e) => { handleCountryChange(e.target.value), formik.handleChange }}
                            label="Country"
                            placeholder="Select Country"
                            onBlur={formik.handleBlur}
                            size="md"
                            variant="faded"
                            description="Select your country"
                            selectedKeys={[formik.values.country || ""]}
                            labelPlacement="outside"
                        >
                            {Countries.map((country, index) => (
                                <SelectItem startContent={<Avatar
                                    className="w-4 h-4"
                                    src={`https://flagcdn.com/${country.iso_3166_1.toLowerCase()}.svg`}
                                />} id={`country-${index}`} key={country.native_name}>{country.english_name}</SelectItem>
                            ))}
                        </Select>
                        {formik.touched.country && formik.errors.country && (
                            <NestErrors title={formik.errors.country} color='primary' />
                        )}
                    </FormMotion>
                </div>
                <div className="md:flex w-full items-center justify-between gap-3">
                    <FormMotion delay={0.8}>
                        <FormInput
                            name="links.facebook"
                            label="Facebook"
                            value={formik.values.links.facebook}
                            type="text"
                            onBlur={formik.handleBlur}
                            size="md"
                            onChange={formik.handleChange}
                            placeholder="Enter Your Facebook Profile URL"
                            description="Enter your Facebook profile URL."
                            isRequired={false}
                        />
                        {formik.touched.links?.facebook && formik.errors.links?.facebook && (
                            <NestErrors title={formik.errors.links.facebook} color='primary' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.9}>
                        <FormInput
                            name="links.instagram"
                            label="Instagram"
                            value={formik.values.links.instagram}
                            type="text"
                            onBlur={formik.handleBlur}
                            size="md"
                            onChange={formik.handleChange}
                            placeholder="Enter Your Instagram Profile URL"
                            description="Enter your Instagram profile URL."
                            isRequired={false}
                        />
                        {formik.touched.links?.instagram && formik.errors.links?.instagram && (
                            <NestErrors title={formik.errors.links.instagram} color='primary' />
                        )}
                    </FormMotion>
                </div>
                <div className="md:flex w-full items-center justify-between gap-3">
                    <FormMotion delay={1}>
                        <FormInput
                            name="links.twitter"
                            label="Twitter"
                            value={formik.values.links.twitter}
                            type="text"
                            onBlur={formik.handleBlur}
                            size="md"
                            onChange={formik.handleChange}
                            placeholder="Enter Your Twitter Profile URL"
                            description="Enter your Twitter profile URL."
                            isRequired={false}
                        />
                        {formik.touched.links?.twitter && formik.errors.links?.twitter && (
                            <NestErrors title={formik.errors.links.twitter} color='primary' />
                        )}
                    </FormMotion>
                    <FormMotion delay={1.1}>
                        <FormInput
                            name="links.tiktok"
                            label="TikTok"
                            value={formik.values.links.tiktok}
                            type="text"
                            onBlur={formik.handleBlur}
                            size="md"
                            onChange={formik.handleChange}
                            placeholder="Enter Your TikTok Profile URL"
                            description="Enter your TikTok profile URL."
                            isRequired={false}
                        />
                        {formik.touched.links?.tiktok && formik.errors.links?.tiktok && (
                            <NestErrors title={formik.errors.links.tiktok} color='primary' />
                        )}
                    </FormMotion>
                </div>
                <div className="md:flex w-full items-center justify-between gap-3">
                    <FormMotion delay={1.2}>
                        <FormInput
                            name="links.snapchat"
                            label="Snapchat"
                            value={formik.values.links.snapchat}
                            type="text"
                            onBlur={formik.handleBlur}
                            size="md"
                            onChange={formik.handleChange}
                            placeholder="Enter Your Snapchat Profile URL"
                            description="Enter your Snapchat profile URL."
                            isRequired={false}
                        />
                        {formik.touched.links?.snapchat && formik.errors.links?.snapchat && (
                            <NestErrors title={formik.errors.links.snapchat} color='primary' />
                        )}
                    </FormMotion>

                </div>
                <FormMotion delay={1.3}>
                    <FormTextArea
                        name="about"
                        label="About"
                        value={formik.values.about}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="Enter About You"
                        description="Write a brief description about yourself."
                    />
                    {formik.touched.about && formik.errors.about && (
                        <NestErrors title={formik.errors.about} color='primary' />
                    )}
                </FormMotion>
                <div className="w-full flex flex-col items-center gap-2 md:flex-row-reverse md:justify-start  md:text-end">
                    <FormMotion isFullWidth delay={1.4}>
                        <SubmitButton
                            title={`${formik.isSubmitting ? 'Saving...' : 'Save Changes'}`}
                            isLoading={formik.isSubmitting}
                            isDisabled={formik.isSubmitting}
                            startContent={<FaSave />}
                            className="w-full md:w-auto"
                        />

                    </FormMotion>
                    <FormMotion delay={1.5}>
                        <UploadAvatar profile={profile} avatar={profile?.avatar} />
                    </FormMotion>
                    <FormMotion delay={1.6}>
                        <Button onPress={() => setOpenDelete(true)} isLoading={loading} disabled={loading} startContent={<FaTrash />} className="w-full md:w-auto bg-red-600" radius="full">Delete Account</Button>
                    </FormMotion>
                </div>
            </form>
        </div>

        <ModalModel onPress={deleteAccount} loading={loading} isOpen={openDelete} setIsOpen={() => setOpenDelete(false)} title="Delete Account">
            <p>Are you sure you want to delete your account?</p>
        </ModalModel>

    </>;
};

export default EditProfile;