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
import FormInput from "../ui/FormInput";
import NestErrors from "../ui/NestErrors";
import FormTextArea from "../ui/FormTextArea";
import SubmitButton from "../ui/SubmitButton";
import UploadAvatar from "./UploadAvatar";
import { deleteUserAction } from "@/app/actions/user/deleteUser.action";
import { AddToast } from "@/functions/AddToast";
import { useState } from "react";
import { LogoutFunc } from "@/helpers/helpers";

interface IProps {
    profile: Profile | null
}
const EditProfile = ({ profile }: IProps) => {
    const handleResponse = useHandleResponse();
    const [loading, setLoading] = useState(false);
    const deleteAccount = async () => {
        try {
            setLoading(true);
            const res = await deleteUserAction(String(profile?._id));
            if (!res.success) {
                AddToast(res?.message, 5000, "danger")
            } else {
                AddToast(res?.message, 5000, "success")
                await LogoutFunc()
            }
            setLoading(false);
        } catch (error) {
            AddToast("Failed to delete account", 5000, "danger")
        }
    }
    const initialValues = {
        name: profile?.name || "",
        about: profile?.about || "",
        country: profile?.country || "",
        gender: profile?.gender || "",
        birthday: profile?.birthday ? new Date(profile.birthday).toISOString().split("T")[0] : "",
    };

    const formik = useFormHandler(initialValues, updateUserValidationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("about", values.about);
        formData.append("country", values.country);
        formData.append("gender", values.gender);
        formData.append("birthday", values.birthday);
        handleResponse(updateUserAction(formData));
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
                                />} id={`country-${index}`} key={country.english_name}>{country.english_name}</SelectItem>
                            ))}
                        </Select>
                        {formik.touched.country && formik.errors.country && (
                            <NestErrors title={formik.errors.country} color='primary' />
                        )}
                    </FormMotion>
                </div>
                <FormMotion delay={0.7}>
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
                    <FormMotion isFullWidth delay={0.8}>
                        <SubmitButton
                            title={`${formik.isSubmitting ? 'Saving...' : 'Save Changes'}`}
                            isLoading={formik.isSubmitting}
                            isDisabled={formik.isSubmitting}
                            startContent={<FaSave />}
                            className="w-full md:w-auto"
                        />

                    </FormMotion>
                    <FormMotion delay={1}>
                        <UploadAvatar avatar={profile?.avatar} />
                    </FormMotion>
                    <FormMotion delay={0.9}>
                        <Button onPress={deleteAccount} isLoading={loading} disabled={loading} startContent={<FaTrash />} className="w-full md:w-auto" radius="full">Delete Account</Button>
                    </FormMotion>
                </div>
            </form>
        </div>
    </>;
};

export default EditProfile;