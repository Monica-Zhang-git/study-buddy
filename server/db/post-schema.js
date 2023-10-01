import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userInfos: {
      type: String,
      required: true,
      ref: "User",
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    tags: {
      type: String,
      default: "",
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export { Post };
