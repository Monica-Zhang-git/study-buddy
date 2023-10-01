import express from "express";
import { User } from "../db/user-schema.js";
import { Post } from "../db/post-schema.js";

const router = express.Router();

// GET USER'S PROFILE

router.get("/users/:id", async (req, res) => {
  try {
    // Get the users' infos
    const user = await User.findById(req.params.id);
    const { password, updatedAt, createdAt, ...profile } = user._doc;
    //   Get the users' posts
    const posts = await Post.find({userId: user._id});

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
