'use client'
interface IProps {

}
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bars } from "react-loader-spinner";
import { Button, Input, Image, Select, SelectItem } from "@nextui-org/react";
import { MdEmail } from "react-icons/md";
import { FaAt } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiPasswordFill } from "react-icons/pi";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { MdOutline123 } from "react-icons/md";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoLogIn } from "react-icons/io5";


const CreateNewAccount = ({ }: IProps) => {
    const router = useRouter()
    const [error, setError] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const submitRegister = async (values: any) => {
        setisLoading(true);
        const options: any = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)

        }
        try {
            const response = await fetch('/api/v1/auth/signup', options)
            const res = await response.json()
            if (res.data.success == true) {
                toast.success(res.data.message, { position: 'bottom-center' })
                setTimeout(() => { router.push('/login') }, 1000)

            } else if (res.data.success == false) {
                toast.error(res.data.err_msg, { position: 'bottom-center' })
            }
        } catch (error: any) {
            toast.error("An error occurred during registration");
        }
        setisLoading(false)
    }

    let validatScheme = yup.object({
        username: yup
            .string()
            .lowercase("username must be in lowercase")
            .min(3, "username minlength is 3")
            .matches(/^\S*$/, "username must not contain spaces")
            .max(20, "username maxlength is 20")
            .required("username is required"),
        email: yup.string().lowercase("email must be in lowercase").email("email is invalid").required("email is required"),
        firstName: yup
            .string()
            .lowercase("first name must be in lowercase")
            .min(3, "first Name minlength is 3")
            .max(10, "first Name maxlength is 10")
            .required("first Name is required"),
        secondName: yup
            .string()
            .lowercase("second name must be in lowercase")
            .min(3, "second Name minlength is 3")
            .max(10, "second Name maxlength is 10")
            .required("second Name is required"),

        // age: yup.number().positive().min(13, "min age is 13").max(100, "max age is 100").required("age is required"),


        // gender: yup.mixed().oneOf(['male', 'female']).defined().required("gender is required"),
        password: yup
            .string()
            .required("password is required"),
        cpass: yup
            .string()
            .oneOf([yup.ref("password")], "password and repassword dont match")
            .required("repassword is required"),
    });


    let formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            firstName: "",
            secondName: "",
            password: "",
            cpass: "",
        },
        validationSchema: validatScheme,
        onSubmit: submitRegister,
    });
    return <>
        <div className="container mx-auto md:flex md:items-center md:justify-center my-6 p-6">
            <div className=" hidden md:flex w-1/2 ">
                <div className="relative">
                    <Image translate="yes" isBlurred className="w-3/4 m-auto object-cover object-center" removeWrapper src="https://image.tmdb.org/t/p/original/AoK5iRup1fvbVNfI1mzGqX82igv.jpg" />

                </div>
            </div>
            <div className="md:w-1/2 p-4 text-center">
                <h1 className="my-4 text-2xl md:text-3xl font-semibold">Register Now</h1>
                <div className="">
                    <form onSubmit={formik.handleSubmit}>
                        <Input
                            className=" my-2 lowercase"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            label="Username"
                            startContent={<FaAt />}
                            type="text"
                            placeholder="enter your username"
                            id="username"
                            name="username"
                        />
                        {formik.errors.username && formik.touched.username ? (
                            <div className="text-red-400 text-tiny p-1 ">
                                {formik.errors.username}
                            </div>
                        ) : (
                            ""
                        )}

                        <Input
                            className=" my-2 lowercase"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            startContent={<MdEmail />}
                            label="Email"
                            type="email"
                            placeholder="enter your email"
                            id="email"
                            name="email"
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <div className="text-red-400 text-tiny p-1 ">
                                {formik.errors.email}
                            </div>
                        ) : (
                            ""
                        )}
                        <Input
                            className=" my-2 lowercase"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            startContent={<FaUserTie />}
                            value={formik.values.firstName}
                            label="First Name"
                            type="text"

                            placeholder="enter your First Name"
                            id="firstName"
                            name="firstName"
                        />
                        {formik.errors.firstName && formik.touched.firstName ? (
                            <div className="text-red-400 text-tiny p-1 ">
                                {formik.errors.firstName}
                            </div>
                        ) : (
                            ""
                        )}
                        <Input
                            className=" my-2 lowercase"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.secondName}
                            startContent={<HiMiniUsers />}
                            label="Second Name"
                            type="text"
                            placeholder="enter your Second Name"
                            id="secondName"
                            name="secondName"
                        />
                        {formik.errors.secondName && formik.touched.secondName ? (
                            <div className="text-red-400 text-tiny p-1 ">
                                {formik.errors.secondName}
                            </div>
                        ) : (
                            ""
                        )}


                        <Input
                            className=" my-2 "
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            label="Password"
                            type="password"
                            startContent={<RiLockPasswordFill />}
                            placeholder="Password"
                            id="password"
                            name="password"
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <div className="text-red-400 text-tiny p-1 ">
                                {formik.errors.password}
                            </div>
                        ) : (
                            ""
                        )}
                        <Input
                            className=" my-2"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.cpass}
                            startContent={<PiPasswordFill />}
                            label="Confirm Password"
                            type="password"
                            placeholder="confirm your password"
                            id="cpass"
                            name="cpass"
                        />
                        {formik.errors.cpass && formik.touched.cpass ? (
                            <div className="text-red-400 text-tiny p-1 ">
                                {formik.errors.cpass}
                            </div>
                        ) : (
                            ""
                        )}
                        {isLoading ? (
                            <button
                                className="mt-3" type="button">
                                <Bars
                                    height="20"
                                    width="100"
                                    color="RED"
                                    ariaLabel="bars-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </button>
                        ) : (
                            <Button
                                radius="lg"
                                size="sm"
                                startContent={<IoLogIn />}
                                type="submit"
                                className="mt-3 dark:bg-white bg-black text-white font-medium dark:text-black p-2 text-sm rounded-lg w-full "
                            >
                                Register Now
                            </Button>
                        )}
                        <Link
                            className=" mt-3 block text-sm"
                            href={'/login'}
                        >
                            Have an account already? <span className="font-bold text-pink-400">Log in</span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    </>;
};

export default CreateNewAccount;
