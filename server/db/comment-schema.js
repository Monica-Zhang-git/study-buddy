import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    userName: {
      type: String,
    },
    userId: {
      type: String,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export { Comment };
