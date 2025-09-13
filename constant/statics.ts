const baseURL = "https://moviescafe.vercel.app";
const TMDB_API_URL = "https://api.themoviedb.org/3";
const cardNotFoundImage =
  "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1755126920/IMAGE_NOT_FOUND_zlpppn.png";

const NotFoundUserImage =
  "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713493679/sqlpxs561zd9oretxkki.jpg";
const chipsMoviesData = [
  { title: "All Movies", url: "/movies" },
  { title: "Popular", url: "/movies/popular" },
  { title: "Top Rated", url: "/movies/top-rated" },
  { title: "Upcoming", url: "/movies/upcoming" },
  { title: "Now Playing", url: "/movies/now-playing" },
  { title: "Trending", url: "/movies/trending" },
];

const chipsTvShows = [
  { title: "All TV Shows", url: "/tv-shows" },
  { title: "Airing Today", url: "/tv-shows/airing-today" },
  { title: "On The Air", url: "/tv-shows/on-the-air" },
  { title: "Popular", url: "/tv-shows/popular" },
  { title: "Top Rated", url: "/tv-shows/top-rated" },
];

const allowedImageTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
];

export {
  baseURL,
  TMDB_API_URL,
  chipsMoviesData,
  allowedImageTypes,
  cardNotFoundImage,
  NotFoundUserImage,
  chipsTvShows,
};
