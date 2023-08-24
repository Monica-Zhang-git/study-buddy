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

// GET ALL CONNECTIONS
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const connections = user.followers;
    res.status(200).json(useconnectionsr);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
