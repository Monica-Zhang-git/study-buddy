import express from "express";
import { User } from "../db/user-schema.js";
import { Comment } from "../db/comment-schema.js";
import { Post } from "../db/post-schema.js";
import jwt from "jsonwebtoken";

const router = express.Router();

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

//Add a comment
router.post("/", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  const userInfo = await verifyToken(token); // Get user information from the token
  const currentUserId = userInfo.userId; // Get the current user's ID from the token

  try {
    const currentUser = await User.findById(currentUserId); //Find the current user
    const post = await Post.findById(req.body.postId);

    // Create a new comment
    const newComment = new Comment({
      desc: req.body.desc,
      userId: currentUserId,
      userName: currentUser.userName,
      postId: req.body.postId,
      profilePic: currentUser.profilePic,
    });
    //Save the new comment
    const comment = await newComment.save();
    // Update the post to include the new comment
    await post.updateOne({ $push: { comments: comment } });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get comments
router.get("/:id", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
  });

  const postId = req.params.id; //Get the post id from the request params

  try {
    const comments = await Comment.find({ postId: postId }); // Find the comments ralated to the post
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete a comment
router.delete("/:id", async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  const userInfo = await verifyToken(token); // Get user information from the token
  const currentUserId = userInfo.userId; // Get the current user's ID from the token
  const commentId = req.params.id; // Get the comment ID from the request parameters

  try {
    //Find the comment
    const comment = await Comment.findById(commentId);

    // Check if the comment exists
    if (!comment) {
      return res.status(404).json("Comment not found.");
    }

    // Ensure the user is the owner of the comment
    if (comment.userId === currentUserId) {
      //Find and delete the comment
      await Comment.findByIdAndDelete(commentId);
      res.status(200).json("The comment has been deleted");
    } else {
      return res.status(403).json("You can only delete your own comment.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
