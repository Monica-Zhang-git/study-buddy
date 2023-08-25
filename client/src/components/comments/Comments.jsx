import "./comments.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function Comments(props) {
  const { currentUser } = useContext(AuthContext);
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Monica",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/1313254/pexels-photo-1313254.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jenny",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/16943679/pexels-photo-16943679/free-photo-of-ranti-marsyanda-chandri-anggara.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];
  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
}

export default Comments;
