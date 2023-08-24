import express from "express";
import { User } from "../db/user-schema.js";
import bcrypt from "bcrypt";

const router = express.Router();

// FOLLOW A USER
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("User has been followed");
      }else{
        res.status(403).json("You have already followed the user.")
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You cannot follow yourself.");
  }
});


// UNFOLLOW A USER
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("User has been unfollowed");
        }else{
          res.status(403).json("You should follow the user firstly.")
        }
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      return res.status(403).json("You cannot unfollow yourself.");
    }
  });


// GET ALL FOLLOWERS
router.get("/:id/followers", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const followers = user.followers;
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL FOLLOWINGS
router.get("/:id/followings", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const followings = user.followings;
      res.status(200).json(followings);
    } catch (error) {
      res.status(500).json(error);
    }
  });


export default router;
