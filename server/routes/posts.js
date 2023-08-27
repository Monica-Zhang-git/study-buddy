import express from "express";
import { Post } from "../db/post-schema.js";
import { User } from "../db/user-schema.js";

const router = express.Router();

// CREATE A POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const Post = await newPost.save();
    res.status(200).json(Post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Delete A POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted.");
    } else {
      return res.status(403).json("You can only delete your own post.");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Update A POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated.");
    } else {
      return res.status(403).json("You can only update your own post.");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get ALL POST
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.query.userId);
    const followingIds = currentUser.followings;
    const posts = await Post.find({
      userId: { $in: [currentUser._id, ...followingIds] },
    }).sort({ createdAt: -1 });

    res.status(200).json(posts);
    console.log('posts', posts);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get A POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
