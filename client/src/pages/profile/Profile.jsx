import "./profile.scss";
import Posts from "../../components/posts/Posts";
import RightBar from "../../components/rightbar/RightBar";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { useParams } from "react-router-dom";

function Profile(props) {
  const username = useParams().username;

  const {
    isLoading,
    error,
    data: user,
  } = useQuery(["user"], () =>
    makeRequest.get(`/users/${username}`).then((res) => {
      return res.data;
    })
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="profile">
      <div className="left">
        <div className="profileContainer">
          <div className="images">
            <img src={user.cover} alt="" className="cover" />
            <img src={user.profilePic} alt="" className="profilePic" />
          </div>
          <div className="uInfo">
            <div className="uInfoLeft">
              <div className="userName">{user.userName}</div>
              <div className="userDesc">{user.desc}</div>
              <div className="major">{user.major}</div>
            </div>
            <div className="uInfoRight">
              <div className="items">
                <div className="item">
                  <div className="count">{user.followings.length}</div>
                  <span>Followings</span>
                </div>
                <div className="item">
                  <div className="count">{user.followers.length}</div>
                  <span>Followers</span>
                </div>
                <div className="item">
                  <div className="count">102</div>
                  <span>Posts</span>
                </div>
              </div>
              <div className="connect">
                <button className="follow">Follow</button>
                <button className="message">Message</button>
              </div>
            </div>
          </div>
        </div>
        <div className="highlight">
          <span>Highlights</span>
          <div className="highlightContainer">
            <div className="courses">
              <div className="title">Courses</div>
              <div className="items">
                <div className="item">COMPSC 732</div>
                <div className="item">COMPSC 751</div>
                <div className="item">COMPSC 762</div>
                <div className="item">COMPSC 752</div>
                <div className="item">COMPSC 704</div>
                <div className="item">COMPSC 704</div>
                <div className="item">COMPSC 704</div>
                <div className="item">COMPSC 704</div>
              </div>
            </div>
            <div className="skills">
              <div className="title">Skills</div>
              <div className="items">
                <div className="item">JavaScript</div>
                <div className="item">Python</div>
                <div className="item">TypeScript</div>
                <div className="item">MongoDB</div>
                <div className="item">JavaScript</div>
                <div className="item">JavaScript</div>
                <div className="item">JavaScript</div>
              </div>
            </div>
          </div>
        </div>
        <Posts username={username} />
      </div>
      <RightBar />
    </div>
  );
}

export default Profile;
