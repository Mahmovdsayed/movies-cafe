import React, { useCallback, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { TbRating18Plus } from "react-icons/tb";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { GoMoveToTop } from "react-icons/go";
import { motion } from "framer-motion";

import {
  Image,
  Card,
  CardFooter,
  Button,
  Link,
  Select,
  Avatar,
  SelectItem,
  Skeleton,
  CardHeader,
} from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";
import LoadingScreen from "../layout/LoadingScreen";
import LoadingCard from "../layout/LoadingCard";
import FavButton from "../utils/FavButton";
export default function AllActors() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    });
  }, []);
  const [movies, setmovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [language, setlanguage] = useState("en-US");
  const url = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${currentPage}`;
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
  const router = useRouter();
  function handleButtonClick(id: any) {
    toast.loading("Please Wait", {
      duration: 1000,
      position: "top-center",
    });
    router.push(`/actors/${id}`);
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <>
      {loading ? (
        <LoadingCard />
      ) : (
        <div>
          <div className="grid grid-flow-row gap-4 py-6 grid-cols-1 sm:grid-cols-2 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                    isFooterBlurred
                    onClick={() => handleButtonClick(movie.id)}
                    className="w-full h-full relative cursor-pointer col-span-12 sm:col-span-5"
                  >
                    <div className="z-50 absolute right-0 top-0 ">
                      <FavButton slug={movie.id} type="actor" className=" rounded-none rounded-bl-md" title={movie.name} date={movie.known_for_department} imgUrl={`${movie.profile_path == null
                        ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                        : `https://image.tmdb.org/t/p/original${movie.profile_path}`
                        }`} />
                    </div>

                    <CardHeader className="absolute z-40 top-1 flex items-start justify-between">
                      <div>
                        <p className="text-tiny text-start text-white/60 uppercase font-bold">{movie.known_for_department}</p>
                        <h4 className="text-white  text-start font-semibold text-tiny">{movie.name}</h4>
                      </div>
                    </CardHeader>
                    <div className="absolute w-full h-full bg-gradient-to-b from-black/10 to-black/40 hover:bg-none z-10"></div>

                    <Image
                      alt={movie.title}
                      draggable={false}
                      radius="none"
                      loading="lazy"

                      isZoomed
                      className="z-0 w-full h-full  object-cover "
                      src={`${movie.profile_path == null
                        ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                        : `https://image.tmdb.org/t/p/original${movie.profile_path}`
                        }`}
                    />
                    <CardFooter className="z-20 items-center justify-center before:bg-white/10 border-white/20 border-1  py-4 absolute before:rounded-xl rounded-large bottom-2 w-[calc(100%_-_8px)] shadow-small ml-1 ">
                      <p className="text-sm text-center font-semibold text-white/80">{movie.original_name}</p>

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
            <Button startContent={<GoMoveToTop />} onClick={scrollToTop} >Scroll to Top</Button>
          </div>
        </div>
      )}
    </>
  );
}
