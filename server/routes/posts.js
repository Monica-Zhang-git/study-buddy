import express from "express";
import jwt from "jsonwebtoken";
import { Post } from "../db/post-schema.js";
import { User } from "../db/user-schema.js";

const router = express.Router();

// CREATE A POST
router.post("/", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

  const userInfo = await verifyToken(token);

  const newPost = new Post({
    userInfos: userInfo.userId,
    desc: req.body.desc,
    img: req.body.img,
    tags: req.body.tags,
  });

  try {
    const Post = await newPost.save();
    res.status(200).json(Post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE A POST
router.delete("/:id", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

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
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

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

// GET POSTS BY USERID
router.get("/", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const userInfo = await verifyToken(token);
  const currentUserId = userInfo.userId;

  const profileUserId = req.query.userId;

  try {
    let posts;

    // If profileUserId is exist, get profile posts
    if (profileUserId !== "undefined") {
      posts = await Post.find({ userInfos: profileUserId }).populate({
        path: "userInfos",
        select: "userName profilePic",
      });
    }
    // Otherwise, to get community posts
    else {
      const currentUser = await User.findById(currentUserId);
      const followingIds = currentUser.followings;
      posts = await Post.find({
        userInfos: { $in: [currentUser._id, ...followingIds] },
      })
        .populate({
          path: "userInfos",
          select: "userName profilePic",
        })
        .sort({ createdAt: -1 });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) {
        reject(err);
      } else {
        resolve(userInfo);
      }
    });
  });
}

// Like or Dislike a Post
router.put("/:id/like", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const userInfo = await verifyToken(token);
  const currentUserId = userInfo.userId;

  const post = await Post.findById(req.params.id);

  try {
    if (!post.likes.includes(currentUserId)) {
      await post.updateOne({ $push: { likes: currentUserId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: currentUserId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
