import "./posts.scss";
import Post from "../post/Post";

function Posts(props) {
  const posts = [
    {
      id: 1,
      name: "Renee",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      name: "Monica",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/1313254/pexels-photo-1313254.jpeg?auto=compress&cs=tinysrgb&w=800",
      desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
    },
  ];
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}

export default Posts;
