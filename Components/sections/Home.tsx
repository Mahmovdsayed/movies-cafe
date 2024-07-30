"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useRouter } from "next/navigation";
import { Button, Card, CardBody, CardHeader, Divider, Link } from "@nextui-org/react";
import Popular from "./home/Popular";
import PopularTV from "./home/PopularTV";
import Reviews from "./home/Reviews";

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
  return <>
    <div className="text-center md:py-10 mt-3 ">
      <div className="px-4">
        <h1 className="text-4xl md:text-6xl font-bold  uppercase mt-6">Explore the World of Movies & TV Shows</h1>
        <p className="text-sm md:text-xl text-default-500 tracking-tight mt-3">Dive into a vast database featuring details about films, actors, ratings, and more</p>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <Card shadow="sm">
              <CardHeader className="font-semibold text-lg">Details about movies and actors</CardHeader >
              <CardBody className="text-sm md:text-medium font-medium">Get comprehensive information about your favorite movies and actors. Discover biographies, filmographies, and ratings for each movie and actor.</CardBody>
            </Card>
            <Card shadow="sm">
              <CardHeader className="font-semibold  text-lg">Save your favorite movies</CardHeader>
              <CardBody className="text-sm md:text-medium font-medium">Save the movies and TV shows you love so you can easily revisit them anytime and always keep track of the ones that matter to you.</CardBody>
            </Card>
            <Card shadow="sm">
              <CardHeader className="font-semibold  text-lg">Enjoy a unique cinematic experience</CardHeader>
              <CardBody className="text-sm md:text-medium font-medium">Immerse yourself in a unique and effortless cinematic experience with our user-friendly interface and extensive database of movie details.</CardBody>
            </Card>
          </div>
        </div>
        <Divider className="my-4" />
        <div>
          <h2 className="text-4xl  font-semibold ">Trending Movies</h2>
          <p className="text-tiny my-2 md:text-xl text-default-500">Discover the movies that are trending right now. Stay updated with what's hot in the cinema world and find your next favorite film.</p>
          <Link color="danger" showAnchorIcon href="/movies">Show more</Link>
          <Popular />
        </div>
        <Divider className="my-4" />
        <div>
          <h2 className="text-4xl  font-semibold ">Trending TV Shows</h2>
          <p className="text-tiny my-2 md:text-xl text-default-500">Explore the TV shows that everyone is talking about. Keep up with the latest trends in television and binge-watch the top-rated series.</p>
          <Link color="danger" showAnchorIcon href="/tv">Show more</Link>
          <PopularTV />
        </div>
        <Divider className="my-4" />
        <div>
          <h2 className="text-4xl  font-semibold ">User Reviews</h2>
          <p className="text-tiny my-2 md:text-xl text-default-500">See what our users are saying about their experience with Movies Cafe. Read genuine reviews and testimonials from fellow movie enthusiasts.</p>
          <Link color="danger" className="mb-3" showAnchorIcon href="/register">Signup now</Link>
          <Reviews />
        </div>
      </div>
    </div>
  </>
}
