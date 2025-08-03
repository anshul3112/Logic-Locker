import mongoose, { Schema } from "mongoose";

const snippetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
    },
    //link to the User model
    ownerId : {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, 
    },
  },
  {
    timestamps: true,
  }
);

export const Snippet = mongoose.model("Snippet", snippetSchema);