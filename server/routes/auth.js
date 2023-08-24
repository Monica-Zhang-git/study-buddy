import express from "express";
import { User } from "../db/user-schema.js"; // Use the correct relative path here
import bcrypt from "bcrypt";
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
    res.status(200).json(user);
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
    // valid hashedpassword
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json("Wrong Password");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
