"use client";
import React, { useEffect, useState } from "react";
import { Link, Button, ButtonGroup, Image, Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from "next/navigation";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Parallax } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Trending from "./Home/Trending";
import Tvs from "./Home/Tvs";
import Actorss from "./Home/Actorss";
export default function HomeSection() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    });
  }, []);
  const [movies, setmovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [language, setlanguage] = useState("en-US");
  const router = useRouter();

  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=${language}&page=${currentPage}&sort_by=popularity.desc`;
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
    console.log(data.results)
    setmovies(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getStaticProps();
  }, [currentPage, language]);
  return (

    <>

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

        <div className=" my-4">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            parallax={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}

            modules={[Autoplay, Parallax, Pagination, Navigation]}
            className="mySwiper "
          >
            {movies.map((mov) =>
              <SwiperSlide key={mov.id}>
                <div className="w-full relative">
                  <Image
                    radius="none"
                    isBlurred
                    isZoomed
                    className="sm:h-[400px] lg:h-[600px]  object-contain object-center w-screen "
                    src={`https://image.tmdb.org/t/p/original${mov.backdrop_path}`}
                  />
                  <div className="text-center py-4 text-default-500 text-tiny font-bold" >
                    {mov.title}
                  </div>
                </div>
              </SwiperSlide>

            )}
          </Swiper>
        </div>
        <Trending />
        <Divider className="mt-4" />
        <Tvs />
        <Divider className="mt-4" />
        <Actorss />
      </motion.div>
    </>
  );
}
