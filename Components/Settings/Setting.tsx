'use client'
import { Button } from "@nextui-org/react";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { Modal, ModalContent, ModalHeader, ModalBody, Selection, ModalFooter, useDisclosure, Select, SelectItem, Checkbox, Input, Link } from "@nextui-org/react";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { FaAt } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { Bars } from "react-loader-spinner";
import * as yup from "yup";
import { useFormik } from "formik";
import { IoLogIn } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { PiPasswordFill } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { setLogout } from "@/state";
import { MoonIcon } from "../../icons/MoonIcon";
import { SunIcon } from "../../icons/SunIcon";
import { useTheme } from "next-themes";

interface IProps {

}
const Setting = ({ }: IProps) => {
    const { theme, setTheme } = useTheme();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [isLoading, setisLoading] = useState(false);
    const [value, setValue] = React.useState("male");
    const router = useRouter()
    const token = useSelector((state: any) => state.token)
    const user = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const deleteAccount = async () => {

        const auth = "accesstoken_"

        const options = {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'accesstoken': `${auth}${token}`,
            },

        }

        const res = await fetch('/api/v1/auth/delete', options)
        const resData = await res.json()

        if (resData.data.success == true) {

            toast.success(resData.data.message,
                {
                    duration: 3000,
                }
            )
            router.push('/')
            dispatch(setLogout())



        } else if (token == null) {
            toast.error('please login first', { duration: 3000 })

        } else {
            toast.error(resData.data.message, { duration: 3000 })

        }



    }
    return <>
        <div className="container mx-auto my-6 px-6">

            <h1 className="font-semibold text-4xl text-center ">Settings</h1>
            <div className="flex items-center justify-between p-4 mt-4">
                <div><h3 className="text-sm md:text-lg font-semibold">Theme</h3></div>
                <div className="space-x-2">
                    <Button
                        startContent={<SunIcon />}
                        size="sm"
                        color="default"
                        radius="sm"
                        onClick={() => setTheme("light")}
                    >
                        Light
                    </Button>
                    <Button
                        startContent={<MoonIcon />}
                        size="sm"
                        radius="sm"
                        color="default"
                        onClick={() => setTheme("dark")}
                    >
                        Dark
                    </Button>
                </div>
            </div>
            <div className="p-4 my-4 ">

                <div className="flex items-center justify-between">
                    <div><h3 className="text-sm md:text-lg font-semibold">Delete your Account</h3></div>
                    <div><Button onPress={onOpen} startContent={<MdDelete />} size="sm" radius="sm" color="danger">Delete Now</Button></div>
                </div>
                <Modal placement="center" backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Are you sure about this ?</ModalHeader>
                                <ModalBody>
                                    <p>
                                        Deleting now will permanently remove your account. This action cannot be undone. Are you absolutely certain you want to proceed?
                                    </p>

                                </ModalBody>
                                <ModalFooter>
                                    <Button size="sm" radius="sm" color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button onClick={() => deleteAccount()} size="sm" radius="sm" color="primary" onPress={onClose}>
                                        Delete Now
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>

    </>;
};

export default Setting;