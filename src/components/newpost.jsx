import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { BASE_URL } from "../Library/api";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const { posts, setPosts } = useOutletContext();
  const Navigate = useNavigate();

  async function makePost(event) {
    event.preventDefault();
    try {
      const localToken = localStorage.getItem("token");
      console.log(title, description, price);
      const response = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localToken}`,
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            willDeliver: true,
          },
        }),
      });
      const data = await response.json();
      console.log(data);
      console.log();
      setPosts([...posts, data.data.post]);

      Navigate("/posts");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {}, []);

  return (
    <div>
      <h1>New Post</h1>
      <form onSubmit={makePost}>
        <label>Title</label>
        <input
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />

        <label>Description</label>
        <input
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />

        <label>Price</label>
        <input
          onChange={(event) => setPrice(event.target.value)}
          value={price}
        />
        <button>New Post</button>
      </form>
    </div>
  );
}
