import { Genres } from "@/static/genres";

export const getGenres = (ids?: number[] | null): string => {
  if (!ids || ids.length === 0) {
    return "";
  }

  return ids
    .map((id) => Genres.find((genre) => genre.id === id)?.name || "")
    .filter(Boolean)
    .join(", ");
};
