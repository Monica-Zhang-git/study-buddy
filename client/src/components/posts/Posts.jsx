import "./posts.scss";
import Post from "../post/Post";
import { useQuery } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";

function Posts(userId) {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data: posts } = useQuery(["posts"], () =>
    makeRequest.get("/post?userId=" + currentUser.userId).then((res) => {
      return res.data;
    })
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
}

export default Posts;
