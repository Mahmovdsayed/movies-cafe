import { Schema, model, models } from "mongoose";
import ImageSchema from "./image.model";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: ImageSchema,
    about: { type: String, trim: true },
    birthday: { type: Date, trim: true },
    country: { type: String, trim: true },
    gender: { type: String, enum: ["male", "female", null], default: null },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
    aiCounter: { type: Number, default: 0, max: 3, min: 0 },
    aiContent: [{ content: { type: String, trim: true } }],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Favorites",
        index: true,
      },
    ],

    watchlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Watchlist",
        trim: true,
        index: true,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const User = models.User || model("User", userSchema);

export default User;
