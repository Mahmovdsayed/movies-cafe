import { AvatarType } from "./avatar.types";

type Profile = {
  _id: string;
  email: string;
  name: string;
  userName: string;
  avatar: AvatarType;
  about: string;
  country: string;
  gender: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  birthday: string;
  links: {
    facebook: string;
    twitter: string;
    instagram: string;
    snapchat: string;
    tiktok: string;
  };
};

export type { Profile };
