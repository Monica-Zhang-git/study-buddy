import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";

function Stories(props) {
  const { currentUser } = useContext(AuthContext);
  // Dummy data
  const stories = [
    {
      id: 1,
      name: "Monica",
      img: "https://images.pexels.com/photos/5342978/pexels-photo-5342978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      name: "Renee",
      img: "https://images.pexels.com/photos/5342976/pexels-photo-5342976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      name: "Tyne",
      img: "https://images.pexels.com/photos/7250790/pexels-photo-7250790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      name: "Andrew",
      img: "https://images.pexels.com/photos/5342977/pexels-photo-5342977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => (
        <div className="story" key={story.id}>
            <img src={story.img} alt="" />
            <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Stories;
