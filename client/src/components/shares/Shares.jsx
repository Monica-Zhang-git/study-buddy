import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss";
import { Link } from "react-router-dom";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideocamIcon from "@mui/icons-material/Videocam";

function Shares(props) {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="share">
      <div className="container">
        <Link to={`/profile/${currentUser.userId}`} style={{textDecoration: "none", color: "inherit"}}>
          <div className="userInfo">
            <img src={currentUser.profilePic} alt="avatar" />
            <span className="name">{currentUser.name}</span>
          </div>
        </Link>
        <div className="content">
          <input
            type="text"
            placeholder={`What's on your mind, ${currentUser.name}?`}
          />
        </div>
        <hr />
        <div className="attachment">
          <div className="left">
            <div className="item">
              <input type="file" id="file" />
              <label htmlFor="file">
                <InsertPhotoIcon />
                <span htmlFor="file">Add photo</span>
              </label>
            </div>
            <div className="item">
              <input type="file" id="file" />
              <label htmlFor="file">
                <VideocamIcon />
                <span htmlFor="file">Add video</span>
              </label>
            </div>
          </div>
          <div className="right">
            <button>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shares;
