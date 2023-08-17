import "./rightbar.scss";
import photo from "../../assets/register-background-pic.jpg";

function RightBar(props) {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img src={photo} alt="User Avatar" />
              <span>Jay Chow</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={photo} alt="User Avatar" />
              <span>Jay Chow</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src={photo} alt="User Avatar" />
              <p>
                <span>Jay Chow</span> Created a new post
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={photo} alt="User Avatar" />
              <p>
                <span>Jay Chow</span> Created a new post
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src={photo} alt="User Avatar" />
              <div className="online" />
              <span>Jay Chow</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={photo} alt="User Avatar" />
              <div className="online" />
              <span>Jay Chow</span>
            </div>
          </div><div className="user">
            <div className="userInfo">
              <img src={photo} alt="User Avatar" />
              <div className="online" />
              <span>Jay Chow</span>
            </div>
          </div><div className="user">
            <div className="userInfo">
              <img src={photo} alt="User Avatar" />
              <div className="online" />
              <span>Jay Chow</span>
            </div>
          </div><div className="user">
            <div className="userInfo">
              <img src={photo} alt="User Avatar" />
              <div className="online" />
              <span>Jay Chow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
