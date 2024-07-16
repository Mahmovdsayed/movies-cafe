'use client'
interface IProps {

}
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Bars } from "react-loader-spinner";
import { Button, Input, Image , Select, SelectItem } from "@nextui-org/react";
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
import { useUserContext } from "@/Context/UserContext";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLogin } from "@/state";


const Login = ({ }: IProps) => {
    const router = useRouter()
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
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
            const response = await fetch('/api/v1/auth/login', options)
            const res = await response.json()

            if (res.data.success == true) {
                dispatch(
                    setLogin({
                        user: res.data.userData,
                        token: res.data.token
                    })
                )

                toast.success(res.data.message, { position: 'top-center' })
                setTimeout(() => { router.push('/movies') }, 1000)

            } else if (res.data.success == false) {
                toast.error(res.data.errorMsg, { position: 'top-center' })
            }
        } catch (error: any) {
            toast.error(`An error occurred during registration`);
        }
        setisLoading(false)
    }


    let validatScheme = yup.object({
        email: yup.string().lowercase("email must be in lowercase").email("email is invalid").required("email is required"),
        password: yup
            .string()
            .required("password is required"),
    });


    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema: validatScheme,
        onSubmit: submitRegister,
    });
    return <>
        <div className="container mx-auto md:flex md:items-center md:justify-center my-6 p-6">
            <div className=" hidden md:flex w-1/2 ">
                <div className="relative">
                    <Image translate="yes" isBlurred className="w-3/4 m-auto object-cover object-center" removeWrapper src="https://image.tmdb.org/t/p/original/5weKu49pzJCt06OPpjvT80efnQj.jpg" />
                   
                </div>
            </div>
            <div className="md:w-1/2 p-4 text-center">
                <h1 className="my-4 text-2xl md:text-3xl font-semibold">Login Now</h1>
                <div className="">
                    <form onSubmit={formik.handleSubmit}>

                        <Input
                            className=" my-2"
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
                            className=" my-2"
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


                                size="lg"
                                startContent={<IoLogIn />}
                                type="submit"
                                className="mt-3 dark:bg-white bg-black text-white font-medium dark:text-black p-2 text-sm rounded-lg w-full "
                            >
                                Login Now
                            </Button>
                        )}
                        <Link
                            className=" mt-3 block text-sm"
                            href={'/register'}
                        >
                            Don't have an account?  <span className="font-bold text-pink-400">Sign up</span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    </>;
};

export default Login;
