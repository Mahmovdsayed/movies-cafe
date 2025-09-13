"use client";
import UpcomingMovies from "@/components/sections/UpcomingMovies";
import { Button, Link } from "@heroui/react";
import { motion } from "framer-motion";


export default function Home() {

  return (
    <div className=" min-h-screen flex flex-col overflow-x-hidden">
      <section className="relative flex flex-col items-center text-start md:text-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Movies Cafe | AI-Powered Movies & TV Hub
          </h1>

          <p className="mt-6 text-sm md:text-lg  text-default-600  max-w-3xl mx-auto leading-relaxed">
            Discover Movies Cafe, your ultimate hub for movies and TV shows. Explore detailed information about films and series, interact with AI in English or Arabic, and enjoy social features like reposting, commenting, liking, and sharing. Create your account to save favorites, add to watch later, and personalize your experience with custom themes. Stay connected with seamless search, profile customization, and effortless sharing with friends.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
            <Button as={Link} href="/movies" showAnchorIcon color="primary" className="px-6 sm:px-8 py-3 text-sm sm:text-base w-full
            md:w-auto rounded-full">
              Explore Now
            </Button>
            <Button as={Link} href="/auth/signup" showAnchorIcon className="px-6 sm:px-8 py-3 text-sm sm:text-base w-full
            md:w-auto rounded-full">
              Join the Community
            </Button>
          </div>
        </motion.div>
      </section>


      <section className="py-20 px-6">
        <UpcomingMovies />
      </section>


      <section className="bg-gradient-to-r from-blue-700  to-pink-600 py-10 text-center">
        <h2 className="text-2xl text-white font-semibold mb-4">Join Movies Cafe Today</h2>
        <p className="mb-6 text-white font-medium text-sm">Start your cinematic journey now.</p>
        <Button
          as={Link}
          href="/auth/signup"
          className="text-black font-semibold bg-white"
          radius="full"
          showAnchorIcon
        >
          Get Started
        </Button>
      </section>

    </div>
  );
}
