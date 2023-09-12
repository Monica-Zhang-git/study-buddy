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

// GET PROFILE POST OR COMMUNITY POST BASED ON IF USERNAME EXISTED
router.get("/:identifier", async (req, res) => {
  try {
    const identifier = req.params.identifier;
    console.log("identifier", identifier);

    let posts;
    // GET COMMUNITY POST
    if (identifier.length === 24) {
      const currentUser = await User.findById(identifier);
      const followingIds = currentUser.followings;
      posts = await Post.find({
        userId: { $in: [currentUser._id, ...followingIds] },
      }).sort({ createdAt: -1 });
    }
    // GET PROFILE POST
    else {
      const user = await User.findOne({ userName: identifier });
      posts = await Post.find({ userId: user._id });
    }

    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }

    res.status(200).json(posts); 
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
