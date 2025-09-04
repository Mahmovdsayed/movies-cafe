import { Schema } from "mongoose";

const ImageSchema = new Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: false },
  },
  { timestamps: true }
);

export default ImageSchema;
