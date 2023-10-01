import "./profile.scss";
import Posts from "../../components/posts/Posts";
import RightBar from "../../components/rightbar/RightBar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function Profile() {
  const userId = useParams().userId;
  const { currentUser } = useContext(AuthContext);

  //Get profile user infos.
  const {
    isLoading,
    error,
    data: user,
  } = useQuery(["user"], () =>
    makeRequest.get(`/users/${userId}`).then((res) => {
      return res.data;
    })
  );

  //Get profile user followers.
  const { isLoading: followerLoading, data: followers } = useQuery(
    ["followers"],
    () =>
      makeRequest.get(`/connection/${userId}/followers`).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return makeRequest.put(`/connection/${user._id}/follow`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["followers"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate();
  };

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="profile">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
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
                      <div className="count">{followers.length}</div>
                      <span>Followers</span>
                    </div>
                  </div>
                  {userId === currentUser._id ? (
                    <></>
                  ) : (
                    <div className="connect">
                      {followerLoading ? (
                        "Loading..."
                      ) : followers.includes(currentUser._id) ? (
                        <button className="message" onClick={handleFollow}>
                          Following
                        </button>
                      ) : (
                        <button className="follow" onClick={handleFollow}>
                          Follow
                        </button>
                      )}

                      <button className="message">Message</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="highlight">
              <span>Highlights</span>
              <div className="highlightContainer">
                <div className="courses">
                  <div className="title">Courses</div>
                  <div className="items">
                    {user.courses.map((course) => (
                      <div className="item">{course}</div>
                    ))}
                  </div>
                </div>
                <div className="skills">
                  <div className="title">Skills</div>
                  <div className="items">
                    {user.skills.map((skill) => (
                      <div className="item">{skill}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Posts userId={user._id} />
          </div>
          <RightBar />
        </>
      )}
    </div>
  );
}

export default Profile;
