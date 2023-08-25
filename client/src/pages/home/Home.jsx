import "./home.scss";
import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Shares from "../../components/shares/Shares";

function home(props) {
  return (
    <div className="home">
      <Stories />
      <Shares />
      <Posts />
    </div>
  );
}

export default home;
