import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { BASE_URL } from "../Library/api";

export default function Post() {
  const { postId } = useParams();
  const { posts } = useOutletContext();
  const [content, setContent] = useState("");

  const post = posts.filter((p) => p._id === postId)[0];
  // console.log(post);

  async function postMessage(event) {
    const localToken = localStorage.getItem("token");
    event.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/posts/${post._id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localToken}`,
        },
        body: JSON.stringify({
          message: {
            content: content,
          },
        }),
      });
      const result = await response.json();
      // return result;
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {}, []);

  if (post === undefined) {
    return <div></div>;
  }
  return (
    <>
      <h1>{post.title}</h1>
      <h3> {post.description} </h3>

      <div>
        <form onSubmit={postMessage}>
          <label>Send Message </label>
          <input
            onChange={(event) => setContent(event.target.value)}
            value={content}
          />
          <button>Send</button>
        </form>
      </div>
    </>
  );
}
