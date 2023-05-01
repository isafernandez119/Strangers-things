import { useOutletContext } from "react-router-dom";
import { BASE_URL } from "../Library/api";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user, post, posts } = useOutletContext();
  const [isDeleted, setIsDeleted] = useState(false);

  const deletePost = async (id) => {
    // event.preventDefault();
    const localToken = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localToken}`,
        },
      });
      const result = await response.json();
      console.log(result);

      if (result.success) {
        window.location.reload();
      } else {
        console.log(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {}, []);

  const activePosts = user.posts
    ? user.posts.filter((obj) => obj.active === true)
    : [];

  const deletedPosts = user.posts
    ? user.posts.filter((obj) => obj.active === false)
    : [];

  console.log(activePosts, "AP");

  return (
    <div>
      <h2>{user.username}'s Profile</h2>
      <p>Posts:</p>
      <ul>
        {activePosts &&
          activePosts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <button onClick={() => deletePost(post._id)}>Delete Post</button>
            </li>
          ))}
      </ul>
      <p>Messages:</p>
      <ul>
        {user.messages &&
          user.messages.map((message) => (
            <li key={message._id}>
              <h3>Regarding {message.post.title}</h3>
              <p>{message.content}</p>
            </li>
          ))}
      </ul>
      <p>Deleted Posts:</p>
      <ul>
        {deletedPosts &&
          deletedPosts.map((post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
