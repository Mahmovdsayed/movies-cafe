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
        <div className="">
            <div className="grid grid-flow-row gap-4 py-6 grid-cols-1 sm:grid-cols-2 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

                                <CardFooter className="z-20 items-center justify-center before:bg-white/10 border-white/20 border-1  py-2 absolute before:rounded-xl rounded-large bottom-2 w-[calc(100%_-_8px)] shadow-small ml-1 ">
                                    <div>
                                        <div className="">
                                            <Skeleton className="w-full rounded-lg">
                                                <div className="h-7 w-full text-sm text-center font-semibold text-white/80">sssssssssffffffdddddddddfffss</div>
                                            </Skeleton>

                                        </div>
                                    </div>

                                </CardFooter>
                            </Card>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>

    </>;
};

export default LoadingCard;