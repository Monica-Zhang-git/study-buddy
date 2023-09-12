import express from "express";
import { User } from "../db/user-schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  //generate hashedpassword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("User not found");
    }
    // Valid hashedpassword
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json("Wrong Password or username");
    }
    // After successfully finding the user and validating the password
    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "secretkey", {
      expiresIn: "30d", 
    });
    // Remove the password 
    const { password, ...others} = user._doc;
    // Save the token into localStorage and send the data and token to client
    res.cookie("accessToken", token, {httpOnly: true}).status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
