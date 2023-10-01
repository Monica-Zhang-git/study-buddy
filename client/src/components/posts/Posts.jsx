import "./posts.scss";
import Post from "../post/Post";
import { makeRequest } from "../../axios";
import { useQuery } from "@tanstack/react-query";

function Posts({ userId }) {
  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(["Posts", userId], async () => {
    const res = await makeRequest.get("/post?userId=" + userId);
    return res.data;
  });

  return (
    <div className="posts">
      {error
        ? "An error has occurred: " + error.message
        : isLoading
        ? "Loading...."
        : posts.map((post) => <Post post={post} key={post._id} />)}
    </div>
  );
}

export default Posts;
