import "./comments.scss";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

function Comments({ postId, onCommentSubmitted }) {
  const [desc, setDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { currentUser } = useContext(AuthContext);

  const { isLoading, data: comments } = useQuery(
    ["comments", postId],
    async () => {
      const res = await makeRequest.get(`/comment/${postId}`);
      return res.data;
    }
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post(`/comment`, newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments"]);
        onCommentSubmitted();
      },
    }
  );

  const handleComment = async (e) => {
    e.preventDefault();
    if (!desc) {
      setErrorMessage("Please write a comment firstly.");
      return;
    }
    setErrorMessage("");

    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleComment}>send</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {isLoading
        ? "Loading..."
        : comments &&
          comments.map((comment) => (
            <div className="comment">
              <img src={comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.userName}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
}

export default Comments;
