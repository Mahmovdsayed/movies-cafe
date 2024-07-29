"use client";
interface Iprops { }

import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaLink } from "react-icons/fa6";
import ShareOnSocial from "react-share-on-social";
import ReactPlayer from "react-player";
import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { TbRating18Plus } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

import Box from "@mui/material/Box";
import {
  Chip,
  Modal,
  ModalContent,
  ScrollShadow,
  Image,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
  Breadcrumbs,
  BreadcrumbItem,
  Link,
  Card,
  CardBody,
  Skeleton,
  CardFooter,
  CardHeader,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { UserIcon } from "@/icons/UserIcon";
import { changeDateFormat } from "@/functions/changeDateFormat";
import { Metadata } from "next";
import { useParams } from "next/navigation";
import Modall from "../UI/Modal";
import LoadingScreen from "../layout/LoadingScreen";
import Recommendations from "./movies/Recommendations";
import Videos from "./movies/Videos";
import Images from "./movies/Images";
import FavButton from "../utils/FavButton";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

const MovieDetails = ({ }: Iprops) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    });
  }, []);
  const router = useRouter();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWRlNmIzNDM5MDI2ZjdlOGRlMzEzMzBkYmRmM2VlOSIsInN1YiI6IjY1M2RmY2I0MTA5Y2QwMDBlYWUzY2JiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VcxBDxU_aw-KTBH7nzMcQUb7y95PtOm6AdhklQyTwcE`,
    },
  };
  const { slug } = useParams();
  const [mox, setmox] = useState<any>([]);
  const [watch, setWatch] = useState<any>([]);
  const [actors, setActors] = useState<any>([]);
  const [test, setTEST] = useState<any>([]);
  const [reviews, setreviews] = useState<any>([]);
  const [image, setImage] = useState<any>([]);
  const [Prod, setProd] = useState<any>([]);
  const [REC, setREC] = useState<any>([]);
  const [links, setLinks] = useState<any>([]);
  const linksUrl = `https://api.themoviedb.org/3/movie/${slug}/external_ids`;
  const url = `https://api.themoviedb.org/3/movie/${slug}?language=en-US`;
  const actor = `https://api.themoviedb.org/3/movie/${slug}/credits?language=en-US`;
  const rev = `https://api.themoviedb.org/3/movie/${slug}/reviews?language=en-US&page=1`;
  const handleButtonClick = () => {
    toast("Working on it!\nComing Soon", {
      icon: "🎬",
    });
  };
  function handleCardClick(id: any) {
    toast.loading("Please Wait", {
      duration: 1500,
      position: "top-center",
    });
    router.push(`${id}`);
  }

  const getStaticProps = async () => {
    setLoading(true);

    const res = await fetch(url, options);
    const link = await fetch(linksUrl, options);
    const review = await fetch(rev, options);
    const revie = await review.json();
    const data = await res.json();
    const dataLinks = await link.json();
    const actorData = await fetch(actor, options);
    console.log(data)
    const ActorRes = await actorData.json();
    setProd(data.production_companies)
    setreviews(revie.results);
    setLinks(dataLinks);
    setmox(data);
    setActors(ActorRes.cast);
    setLoading(false);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };
  useEffect(() => {
    getStaticProps();
  }, []);

  return (
    <>
      {loading == true ? (
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
          <div className="my-6 ms-2 flex items-center justify-center">
            <Breadcrumbs size="sm" radius="sm" variant={"solid"}>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href="/movies">Movies</BreadcrumbItem>
              <BreadcrumbItem className="whitespace-nowrap overflow-hidden overflow-ellipsis">
                {mox.title}
              </BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <div className=" min-h-full  overflow-hidden relative pb-6 md:pb-12">
            <div className=" z-0">
              <div>
                <ScrollShadow
                  hideScrollBar
                  visibility="bottom"
                  size={250}
                  className="overflow-hidden"
                >
                  <Image
                    className={`${mox.backdrop_path == null
                      ? "md:h-[600px]"
                      : "w-screen sm:h-[400px] lg:h-[600px] rounded-t-[45px] md:rounded-t-none object-contain object-center"
                      } `}
                    radius="lg"
                    src={`${mox.backdrop_path == null
                      ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/gccpgmp6z5z6mljukeql.svg"
                      : `https://image.tmdb.org/t/p/original${mox.backdrop_path}`
                      }`}
                    alt={mox.original_name}
                  />
                </ScrollShadow>
              </div>
            </div>
            <div className="z-10 absolute top-2/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center justify-center">
                <Image
                  draggable={false}
                  className="w-[125px] md:w-[150px]  object-cover "
                  alt={mox.original_name}
                  src={`${mox.poster_path == null
                    ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                    : `https://image.tmdb.org/t/p/original${mox.poster_path}`
                    }`}
                />
              </div>
            </div>

            <div className="mx-2 flex flex-col items-center mt-32 md:mt-36 justify-center text-center">
              <h1 className="font-bold text-4xl md:text-6xl uppercase">{mox.title}</h1>
              <span className=" font-medium mt-3">{mox.tagline}</span>
              <Chip
                size="sm"
                radius="sm"
                color="danger"
                className={`${mox.release_date ? null : "hidden"} my-2`}
                variant="flat"
                startContent={<MdOutlineTipsAndUpdates />}
              >
                <span className={`font-bold `}>
                  {mox.release_date}
                </span>
              </Chip>
              {/* <div className="flex items-center justify-center space-x-2">
                {Prod.map((pro: any) =>
                  <Tooltip color="danger" size="sm" radius="sm" content={pro.name} key={pro.id}>
                    <Card className="w-full bg-gray-200 dark:bg-[#181818]" shadow="none" isPressable>
                      <CardBody className="p-1">
                        <Image className=" object-contain object-center w-12 h-12 dark:invert " src={`https://image.tmdb.org/t/p/original${pro.logo_path}`} alt={pro.name} />
                      </CardBody>
                    </Card>
                  </Tooltip>

                )}
              </div> */}
              <div className=" space-x-2 m-2 flex justify-center items-center">
                <Button
                  href={`https://www.facebook.com/${links.facebook_id}`}
                  className={`${links.facebook_id ? null : "hidden"}`}
                  size="sm"
                  radius="sm"
                  variant="flat"
                  isIconOnly
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
                  isIconOnly
                  variant="flat"
                  as={Link}
                  color="default"
                >
                  <FaInstagram />
                </Button>
                <Button
                  href={`https://twitter.com/${links.twitter_id}`}
                  className={`${links.twitter_id ? null : "hidden"}`}
                  size="sm"
                  variant="flat"
                  radius="sm"
                  isIconOnly
                  as={Link}
                  color="default"
                >
                  <FaXTwitter />
                </Button>
              </div>
             
              <div
                className={`${mox.overview ? null : "hidden"
                  } flex justify-center items-center `}
              >
                <Card
                  shadow="none"
                  radius="sm"
                  className="mt-3 mx-4 md:w-3/4 lg:w-2/4 bg-gray-200 dark:bg-[#18181B] "
                >
                  <CardHeader>
                    <h3 className="font-bold">Movie Overview</h3>
                  </CardHeader>
                  <CardBody>
                    <p className="text-sm">{mox.overview}</p>
                  </CardBody>
                </Card>
              </div>

              <div className="flex justify-center space-x-2 mt-3 items-center">
                <FavButton slug={mox.id} type="movie" className={''} title={mox.title} date={mox.release_date} imgUrl={`${mox.poster_path == null
                  ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                  : `https://image.tmdb.org/t/p/original${mox.backdrop_path}`
                  }`} />
                <Button
                  radius="sm"
                  as={Link}
                  variant="flat"
                  href={mox.homepage}
                  className={`${mox.homepage === "" ? "hidden" : ""}`}
                  showAnchorIcon
                  color="danger"
                >
                  Watch Now
                </Button>
              </div>

              {/* <div>
                <ShareOnSocial
                  textToShare={`${mox.title}\n`}
                  link={window.location.href}
                  linkTitle={mox.title}
                  linkMetaDesc={mox.overview}
                  linkFavicon={
                    "https://res.cloudinary.com/dtpsyi5am/image/upload/v1704774066/hssa9xvzvuqb5zl1o0cs.svg"
                  }
                  noReferer
                >
                  <Button
                    as={Link}
                    color="default"
                    variant="shadow"
                    showAnchorIcon
                    size="sm"
                    className="mt-6"
                  >
                    Share with your Friend
                  </Button>
                </ShareOnSocial>
              </div> */}
            </div>
          </div>

          <div className="container  mx-auto px-4">
            <Chip
              className={`${actors == 0 ? "hidden" : "my-4"} `}
              size="md"
              color="danger"
              variant="dot"
            >
              Actors
            </Chip>
            <div className="container mx-auto">
              <div className="flex overflow-x-scroll scrollbar-hide space-x-4 my-6">
                {actors.map((actor: any) => (
                  <div key={actor.id}>
                    <Card
                      onClick={() => handleCardClick(`/actors/${actor.id}`)}
                      shadow="sm"
                      className="w-[250px] relative"
                      key={actor.id}
                      isPressable
                    >
                      <div className="z-20 absolute right-0 top-0 ">
                        <FavButton slug={actor.id} type="actor" className=" rounded-none rounded-bl-md" title={actor.name} date={actor.character} imgUrl={`${actor.profile_path == null
                          ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                          : `https://image.tmdb.org/t/p/original${actor.profile_path}`
                          }`} />
                      </div>
                      <CardBody className="overflow-hidden p-0">
                        <Image
                          shadow="sm"
                          radius="none"
                          width="100%"
                          src={`${actor.profile_path == null
                            ? "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713290436/hgm3qerrugol5rycsvjn.svg"
                            : `https://image.tmdb.org/t/p/original${actor.profile_path}`
                            }`}
                          alt={actor.name}
                          className="w-full object-cover h-[350px]"
                        />
                      </CardBody>
                      <CardFooter className="text-small bg-gray-200 dark:bg-[#181818] flex flex-col justify-between">
                        <b>{actor.name}</b>
                        <p className="text-default-500">{actor.character}</p>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Videos />
          <Images />
          <Recommendations />
        </motion.div>)}
    </>
  );
};

export default MovieDetails;
