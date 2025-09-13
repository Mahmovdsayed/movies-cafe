import * as yup from "yup";

const userPostsSchemaValidation = yup.object().shape({
  movieID: yup.string().nullable(),
  movieTitle: yup.string().nullable(),
  moviePoster: yup.string().nullable(),
  movieReleaseDate: yup.string().nullable(),
  movieBanner: yup.string().nullable(),
  movieType: yup.string().oneOf(["movie", "tv"]).nullable(),
  movieOverview: yup.string().nullable(),

  type: yup.string().oneOf(["post", "repost"]).required(),
  content: yup.string().required(),
});

export default userPostsSchemaValidation;
