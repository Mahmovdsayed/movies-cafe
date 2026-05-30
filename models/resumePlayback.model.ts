import { Schema, model, models } from "mongoose";

const resumePlaybackSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    movieID: { type: String, required: true },
    type: { type: String, enum: ["movie", "tv"], required: true },
    episodeID: { type: String, default: null },
    seasonNumber: { type: Number, default: null },
    currentTime: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    progress: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
    lastResumedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);

const ResumePlayback = models.ResumePlayback || model("ResumePlayback", resumePlaybackSchema);
export default ResumePlayback;
