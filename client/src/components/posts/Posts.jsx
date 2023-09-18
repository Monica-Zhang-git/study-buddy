import "./posts.scss";
import Post from "../post/Post";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import {useQuery} from "@tanstack/react-query";

function Posts({ username }) {
  const { currentUser } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(["Posts", username, currentUser.userId], async () => {
    const res = username
      ? // Get Profile Post
        await makeRequest.get(`/post/${username}`)
      : // Get Community Post
        await makeRequest.get(`/post/${currentUser._id}`);

    return res.data;
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="posts">
      {posts && posts.map((post) => <Post post={post} key={post._id} />)}
    </div>
  );
}

export default Posts;
