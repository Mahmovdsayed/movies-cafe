'use client'
import { Card, CardFooter, Chip, Image, Link, Tab, Tabs } from "@nextui-org/react";
import { FaUsers } from "react-icons/fa6";
import { MdLocalMovies } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Parallax } from 'swiper/modules';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FavButton from "@/Components/utils/FavButton";
import toast from "react-hot-toast";
import LoadingScreen from "@/Components/layout/LoadingScreen";
interface IProps {

}
const Actorss = ({ }: IProps) => {
    const [loading, setLoading] = useState(true);
    function handleCardClick(id: any) {
        toast.loading("Please Wait", {
            duration: 1500,
            position: "top-center",
        });
        router.push(`/actors/${id}`);
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        });
    }, []);
    const [movies, setmovies] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [language, setlanguage] = useState("en-US");
    const router = useRouter();

    const url = `https://api.themoviedb.org/3/trending/person/day?language=en-US`;
    const options = {
        method: "GET",

        headers: {
            accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWRlNmIzNDM5MDI2ZjdlOGRlMzEzMzBkYmRmM2VlOSIsInN1YiI6IjY1M2RmY2I0MTA5Y2QwMDBlYWUzY2JiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VcxBDxU_aw-KTBH7nzMcQUb7y95PtOm6AdhklQyTwcE`,
        },
    };

    const getStaticProps = async () => {
        setLoading(true);
        const res = await fetch(url, options);
        const data = await res.json();
        setmovies(data.results);
        setLoading(false);
    };

    useEffect(() => {
        getStaticProps();
    }, [currentPage, language]);
    return <>
        {loading == true ? <LoadingScreen /> :
            <div className="mt-6 px-4 md:px-6 ">
                <div><Chip startContent={<FaFire />} variant="flat" color="success" radius="sm" size="lg"><span className="font-bold text-tiny md:text-base">TRENDING ACTORS</span></Chip></div>
                <div className="mt-4 md:hidden">
                    <Swiper
                        loop
                        modules={[Autoplay, Parallax, Navigation]}
                        slidesPerView={1}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={10}
                        pagination={{
                            clickable: false,
                        }}
                        className="mySwiper"
                    >
                        {movies.map((mov) =>
                            <SwiperSlide>
                                <div key={mov.id}>
                                    <Card
                                        isPressable
                                        onClick={() => handleCardClick(mov.id)}
                                        shadow="sm"
                                        className="w-full md:w-[250px] relative"
                                    >
                                        <div className="z-20 absolute right-0 top-0 ">
                                            <FavButton slug={mov.id} type="actor" className=" rounded-none rounded-bl-md" title={mov.original_name} date={mov.known_for_department} imgUrl={`${mov.profile_path == null
                                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                                : `https://image.tmdb.org/t/p/original${mov.profile_path}`
                                                }`} />
                                        </div>
                                        <Image
                                            alt={mov.original_name}
                                            draggable={false}

                                            className="z-0 w-full  object-cover"
                                            src={`${mov.profile_path == null
                                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                                : `https://image.tmdb.org/t/p/original${mov.profile_path}`
                                                }`}
                                        />
                                        <CardFooter className="absolute  bottom-0 bg-gray-200 dark:bg-[#181818]  flex-col items-start space-y-3">
                                            <div className="text-start">
                                                <p className="text-tiny">{mov.original_name}</p>
                                                <p className="text-tiny dark:text-white/60">
                                                    {mov.known_for_department}
                                                </p>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
                <div className="mt-4 hidden md:flex lg:hidden">
                    <Swiper
                        loop
                        modules={[Autoplay, Parallax, Navigation]}
                        slidesPerView={3}

                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={60}
                        pagination={{
                            clickable: false,
                        }}
                        className="mySwiper"
                    >
                        {movies.map((mov) =>
                            <SwiperSlide>
                                <div key={mov.id}>
                                    <Card
                                        isPressable
                                        onClick={() => handleCardClick(mov.id)}
                                        shadow="sm"
                                        className="w-full md:w-[250px] relative"
                                    >
                                        <div className="z-20 absolute right-0 top-0 ">
                                            <FavButton slug={mov.id} type="actor" className=" rounded-none rounded-bl-md" title={mov.original_name} date={mov.known_for_department} imgUrl={`${mov.profile_path == null
                                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                                : `https://image.tmdb.org/t/p/original${mov.profile_path}`
                                                }`} />
                                        </div>
                                        <Image
                                            alt={mov.original_name}
                                            draggable={false}

                                            className="z-0 w-full  object-cover"
                                            src={`${mov.profile_path == null
                                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                                : `https://image.tmdb.org/t/p/original${mov.profile_path}`
                                                }`}
                                        />
                                        <CardFooter className="absolute  bottom-0 bg-gray-200 dark:bg-[#181818]  flex-col items-start space-y-3">
                                            <div className="text-start">
                                                <p className="text-tiny">{mov.original_name}</p>
                                                <p className="text-tiny dark:text-white/60">
                                                    {mov.known_for_department}
                                                </p>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
                <div className="mt-4 hidden md:hidden lg:flex xl:hidden">
                    <Swiper
                        loop
                        modules={[Autoplay, Parallax, Navigation]}
                        slidesPerView={4}

                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={60}
                        pagination={{
                            clickable: false,
                        }}
                        className="mySwiper"
                    >
                        {movies.map((mov) =>
                            <SwiperSlide>
                                <div key={mov.id}>
                                    <Card
                                        isPressable
                                        onClick={() => handleCardClick(mov.id)}
                                        shadow="sm"
                                        className="w-full md:w-[250px] relative"
                                    >
                                        <div className="z-20 absolute right-0 top-0 ">
                                            <FavButton slug={mov.id} type="actor" className=" rounded-none rounded-bl-md" title={mov.original_name} date={mov.known_for_department} imgUrl={`${mov.profile_path == null
                                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                                : `https://image.tmdb.org/t/p/original${mov.profile_path}`
                                                }`} />
                                        </div>
                                        <Image
                                            alt={mov.original_name}
                                            draggable={false}

                                            className="z-0 w-full  object-cover"
                                            src={`${mov.profile_path == null
                                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                                : `https://image.tmdb.org/t/p/original${mov.profile_path}`
                                                }`}
                                        />
                                        <CardFooter className="absolute  bottom-0 bg-gray-200 dark:bg-[#181818]  flex-col items-start space-y-3">
                                            <div className="text-start">
                                                <p className="text-tiny">{mov.original_name}</p>
                                                <p className="text-tiny dark:text-white/60">
                                                    {mov.known_for_department}
                                                </p>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
                <div className="mt-4 hidden md:hidden lg:hidden xl:flex 2xl:hidden">
                    <Swiper
                        loop
                        modules={[Autoplay, Parallax, Navigation]}
                        slidesPerView={5}

                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={60}
                        pagination={{
                            clickable: false,
                        }}
                        className="mySwiper"
                    >
                        {movies.map((mov) =>
                            <SwiperSlide>
                                <div key={mov.id}>
                                    <Card
                                        isPressable
                                        onClick={() => handleCardClick(mov.id)}
                                        shadow="sm"
                                        className="w-full md:w-[250px] relative"
                                    >
                                        <div className="z-20 absolute right-0 top-0 ">
                                            <FavButton slug={mov.id} type="actor" className=" rounded-none rounded-bl-md" title={mov.original_name} date={mov.known_for_department} imgUrl={`${mov.profile_path == null
                                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                                : `https://image.tmdb.org/t/p/original${mov.profile_path}`
                                                }`} />
                                        </div>
                                        <Image
                                            alt={mov.original_name}
                                            draggable={false}

                                            className="z-0 w-full  object-cover"
                                            src={`${mov.profile_path == null
                                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                                : `https://image.tmdb.org/t/p/original${mov.profile_path}`
                                                }`}
                                        />
                                        <CardFooter className="absolute  bottom-0 bg-gray-200 dark:bg-[#181818]  flex-col items-start space-y-3">
                                            <div className="text-start">
                                                <p className="text-tiny">{mov.original_name}</p>
                                                <p className="text-tiny dark:text-white/60">
                                                    {mov.known_for_department}
                                                </p>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
                <div className="mt-4 hidden md:hidden lg:hidden xl:hidden 2xl:flex">
                    <Swiper
                        loop
                        modules={[Autoplay, Parallax, Navigation]}
                        slidesPerView={6}

                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={30}
                        pagination={{
                            clickable: false,
                        }}
                        className="mySwiper"
                    >
                        {movies.map((mov) =>
                            <SwiperSlide>
                                <div key={mov.id}>
                                    <Card
                                        isPressable
                                        onClick={() => handleCardClick(mov.id)}
                                        shadow="sm"
                                        className="w-full md:w-[250px] relative"
                                    >
                                        <div className="z-20 absolute right-0 top-0 ">
                                            <FavButton slug={mov.id} type="actor" className=" rounded-none rounded-bl-md" title={mov.original_name} date={mov.known_for_department} imgUrl={`${mov.profile_path == null
                                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                                : `https://image.tmdb.org/t/p/original${mov.profile_path}`
                                                }`} />
                                        </div>
                                        <Image
                                            alt={mov.original_name}
                                            draggable={false}

                                            className="z-0 w-full  object-cover"
                                            src={`${mov.profile_path == null
                                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                                : `https://image.tmdb.org/t/p/original${mov.profile_path}`
                                                }`}
                                        />
                                        <CardFooter className="absolute  bottom-0 bg-gray-200 dark:bg-[#181818]  flex-col items-start space-y-3">
                                            <div className="text-start">
                                                <p className="text-tiny">{mov.original_name}</p>
                                                <p className="text-tiny dark:text-white/60">
                                                    {mov.known_for_department}
                                                </p>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
        }

    </>;
};

export default Actorss;