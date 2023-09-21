import "./post.scss";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comments from "../comments/Comments";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

function Post({ post }) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  const [commentOpen, setCommentOpen] = useState(false);

  const [liked, setLiked] = useState(false);

  const {
    isLoading,
    error,
    data: user,
  } = useQuery(["user", post.userId], () =>
    makeRequest.get(`/users/${post.userId}`).then((res) => {
      return res.data;
    })
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const handleClick = () => {
    setLiked(!liked);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link
              to={`/profile/${user.userName}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={user.profilePic} alt="avatar" />
            </Link>
            <div className="details">
              <Link
                to={`/profile/${user.userName}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{user.userName}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>

          <MoreHorizIcon />
        </div>
        <div className="content">
          {/* Post content */}
          <p>{post.desc}</p>
          {/* Post Images */}
          <img src={`${PF}${post.img}`} alt="" />
          {/* Tags  */}
          {post.tags &&
            post.tags.map((tag, i) => (
              <p className="tags" key={i}>
                #{tag}
              </p>
            ))}
        </div>
        <div className="info">
          <div className="item" onClick={handleClick}>
            {liked ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
}

export default Post;
