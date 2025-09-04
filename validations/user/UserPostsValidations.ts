import * as yup from "yup";

const userPostsSchemaValidation = yup.object().shape({
  movieID: yup.string().required(),
  movieTitle: yup.string().required(),
  moviePoster: yup.string().nullable(),
  movieReleaseDate: yup.string().nullable(),
  movieBanner: yup.string().nullable(),
  movieType: yup.string().oneOf(["movie", "tv"]).required(),
  movieOverview: yup.string().nullable(),

  type: yup.string().oneOf(["post", "repost"]).required(),
  title: yup.string().required(),
  description: yup.string().required(),
});

export default userPostsSchemaValidation;
