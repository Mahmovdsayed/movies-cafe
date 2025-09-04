"use client";
import { motion } from "framer-motion";

export const dynamic = "force-static";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-x-hidden">

      {/* Navbar */}
      <motion.nav
        className="sticky top-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="text-2xl font-bold tracking-tight flex items-center gap-2">
            🎥 <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Movies Cafe</span>
          </a>
          <div className="hidden md:flex gap-8 text-gray-300">
            {["Explore", "Community", "About"].map((link) => (
              <a key={link} href={`/${link.toLowerCase()}`} className="hover:text-white transition">
                {link}
              </a>
            ))}
          </div>
          <div className="flex gap-4">
            <a className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">Login</a>
            <a className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition shadow-lg shadow-purple-500/30">Sign Up</a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient">
            Your Movie Social Universe
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Follow friends, discover hidden gems, and dive into cinematic conversations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition">Explore Now</a>
            <a className="px-8 py-3 bg-purple-600 font-semibold rounded-full hover:bg-purple-500 transition shadow-lg shadow-purple-500/40">Join the Community</a>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-6 py-20 max-w-7xl mx-auto">
        {[
          { title: "🎬 Discover Movies", desc: "Trending, classics, and hidden gems with rich TMDb data." },
          { title: "💬 Social Interaction", desc: "Like, comment, follow — your cinematic circle awaits." },
          { title: "📊 Personalized Feed", desc: "Curated content just for you." },
        ].map((f, i) => (
          <motion.div
            key={f.title}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-white/10 hover:border-purple-500 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Trending Movies */}
      <section className="py-20 px-6 bg-black/40 backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center mb-10">🔥 Trending This Week</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {["Inception", "Interstellar", "Oppenheimer", "The Batman", "Dune"].map((movie) => (
            <motion.div
              key={movie}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-white/10 hover:border-purple-500 transition"
            >
              <div className="h-48 bg-gray-700 flex items-center justify-center text-gray-500 text-sm">Poster</div>
              <div className="p-4">
                <h3 className="font-semibold">{movie}</h3>
                <p className="text-xs text-gray-400">Action • Sci-Fi</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Movies Cafe Today</h2>
        <p className="mb-6 text-white/90">Start your cinematic journey now.</p>
        <a className="px-8 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition">Get Started</a>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 text-gray-400 text-sm py-8 text-center mt-auto border-t border-white/10">
        <p>© {year} Movies Cafe. All rights reserved.</p>
        <div className="mt-3 flex justify-center gap-4">
          <a className="hover:text-white transition">Privacy Policy</a>
          <a className="hover:text-white transition">Terms</a>
          <a className="hover:text-white transition">Contact</a>
        </div>
      </footer>
    </div>
  );
}
