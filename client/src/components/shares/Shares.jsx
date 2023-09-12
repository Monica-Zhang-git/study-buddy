import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss";
import { Link } from "react-router-dom";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import TagIcon from '@mui/icons-material/Tag';

function Shares(props) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="share">
      <div className="container">
        {/* UserInfo */}
        <Link to={`/profile/${currentUser.userName}`} style={{textDecoration: "none", color: "inherit"}}>
          <div className="userInfo">
            <img src={currentUser.profilePic} alt="avatar" />
            <span className="name">{currentUser.userName}</span>
          </div>
        </Link>
        {/* Input Content  */}
        <div className="content">
          <input
            type="text"
            placeholder={`What's on your mind, undefined?`}
          />
        </div>
        <hr />
        {/* Add attachment  */}
        <div className="attachment">
          <div className="left">
            <div className="item">
              <input type="file" id="file" />
              <label htmlFor="file">
                <InsertPhotoIcon />
                <span htmlFor="file">Add File</span>
              </label>
            </div>
            {/* Add Course Tags or Skills Tags */}
            <div className="item">
              <input type="file" id="file" />
              <label htmlFor="file">
                <TagIcon />
                <span htmlFor="file">Add Tags</span>
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
