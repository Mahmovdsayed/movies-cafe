import React, { useCallback, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { TbRating18Plus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { GoMoveToTop } from "react-icons/go";
import { motion } from "framer-motion";

import Box from "@mui/material/Box";
import {
Image,
  Card,
  CardFooter,
  Button,
  Skeleton,
  Link,
  Select,
  Avatar,
  SelectItem,
} from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import LoadingScreen from "../layout/LoadingScreen";
import LoadingCard from "../layout/LoadingCard";
import FavButton from "../utils/FavButton";
export default function Tv() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    });
  }, []);
  const [movies, setmovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const [language, setlanguage] = useState("en-US");
  const url = ` https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=${language}&page=${currentPage}&sort_by=vote_count.desc`;

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
    setLoading(true);
    setmovies(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getStaticProps();
  }, [currentPage, language]);
  function handleButtonClick(id: any) {
    toast.loading("Please Wait", {
      duration: 1200,
      position: "top-center",
    });
    router.push(`/tv/${id}`);
  }
  function scrollToTop ()  {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <>
      {loading == true ? (
        <LoadingCard />
      ) : (
        <div>
          <div className=" grid  grid-flow-row gap-4 py-6 grid-cols-2  sm:grid-cols-2 px-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
            {movies.map((movie) => (
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
                  onClick={() => handleButtonClick(movie.id)}
                  className="w-full h-full relative  col-span-12 sm:col-span-5"
                >
                  <div className="z-20 absolute right-0 top-0 ">
                      <FavButton slug={movie.id} type="tv" className=" rounded-none rounded-bl-md" title={movie.original_name} date={movie.first_air_date} imgUrl={`${movie.poster_path == null
                        ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                        : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                        }`} />
                    </div>
                    

                  <Image
                    alt={movie.original_name}
                    draggable={false}
                 isZoomed
                  radius="none"

                    className="z-0 w-full h-full   object-cover"
                   src={`${
                      movie.poster_path == null
                        ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                        : `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    }`}
                  />

                  <CardFooter className=" bg-gray-200 dark:bg-[#18181B]   justify-between">
                    <div>
                      <p className="text-tiny text-start font-bold">
                        {movie.original_name}
                      </p>
                      <p className="text-tiny text-start dark:text-white/60">
                        {movie.first_air_date}
                      </p>
                    </div>
                    {/* <Button
                      as={Link}
                      showAnchorIcon
                      className="text-tiny bg-gradient-to-r from-blue-700 via-blue-800 to-gray-600 text-white"
                      href={`/tv/${movie.id}`}
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

          <div className="overflow-hidden py-4 flex justify-center align-middle">
            <Pagination
              showControls
              total={500}
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
      )}
    </>
  );
}
