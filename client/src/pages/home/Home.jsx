import "./home.scss";
import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Shares from "../../components/shares/Shares";
import RightBar from "../../components/rightbar/RightBar";
import LeftBar from "../../components/leftbar/LeftBar";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

function home(props) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="home">
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div className="center">
          {/* <Stories /> */}
          <Shares />
          <Posts />
        </div>
        <RightBar />
      </div>
    </div>
  );
}

export default home;
