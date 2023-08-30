import "./posts.scss";
import Post from "../post/Post";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";

function Posts({ username }) {
  const { currentUser } = useContext(AuthContext);

  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(["Posts", username, currentUser.userId], async () => {
    const res = username
      ? await makeRequest.get(`/post/profile/${username}`)
      : await makeRequest.get(`/post/community/${currentUser.userId}`);

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
