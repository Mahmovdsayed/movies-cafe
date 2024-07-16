"use client";
interface Iprops {}

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
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { UserIcon } from "@/icons/UserIcon";
import { changeDateFormat } from "@/functions/changeDateFormat";
import { Metadata } from "next";
import { useParams } from "next/navigation";
import LoadingScreen from "@/Components/layout/LoadingScreen";

const Videos = ({}: Iprops) => {
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
  const [REC, setREC] = useState<any>([]);
  const [links, setLinks] = useState<any>([]);
 
  const watchProviders = `https://api.themoviedb.org/3/tv/${slug}/videos?language=en-US`;
  function handleCardClick(id: any) {
    toast.loading("Please Wait", {
      duration: 1500,
      position: "top-center",
    });
    router.push(`${id}`);
  }

  const getStaticProps = async () => {
    setLoading(true);

  const watchData = await fetch(watchProviders, options);
    const dataWatchProviders = await watchData.json();
    setWatch(dataWatchProviders.results);

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
          <div className="hidden">
        </div>
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
          <div className="container  mx-auto px-4">
             <Chip
               className={`${watch == 0 ? "hidden" : "my-4"} `}
               size="md"
               color="danger"
               variant="dot"
             >
               Videos
             </Chip>
             <div className="container mx-auto">
               <div className="flex overflow-x-scroll scrollbar-hide space-x-4 my-6">
                 {watch.map((dataWatch: any) => (
                   <div key={dataWatch.id}>
                     <Card shadow="sm" className="w-[320px]" isPressable>
                       <CardBody className="overflow-hidden p-0 aspect-video">
                         <ReactPlayer
                           url={`https://www.youtube.com/watch?v=${dataWatch.key}`}
                           controls
                           width="640"
                           light
                         />
                       </CardBody>
                     </Card>
                   </div>
                 ))}
               </div>
             </div>
           </div>
        </motion.div>
      )}
    </>
  );
};

export default Videos;
