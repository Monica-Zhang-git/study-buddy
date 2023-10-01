import "./share.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import TagIcon from "@mui/icons-material/Tag";
import SimpleDialog from "../tags/Tag";

function Shares() {
  const { currentUser } = useContext(AuthContext); //Get currentUser's infos.

  const [desc, setDesc] = useState(""); // Initialize the content to an empty string.
  const [file, setFile] = useState(null); // Initialize the uploaded file to null.
  const [open, setOpen] = useState(false); // Set the Add Tags feature status to closed by default.
  const [selectedTags, setSelectedTags] = useState(null); // Initialize selectedTags to null.

  // Function to open the tags dialog.
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Function to close the tags dialog and set the selectedTags.
  const handleClose = (value) => {
    setOpen(false);
    setSelectedTags(value);
  };

  // Function to upload a file using FormData.
  const upload = async (formData) => {
    try {
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  // Function to create a new post.
  const createPost = async () => {
    const formData = new FormData();
    formData.append("file", file);
    let fileUrl = "";
    if (file) {
      fileUrl = await upload(formData);
    }
    // Create a new post with description, tags, and file.
    const newPost = {
      desc: desc,
      tags: selectedTags,
      img: fileUrl,
    }; //Create a newPost based the content, tags, file
    const response = await makeRequest.post("/post", newPost);
    return response.data;
  };

  const queryClient = useQueryClient();

  // UseMutation for creating a post with success callback to invalidate queries and reset state.
  const mutation = useMutation(createPost, {
    onSuccess: async () => {
      queryClient.invalidateQueries(["Posts"]);
      setDesc("");
      setFile(null);
      setSelectedTags("");
    },
  });

  // Function to handle the post creation process.
  const handlePost = async () => {
    mutation.mutate();
  };

  return (
    <div className="share">
      <div className="container">
        <Link
          to={`/profile/${currentUser._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="userInfo">
            <img src={currentUser.profilePic} alt="avatar" />
            <span className="name">{currentUser.userName}</span>
          </div>
        </Link>
        <div className="content">
          <input
            type="text"
            value={desc}
            placeholder={`What's on your mind, undefined?`}
            onChange={(e) => setDesc(e.target.value)}
          />
          {selectedTags ? (
            <span className="selectedTag">#{selectedTags}</span>
          ) : null}
        </div>
        <hr />
        <div className="attachment">
          <div className="left">
            <div className="item">
              <div className="tag">
                <br />
                <input type="button" id="tags" onClick={handleClickOpen} />
                <label htmlFor="tags">
                  <TagIcon />
                  <span htmlFor="tags">Add Tags</span>
                </label>
                <SimpleDialog
                  selectedTags={selectedTags}
                  open={open}
                  onClose={handleClose}
                />
              </div>
            </div>
            <div className="item">
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="file">
                <InsertPhotoIcon />
                <span htmlFor="file">Add File</span>
              </label>
            </div>
          </div>
          <div className="right">
            <button onClick={handlePost}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shares;
