import "./post.scss";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import MorePopper from "../morePopper/morePopper";
import Button from "@mui/material/Button";

function Post({ post }) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const { currentUser } = useContext(AuthContext);

  const [liked, setLiked] = useState(post.likes.includes(currentUser._id));
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const [commentOpen, setCommentOpen] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.comments.length);

  // Open the more button
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleMoreOpen = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setMoreOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleClick = async () => {
    try {
      await makeRequest.put(`/post/${post._id}/like`);
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link
              to={`/profile/${post.userInfos._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={post.userInfos.profilePic} alt="avatar" />
            </Link>
            <div className="details">
              <Link
                to={`/profile/${post.userInfos.userName}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.userInfos.userName}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>

          <MorePopper
            moreOpen={moreOpen}
            anchorEl={anchorEl}
            placement={placement}
          />
          <Button onClick={handleMoreOpen("bottom-start")} className="more">
            <MoreHorizIcon />
          </Button>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          {post.img ? <img src={`${PF}${post.img}`} alt="" /> : null}
          {post.tags ? <p className="tags">#{post.tags}</p> : null}
        </div>
        <div className="info">
          <div className="item">
            {liked ? (
              <FavoriteIcon style={{ color: "red" }} onClick={handleClick} />
            ) : (
              <FavoriteBorderIcon onClick={handleClick} />
            )}
            {likesCount} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentsCount} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && (
          <Comments
            postId={post._id}
            onCommentSubmitted={() => {
              setCommentsCount(commentsCount + 1);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Post;
