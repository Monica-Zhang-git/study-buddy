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

// DELETE A POST
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

// UPDATE A POST
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

// Update this router later to get post based on username if existed

// GET All POSTS
router.get("/community/:id", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const followingIds = currentUser.followings;
    const posts = await Post.find({
      userId: { $in: [currentUser._id, ...followingIds] },
    }).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// GET PROFILE POST
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.username });
    // console.log('user',user);
    const post = await Post.find({ userId: user._id });
    // console.log('post',post);
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
