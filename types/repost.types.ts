import { AvatarType } from "./avatar.types";

type Repost = {
  _id: string;
  userID: {
    _id: string;
    name: string;
    userName: string;
    avatar: AvatarType;
    isVerified: boolean;
  };
  movieID: string;
  movieTitle: string;
  movieBanner: string;
  moviePoster: string;
  movieOverview: string;
  movieReleaseDate: string;
  movieType: "movie" | "tv";
  type: "repost";
  likes: [];
  comments: [];
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { Repost };
