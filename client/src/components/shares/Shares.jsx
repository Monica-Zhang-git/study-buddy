import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss";
import { Link } from "react-router-dom";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import TagIcon from "@mui/icons-material/Tag";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

function Shares(props) {
  const { currentUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const createPost = async (data) => {
    const newPost = {
      userId: currentUser._id,
      desc: data.desc,
    };
    const response = await makeRequest.post("/post", newPost);
    return response.data;
  };

  const { mutate } = useMutation({
    mutationFn: createPost,
  }
  );

  const handleFileUpload = (e) => {
    const files = e.target.files;
  };

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="share">
      <div className="container">
        {/* UserInfo */}
        <Link
          to={`/profile/${currentUser.userName}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="userInfo">
            <img src={currentUser.profilePic} alt="avatar" />
            <span className="name">{currentUser.userName}</span>
          </div>
        </Link>
        {/* Post content and file, add tags*/}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Add content */}
          <div className="content">
            <input
              {...register("desc")}
              type="text"
              placeholder={`What's on your mind, undefined?`}
            />
          </div>
          <hr />
          <div className="attachment">
            {/* Add study attachments */}
            <div className="left">
              <div className="item">
                <input
                  type="file"
                  id="file"
                  onChange={handleFileUpload}
                  multiple
                />
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
        </form>
      </div>
    </div>
  );
}

export default Shares;
