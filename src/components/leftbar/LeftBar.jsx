import "./leftbar.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import GroupIcon from "@mui/icons-material/Group";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function LeftBar(props) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <PersonOutlinedIcon />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <GroupIcon />
            <span>Groups</span>
          </div>
          <div className="item">
            <TextSnippetIcon />
            <span>Notes</span>
          </div>
          <div className="item">
            <AddToDriveIcon />
            <span>Resources</span>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default LeftBar;
