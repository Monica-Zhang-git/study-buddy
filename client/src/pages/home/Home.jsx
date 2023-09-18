import "./home.scss";
import Posts from "../../components/posts/Posts";
import Shares from "../../components/shares/Shares";
import RightBar from "../../components/rightbar/RightBar";
import LeftBar from "../../components/leftbar/LeftBar";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function home(props) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="home">
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div className="center">
          {/* <Stories /> */}
          {/* <ShareTest /> */}
          <Shares />
          <Posts />
        </div>
        <RightBar />
      </div>
    </div>
  );
}

export default home;
