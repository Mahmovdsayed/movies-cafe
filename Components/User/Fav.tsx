'use client'
import React, { useState } from "react";

import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Image, Skeleton, Tab, Tabs } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { IoTvSharp } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { BsCollectionFill } from "react-icons/bs";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FiRefreshCcw } from "react-icons/fi";

interface IProps {
    posts: any
}
const Fav = ({ posts }: IProps) => {
    const { slug } = useParams();
    const user = useSelector((state: any) => state.user)
    const router = useRouter()
    const token = useSelector((state: any) => state.token)
    const handleSubmit = async (id: any) => {
        const auth = "accesstoken_"
        const allData = {
            postId: id,
        }
        const options = {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'accesstoken': `${auth}${token}`,
            },
            body: JSON.stringify(allData)

        }

        const res = await fetch('/api/v1/post/delete', options)
        const resData = await res.json()

        if (resData.data.success == true) {
            toast.success(resData.data.message,
                {
                    duration: 3000,
                }
            )
            router.refresh()

        } else if (token == null) {
            toast.error('please login first', { duration: 3000 })

        } else {
            toast.error(resData.data.message, { duration: 3000 })

        }



    }

    useEffect(() => {


    }, [posts])
    const refreshData = () => {
        router.refresh()
        toast.success("Data updated successfully",
            {
                duration: 3000,
            }
        )
    }
    const URL = (type: any, slug: any) => {
        if (type == "movie") {
            router.push(`/movies/${slug}`)
        }
        if (type == "tv") {
            router.push(`/tv/${slug}`)
        }
        if (type == "actor") {
            router.push(`/actors/${slug}`)
        }
    }
    return <>
        <div className="container mx-auto px-4  mt-6">
            <div className={"flex justify-center items-center flex-col mb-3"}>
                <Button isIconOnly startContent={<FiRefreshCcw />} onClick={() => refreshData()} size="sm" radius="sm" color="danger" variant="flat"></Button>
            </div>
            <Tabs
                aria-label="Options"
                size="sm"
                color="danger"
                className={"flex justify-center items-center flex-col"}
            >

                <Tab
                    key="Movies"

                    title={
                        <div className="flex items-center space-x-1">
                            <MdLocalMovies />
                            <span>Movies</span>
                        </div>
                    }
                >
                    <div className=" grid  grid-flow-row gap-4 py-6 grid-cols-1  sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                        {posts?.data.map((movie: any) => (
                            <div key={movie.id} className={movie.type != "movie" ? "hidden" : "overflow-hidden   relative "}>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ duration: 2 * 0.3 }}
                                    variants={{
                                        visible: { opacity: 1 },
                                        hidden: { opacity: 0 },
                                    }}
                                >
                                    <Card
                                        isPressable
                                        onClick={() => URL(movie.type, movie.slug)}
                                        isFooterBlurred
                                        className={"w-full h-full relative  col-span-12 sm:col-span-5"}
                                    >
                                        <CardHeader className="absolute z-40 top-1 flex items-start justify-between">
                                            <div>
                                                <p className="text-tiny text-start text-white/60 uppercase font-bold">{movie.type}</p>
                                                <h4 className="text-white  text-start font-semibold text-tiny">{movie.title}</h4>
                                            </div>
                                            <div className={user?._id != slug ? "hidden" : ""}>
                                                <Button onClick={() => handleSubmit(movie._id)} className="font-semibold" startContent={<MdDelete />} color="danger" radius="sm" size="sm">Delete</Button>
                                            </div>
                                        </CardHeader>
                                        <div className="absolute w-full h-full bg-gradient-to-b from-black/10 to-black/40 hover:bg-none z-10"></div>
                                        <Image
                                            alt={movie.title}
                                            draggable={false}
                                            radius="none"
                                            removeWrapper

                                            className="z-0 w-full h-full  object-cover "
                                            src={movie.imageUrl}
                                        />
                                        <CardFooter className="z-20 items-center justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 md:py-4 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 ">
                                            <p className="text-tiny text-center font-semibold text-white/80">{movie.title}</p>

                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </Tab>

                <Tab
                    key="Tv Shows"
                    title={
                        <div className="flex items-center space-x-1">
                            <IoTvSharp />

                            <span>TV Shows</span>
                        </div>
                    }
                >
                    <div className=" grid  grid-flow-row gap-4 py-6 grid-cols-1  sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                        {posts?.data.map((movie: any) => (
                            <div key={movie.id} className={movie.type != "tv" ? "hidden" : "overflow-hidden   relative "}>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ duration: 2 * 0.3 }}
                                    variants={{
                                        visible: { opacity: 1 },
                                        hidden: { opacity: 0 },
                                    }}
                                >
                                    <Card
                                        isPressable
                                        onClick={() => URL(movie.type, movie.slug)}
                                        isFooterBlurred
                                        className={"w-full h-full relative  col-span-12 sm:col-span-5"}
                                    >
                                        <CardHeader className="absolute z-40 top-1 flex !items-start justify-between">
                                            <div>
                                                <p className="text-tiny text-start text-white/60 uppercase font-bold">{movie.type}</p>
                                                <h4 className="text-white  text-start font-semibold text-tiny">{movie.title}</h4>
                                            </div>
                                            <div className={user?._id != slug ? "hidden" : ""}>
                                                <Button onClick={() => handleSubmit(movie._id)} className="font-semibold" startContent={<MdDelete />} color="danger" radius="sm" size="sm">Delete</Button>
                                            </div>
                                        </CardHeader>
                                        <div className="absolute w-full h-full bg-gradient-to-b from-black/10 to-black/40 hover:bg-none z-10"></div>
                                        <Image
                                            alt={movie.title}
                                            draggable={false}
                                            radius="none"
                                            removeWrapper

                                            className="z-0 w-full h-full  object-cover "
                                            src={movie.imageUrl}
                                        />
                                        <CardFooter className="z-20 items-center justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 md:py-4 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 ">
                                            <p className="text-tiny text-center font-semibold text-white/80">{movie.title}</p>

                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </Tab>
                <Tab
                    key="Actors"
                    title={
                        <div className="flex items-center space-x-1">
                            <FaUsers />
                            <span>Actors</span>
                        </div>
                    }
                >
                    <div className=" grid  grid-flow-row gap-4 py-6 grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {posts?.data.map((movie: any) => (
                            <div key={movie.id} className={movie.type != "actor" ? "hidden" : "overflow-hidden   relative "}>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    transition={{ duration: 2 * 0.3 }}
                                    variants={{
                                        visible: { opacity: 1 },
                                        hidden: { opacity: 0 },
                                    }}
                                >
                                    <Card
                                        isPressable
                                        onClick={() => URL(movie.type, movie.slug)}
                                        isFooterBlurred
                                        className={"w-full h-full relative  col-span-12 sm:col-span-5"}
                                    >
                                        <CardHeader className="absolute z-40 top-1 flex !items-start justify-between">
                                            <div>
                                                <p className="text-tiny text-start text-white/60 uppercase font-bold">{movie.type}</p>
                                                <h4 className="text-white  text-start font-semibold text-tiny">{movie.title}</h4>
                                            </div>
                                            <div className={user?._id != slug ? "hidden" : ""}>
                                                <Button onClick={() => handleSubmit(movie._id)} className="font-semibold" startContent={<MdDelete />} color="danger" radius="sm" size="sm">Delete</Button>
                                            </div>
                                        </CardHeader>
                                        <div className="absolute w-full h-full bg-gradient-to-b from-black/10 to-black/40 hover:bg-none z-10"></div>
                                        <Image
                                            alt={movie.title}
                                            draggable={false}
                                            radius="none"
                                            removeWrapper

                                            className="z-0 w-full h-full  object-cover "
                                            src={movie.imageUrl}
                                        />
                                        <CardFooter className="z-20 items-center justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 md:py-4 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 ">
                                            <p className="text-tiny text-center font-semibold text-white/80">{movie.title}</p>

                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </Tab>
            </Tabs>

        </div>

    </>;
};

export default Fav;