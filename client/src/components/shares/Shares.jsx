import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./share.scss";
import { Link } from "react-router-dom";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import TagIcon from "@mui/icons-material/Tag";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

function Shares(props) {
  const { currentUser } = useContext(AuthContext);
  const { register, handleSubmit, setValue } = useForm();
  const [file, setFile] = useState(null);

  const queryClient = useQueryClient();

  const upload = async (formData) => {
    try {
      const res = await makeRequest.post("/upload", formData);
      console.log('upload response', res);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const createPost = async (data) => {
    const formData = new FormData();
    formData.append("file", file);

    // Upload the file if it exists
    let imgUrl = "";
    if (file) {
      imgUrl = await upload(formData);
      console.log('imgUrl', imgUrl);
    }

    // Create the post
    const newPost = {
      userId: currentUser._id,
      desc: data.desc,
      img: imgUrl,
    };
    console.log('newPost',newPost);
    const response = await makeRequest.post("/post", newPost);
    console.log('post success', response.data);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch posts query
      queryClient.invalidateQueries(["posts"]);
      // Reset the form and file input
      setValue("desc", "");
      setFile(null);
    },
  });

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (data) => {
    mutation.mutate(data);
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
                  // multiple
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
              <button type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Shares;
