import * as yup from "yup";

const userFavoritesSchema = yup.object().shape({
  movieID: yup.string().required(),
  movieTitle: yup.string().required(),
  moviePoster: yup.string().nullable(),
  movieReleaseDate: yup.string().nullable(),
  movieBanner: yup.string().nullable(),
  type: yup.string().oneOf(["movie", "tv"]).required(),
  movieOverview: yup.string().nullable(),
});

export default userFavoritesSchema;
