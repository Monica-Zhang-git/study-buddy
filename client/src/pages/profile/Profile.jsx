import "./profile.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";

function Profile(props) {
  return (
    <div className="profile">
      <div className="images">
        <img
          src={
            "https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          alt=""
          className="cover"
        />
        <img
          src={
            "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600"
          }
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <span>CS732</span>
            <span>CS751</span>
            <span>CS762</span>
            <span>CS701</span>
          </div>
          <div className="center">
            <span>Jenny Chen</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>New Zealand</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>Mandarin</span>
              </div>
            </div>
            {/* Toggle Unfollow, if currentUser has follow the user. */}
            <button>Follow</button>
          </div>
          <div className="right">
            <MessageOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
}

export default Profile;
