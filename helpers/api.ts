import { TMDB_API_URL } from "@/constant/statics";
import axios from "axios";

export const tmdbApi = axios.create({
  baseURL: TMDB_API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
});
