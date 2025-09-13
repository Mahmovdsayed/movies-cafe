type aiContentTypes = {
  content: string;
  createdAt: string;
  updatedAt: string;
  userID: string;
  _id: string;
  movieInfo: {
    movieBanner: string;
    movieID: string;
    movieOverview: string;
    moviePoster: string;
    movieReleaseDate: string;
    movieTitle: string;
    movieType: "movie" | "tv";
  };
};

export type { aiContentTypes };
