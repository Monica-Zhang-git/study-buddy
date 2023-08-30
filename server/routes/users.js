import express from "express";
import { User } from "../db/user-schema.js";
import bcrypt from "bcrypt";

const router = express.Router();

// GET A USER BY USERNAME OR USERID
router.get("/:identifier", async (req, res) => {
  try {
    const identifier = req.params.identifier;

    let user;
    if (identifier.length === 24) {
      user = await User.findById(identifier);
    } else {
      user = await User.findOne({ userName: identifier });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        //generate hashedpassword
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

export default router;
