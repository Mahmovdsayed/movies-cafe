"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { TbRating18Plus } from "react-icons/tb";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { GoMoveToTop } from "react-icons/go";
import { motion, useScroll } from "framer-motion";
import { useParams } from "next/navigation";

import {
  Card,
  CardFooter,
  Button,
  Image,
  Link,
  Select,
  Avatar,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import LoadingScreen from "../layout/LoadingScreen";
export default function Keywords() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    });
  }, []);
  const { slug } = useParams();
  const [movies, setmovies] = useState<any[]>([]);
  const [number, setnumber] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [language, setlanguage] = useState("en-US");
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const scrollRef = useRef(null)

  const url = `https://api.themoviedb.org/3/keyword/${slug}/movies?include_adult=false&language=en-US&page=${currentPage}`;
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
    setnumber(data.total_pages)
    setLoading(false);
  };

  useEffect(() => {
    getStaticProps();
  }, [currentPage, language]);

  function handleButtonClick(id: any) {
    toast.loading("Please Wait", {
      duration: 1000,
      position: "top-center",
    });
    router.push(`/movies/${id}`);
  }
  function scrollToTop ()  {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <>
      
        <div>
            
          <div className=" grid  grid-flow-row gap-4 py-6 grid-cols-2  sm:grid-cols-2 px-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
            {movies.map((movie) => (
              <div key={movie.id} className="overflow-hidden   relative ">
                <Card
                  isPressable
                  onClick={() => handleButtonClick(movie.id)}
                  className="w-full h-full relative  col-span-12 sm:col-span-5"
                >
                 

                  <Image
                    alt={movie.title}
                    draggable={false}
                  isZoomed
                  radius="none"
                    className="z-0 w-full h-full  object-cover"
                    src={`${
                      movie.poster_path == null
                        ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                        : `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    }`}
                  />

                  <CardFooter className="  bg-[#C3F4FD] dark:bg-[#18181B]   justify-between">
                    <div>
                      <p className="text-start text-tiny">{movie.title}</p>
                      <p className="text-start text-tiny dark:text-white/60">
                        {movie.release_date}
                      </p>
                    </div>
                  
                  </CardFooter>
                </Card>
              </div>
            ))}
            
          </div>
          <div className="overflow-hidden py-4 flex  justify-center align-middle">
        <Pagination
        
          showControls
          total={number}
          page={currentPage}
          onChange={setCurrentPage}
          color="secondary"
          initialPage={1}
        />
       
      </div>
      <div className="flex items-center justify-center">
      <Button startContent={<GoMoveToTop />}  onClick={scrollToTop} >Scroll to Top</Button>
      </div>
          
         
        </div>
        
      
    </>
  );
}
