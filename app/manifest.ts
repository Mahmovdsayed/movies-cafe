import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Movies Cafe",
    short_name: "Movies Cafe",
    description:
      "Explore the world of movies and TV shows in a new light with our website powered by TMDb API. Dive into a vast database featuring details about films, actors, ratings, and more. Browse, save your favorite movies, and stay updated with the latest cinematic news. Immerse yourself in the seventh art effortlessly and enjoy a unique cinematic experience through our site!",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#181818",
    icons: [
      {
        src: "https://res.cloudinary.com/dtpsyi5am/image/upload/v1711907810/bigdtyvks39yutgcmffr.svg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://res.cloudinary.com/dtpsyi5am/image/upload/v1711907810/bigdtyvks39yutgcmffr.svg",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "https://res.cloudinary.com/dtpsyi5am/image/upload/v1711907810/bigdtyvks39yutgcmffr.svg",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "https://res.cloudinary.com/dtpsyi5am/image/upload/v1711907810/bigdtyvks39yutgcmffr.svg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
