"use client";
import UpcomingMovies from "@/components/sections/UpcomingMovies";
import TrendingMovies from "@/components/sections/TrendingMovies";
import PopularTVShows from "@/components/sections/PopularTVShows";
import TopRatedMovies from "@/components/sections/TopRatedMovies";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import StatsSection from "@/components/sections/StatsSection";
import { Button, Link } from "@heroui/react";
import { motion } from "framer-motion";
import { FaPlay, FaUserPlus, FaStar, FaFilm } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative flex flex-col items-center text-center px-6 py-16 md:py-24 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-50 dark:from-default-100 dark:via-default-50 dark:to-default-100 opacity-50" />

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 text-primary-300 dark:text-primary-200"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaFilm size={40} className="opacity-20" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 text-secondary-300 dark:text-secondary-200"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FaStar size={50} className="opacity-20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 mb-6"
          >
            <FaStar className="text-primary-500" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              #1 Movie Discovery Platform
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
              Movies Cafe
            </span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl">
              AI-Powered Movies & TV Hub
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base md:text-lg text-default-600 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Discover your next favorite movie with AI-powered recommendations.
            Connect with fellow movie lovers, save your favorites, and explore
            a world of cinema in English or Arabic.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              as={Link}
              href="/movies"
              color="primary"
              size="lg"
              className="px-8 py-6 text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
              startContent={<FaPlay />}
            >
              Explore Now
            </Button>
            <Button
              as={Link}
              href="/auth/signup"
              variant="bordered"
              size="lg"
              className="px-8 py-6 text-base font-semibold rounded-full border-2 hover:bg-default-100 transition-all"
              startContent={<FaUserPlus />}
            >
              Join Free
            </Button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-8 mt-12 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-default-600">500K+ Movies & Shows</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-default-600">10K+ Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-default-600">AI-Powered</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Trending Movies */}
      <section className="py-10 px-6">
        <TrendingMovies />
      </section>

      {/* Popular TV Shows */}
      <section className="py-10 px-6 bg-default-50/50">
        <PopularTVShows />
      </section>

      {/* Top Rated Movies */}
      <section className="py-10 px-6">
        <TopRatedMovies />
      </section>

      {/* Upcoming Movies */}
      <section className="py-10 px-6 bg-default-50/50">
        <UpcomingMovies />
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Final CTA */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 dark:from-primary-700 dark:via-secondary-700 dark:to-primary-700" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Cinematic Journey?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Join thousands of movie enthusiasts and discover your next favorite film today.
          </p>
          <Button
            as={Link}
            href="/auth/signup"
            size="lg"
            className="bg-white text-primary-600 font-semibold px-8 py-6 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            endContent={<FaUserPlus />}
          >
            Get Started Free
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
