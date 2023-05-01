import { Link, useOutletContext, useParams } from "react-router-dom";
import React, { useState } from "react";

export default function Posts() {
  const { posts, user } = useOutletContext();
  // console.log(posts);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(posts);
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      {user._id && (
        <Link to="/newpost">
          <button>Make a post!</button>
        </Link>
      )}

      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredPosts.map((post) => {
        return (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <h4>{post.description}</h4>
            <h4>{post.price}</h4>
            <Link to={`/posts/${post._id}`}>
              <button>Send Message</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
