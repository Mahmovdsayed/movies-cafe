"use client";
import { Image, Divider, Link, Button, CardFooter } from "@nextui-org/react";
import { MdVerified } from "react-icons/md";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaLink } from "react-icons/fa6";
import ShareOnSocial from "react-share-on-social";
import { FaBirthdayCake } from "react-icons/fa";
import { FaGenderless } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaDownload } from "react-icons/fa6";
import { motion } from "framer-motion";

import { FaUser } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { IoTvSharp, IoSearchSharp } from "react-icons/io5";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Breadcrumbs,
  BreadcrumbItem,
  CardHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PiUsersFourDuotone } from "react-icons/pi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { actorGender } from "@/functions/actorGender";
import LoadingScreen from "../layout/LoadingScreen";
import Modall from "../UI/Modal";
import FavButton from "../utils/FavButton";
interface IProps { }
const ActorDetails = ({ }: IProps) => {
  const router = useRouter();

  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    });
  }, []);
  const [actor, setActor] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [links, setLinks] = useState<any>([]);
  const [movies, setMovies] = useState<any>([]);
  const [tv, setTv] = useState<any>([]);

  const [language, setlanguage] = useState("en-US");
  const url = `https://api.themoviedb.org/3/person/${slug}?language=${language}`;
  const linksUrl = `https://api.themoviedb.org/3/person/${slug}/external_ids`;
  const moviesURL = `https://api.themoviedb.org/3/person/${slug}/movie_credits?language=${language}`;
  const TvURL = `https://api.themoviedb.org/3/person/${slug}/tv_credits?language=${language}`;
  const options = {
    method: "GET",

    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWRlNmIzNDM5MDI2ZjdlOGRlMzEzMzBkYmRmM2VlOSIsInN1YiI6IjY1M2RmY2I0MTA5Y2QwMDBlYWUzY2JiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VcxBDxU_aw-KTBH7nzMcQUb7y95PtOm6AdhklQyTwcE`,
    },
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };
  const getStaticProps = async () => {
    setLoading(true);
    const link = await fetch(linksUrl, options);
    const dataLinks = await link.json();
    const res = await fetch(url, options);
    const moviesActor = await fetch(moviesURL, options);
    const actorMo = await moviesActor.json();
    const tvActor = await fetch(TvURL, options);
    const tvs = await tvActor.json();
    const data = await res.json();
    setTv(tvs.cast);
    setMovies(actorMo.cast);
    setLinks(dataLinks);
    setActor(data);
    setLoading(false);
  };

  useEffect(() => {
    getStaticProps();
  }, [currentPage, language]);
  function handleCardClick(id: any) {
    toast.loading("Please Wait", {
      duration: 1500,
      position: "top-center",
    });
    router.push(`${id}`);
  }
  const downloadImage = () => {
    // Replace 'imageURL' with the actual URL of your image
    const imageURL = actor.profile_path == null
      ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
      : `https://image.tmdb.org/t/p/original${actor.profile_path}`;
    // Create an anchor element
    const anchor = document.createElement('a');
    // Set the href attribute to the image URL
    anchor.href = imageURL;
    // Set the download attribute to prompt the user to save the image
    anchor.download = 'image.jpg';
    // Programmatically trigger a click event on the anchor element
    anchor.click();
  };
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
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
          <div className="container mx-auto px-6 min-h-screen  mt-6 ">
            <div className="my-6">
              <Breadcrumbs size="sm" radius="full" variant={"solid"}>
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbItem href="/actors">Actors</BreadcrumbItem>
                <BreadcrumbItem className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {actor.name}
                </BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <div className="relative w-full h-[150px] md:h-[200px] bg-gradient-to-r from-rose-100 to-teal-100 rounded-2xl">
              <div className="absolute text-black  text-center  left-[50%] top-[50%] font-bold uppercase text-sm md:text-3xl transform -translate-x-1/2 -translate-y-1/2">
                <h4>{actor.name}</h4>
                <span className="text-sm font-light">
                  {actor.known_for_department}
                </span>
              </div>
              <div className="w-[80px] h-[80px] md:w-[150px] md:h-[150px] rounded-full absolute z-20  bottom-[-70px] left-[60px] md:bottom-[-150px] md:left-[130px] transform -translate-x-1/2 -translate-y-1/2">
                <Image
                  isBlurred
                  alt="test"
                  onClick={() => handleOpen()}
                  className="w-[80px] h-[80px]  md:w-[150px] md:h-[150px] object-cover rounded-2xl"
                  src={`${actor.profile_path == null
                    ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                    : `https://image.tmdb.org/t/p/original${actor.profile_path}`
                    }`}
                />
                <Modal
                  placement="center"
                  backdrop={"blur"}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalContent className="bg-transparent shadow-none">
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">

                        </ModalHeader>
                        <ModalBody className="flex items-center justify-center">
                          <Image
                            src={`${actor.profile_path == null
                              ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                              : `https://image.tmdb.org/t/p/original${actor.profile_path}`
                              }`}
                            className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] object-cover rounded-full"
                          />
                        </ModalBody>

                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </div>
            <div className="mt-[50px] md:mt-[100px] ms-5 md:ms-12">
              <h1
                className={
                  actor.name == null
                    ? "hidden"
                    : "font-bold text-md md:text-2xl flex items-center "
                }
              >
                {actor.name}{" "}
                <span className="text-md md:text-2xl ms-1 md:ms-2 text-blue-700">
                  {" "}
                  <MdVerified />
                </span>
              </h1>

              <span
                className={
                  actor.popularity == null
                    ? "hidden"
                    : "flex items-center text-sm text-gray-700 dark:text-gray-400 mt-3 font-bold"
                }
              >
                <span className="me-1">
                  <PiUsersFourDuotone />
                </span>{" "}
                {actor.popularity} followers
              </span>
              <p
                className={
                  actor.gender == null
                    ? "hidden"
                    : "flex items-centerfont-normal text-sm md:text-md mt-3 text-gray-700 dark:text-gray-400"
                }
              >
                <span className="me-1">
                  <FaUser />
                </span>
                <span className="font-bold text-gray-700 dark:text-gray-400">
                  {" "}
                  {actorGender(actor.gender)}
                </span>
              </p>
              <p
                className={
                  actor.birthday == null
                    ? "hidden"
                    : "flex items-center font-normal text-sm md:text-md mt-3 text-gray-700 dark:text-gray-400"
                }
              >
                <span className="me-1">
                  <FaBirthdayCake />
                </span>
                <span className="font-bold text-gray-700 dark:text-gray-400">
                  {" "}
                  {actor.birthday}
                </span>
              </p>
              <p
                className={
                  actor.place_of_birth == null
                    ? "hidden"
                    : "flex items-center font-normal text-sm md:text-md mt-3 text-gray-700 dark:text-gray-400"
                }
              >
                <span className="me-1">
                  <FaLocationDot />
                </span>
                <span className="font-bold text-gray-700 dark:text-gray-400">
                  {" "}
                  {actor.place_of_birth}
                </span>
              </p>
              <div className=" space-x-1 my-2 flex justify-start items-center">
                <Button
                  href={`https://www.facebook.com/${links.facebook_id}`}
                  className={`${links.facebook_id ? null : "hidden"}`}
                  size="sm"
                  radius="sm"
                  as={Link}
                  color="default"
                >
                  <FaFacebookF />
                </Button>
                <Button
                  href={`https://www.instagram.com/${links.instagram_id}`}
                  className={`${links.instagram_id ? null : "hidden"}`}
                  size="sm"
                  radius="sm"
                  as={Link}
                  color="default"
                >
                  <FaInstagram />
                </Button>
                <Button
                  href={`https://twitter.com/${links.twitter_id}`}
                  className={`${links.twitter_id ? null : "hidden"}`}
                  size="sm"
                  radius="sm"
                  as={Link}
                  color="default"
                >
                  <FaXTwitter />
                </Button>
                <FavButton slug={actor.id} type="actor" className="" title={actor.name} imgUrl={`${actor.profile_path == null
                  ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                  : `https://image.tmdb.org/t/p/original${actor.profile_path}`
                  }`} date="" />
              </div>
              <p
                className={
                  actor.biography == null
                    ? "hidden"
                    : "my-3 dark:text-gray-300  text-sm md:text-base font-light"
                }
              >
                {actor.biography}
              </p>
            </div>
            <Divider className="my-4" />
            <div>
              <Tabs
                className="flex justify-center items-center flex-col"
                aria-label="Options"
                size="sm"
                color="danger"
              >
                <Tab
                  key="Movies"
                  className={movies.length == 0 ? 'hidden' : ''}
                  title={
                    <div className="flex items-center space-x-1">
                      <MdLocalMovies />
                      <span>Movies</span>
                    </div>
                  }
                >
                  <div className="container mx-auto">
                    <div className="flex overflow-x-scroll scrollbar-hide space-x-4 my-6">
                      {movies.map((reco: any) => (
                        <div key={reco.id}>
                          <Card
                            isFooterBlurred
                            onClick={() => handleCardClick(`/movies/${reco.id}`)}
                            shadow="sm"
                            className="w-[250px] relative"
                            isPressable
                          >
                            <div className="z-20 absolute right-0 top-0 ">
                              <FavButton slug={reco.id} type="movie" className=" rounded-none rounded-bl-md" title={reco.title} date={reco.release_date} imgUrl={`${reco.backdrop_path == null
                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                : `https://image.tmdb.org/t/p/original${reco.backdrop_path}`
                                }`} />
                            </div>
                            <Image
                              alt={reco.original_title}
                              draggable={false}
                              className="z-0 w-[300px] h-[400px] object-cover"
                              src={`${reco.poster_path == null
                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                : `https://image.tmdb.org/t/p/original${reco.poster_path}`
                                }`}
                            />
                            <CardFooter className="absolute  bottom-0 bg-gray-700/40 dark:bg-[#181818]/40 backdrop-blur-xl text-white flex-col items-start space-y-3">
                              <div className="text-start">
                                <p className="text-base font-semibold">{reco.original_title}</p>
                                <p className="text-tiny dark:text-white/60">
                                  {reco.release_date}
                                </p>
                              </div>
                              {/* <Button
                              as={Link}
                              className="text-tiny bg-gradient-to-r w-full from-blue-700 via-blue-800 to-gray-600 text-white"
                              href={`/movies/${reco.id}`}
                              radius="sm"
                              size="sm"
                            >
                              Explore
                            </Button> */}
                            </CardFooter>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab>

                <Tab
                  key="Tv Shows"
                  className={tv.length == 0 ? 'hidden' : ''}
                  title={
                    <div className="flex items-center space-x-1">
                      <IoTvSharp />

                      <span>TV Shows</span>
                    </div>
                  }
                >
                  <div className="container mx-auto">
                    <div className="flex overflow-x-scroll scrollbar-hide space-x-4 my-6">
                      {tv.map((reco: any) => (
                        <div key={reco.id}>
                          <Card
                            onClick={() => handleCardClick(`/tv/${reco.id}`)}
                            shadow="sm"
                            className="w-[250px] relative"
                            isPressable
                          >
                            <div className="z-20 absolute right-0 top-0 ">
                              <FavButton slug={reco.id} type="tv" className=" rounded-none rounded-bl-md" title={reco.original_name} date={reco.first_air_date} imgUrl={`${reco.backdrop_path == null
                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                : `https://image.tmdb.org/t/p/original${reco.backdrop_path}`
                                }`} />
                            </div>
                            <Image
                              alt={reco.original_name}
                              draggable={false}
                              className="z-0 w-[300px] h-[400px] object-cover"
                              src={`${reco.poster_path == null
                                ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                                : `https://image.tmdb.org/t/p/original${reco.poster_path}`
                                }`}
                            />
                            <CardFooter className="absolute  bottom-0 bg-gray-700/40 dark:bg-[#181818]/40 backdrop-blur-xl text-white flex-col items-start space-y-3">
                              <div className="text-start">
                                <p className="text-tiny">{reco.original_name}</p>
                                <p className="text-tiny dark:text-white/60">
                                  {reco.first_air_date}
                                </p>
                              </div>
                              {/* <Button
                              as={Link}
                              className="text-tiny bg-gradient-to-r w-full from-blue-700 via-blue-800 to-gray-600 text-white"
                              href={`/tv/${reco.id}`}
                              radius="sm"
                              size="sm"
                            >
                              Explore
                            </Button> */}
                            </CardFooter>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ActorDetails;
