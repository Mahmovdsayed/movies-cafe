'use client'

import { Card, CardBody, CardFooter, Image, Skeleton } from "@nextui-org/react";
import { motion } from "framer-motion";

interface IProps {

}
const Cards = [{
    id: 1,
    title: '',
    date: '',
}, {
    id: 2,
    title: '',
    date: '',
}, {
    id: 3,
    title: '',
    date: '',
}, {
    id: 4,
    title: '',
    date: '',
}, {
    id: 5,
    title: '',
    date: '',
}, {
    id: 6,
    title: '',
    date: '',
}, {
    id: 7,
    title: '',
    date: '',
}, {
    id: 8,
    title: '',
    date: '',
}, {
    id: 9,
    title: '',
    date: '',
}, {
    id: 10,
    title: '',
    date: '',
}, {
    id: 11,
    title: '',
    date: '',
}, {
    id: 12,
    title: '',
    date: '',
}, {
    id: 13,
    title: '',
    date: '',
}, {
    id: 14,
    title: '',
    date: '',
}, {
    id: 15,
    title: '',
    date: '',
}, {
    id: 16,
    title: '',
    date: '',
}, {
    id: 17,
    title: '',
    date: '',
}, {
    id: 18,
    title: '',
    date: '',
}, {
    id: 19,
    title: '',
    date: '',
}, {
    id: 20,
    title: '',
    date: '',
},]
const LoadingCard = ({ }: IProps) => {
    return <>
        <div className=" grid  grid-flow-row gap-4 py-6 grid-cols-2  sm:grid-cols-2 px-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
            {Cards.map((movie) => (
                <div key={movie.id} className="overflow-hidden   relative ">
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

                            className="w-full h-full relative  col-span-12 sm:col-span-5"
                        >


                            <Image
                                alt={movie.title}
                                draggable={false}
                                radius="none"

                                isLoading
                                className="z-0 w-full h-full  object-cover"
                                src="https://i.pinimg.com/564x/14/a7/1f/14a71fac2c6aaff1a57b206329d4e7b8.jpg"
                            />

                            <CardFooter className=" bg-gray-200 dark:bg-[#18181B]   justify-between">
                                <div>

                                    <div className="space-y-3">
                                        <Skeleton className="w-4/5 rounded-lg">
                                            <div className="h-6 w-4/5 rounded-md">sssssssssfffffffffss</div>
                                        </Skeleton>
                                        <Skeleton className="w-2/5 rounded-lg">
                                            <div className="h-4 w-2/5 rounded-md "></div>
                                        </Skeleton>
                                    </div>
                                </div>
                                {/* <Button
                      as={Link}
                      showAnchorIcon
                      className="text-tiny bg-gradient-to-r from-blue-700 via-blue-800 to-gray-600 text-white"
                      href={`/movies/${movie.id}`}
                      radius="sm"
                      size="sm"
                    >
                      Explore
                    </Button> */}
                            </CardFooter>
                        </Card>
                    </motion.div>
                </div>
            ))}
        </div>
    </>;
};

export default LoadingCard;