import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import { useState, useEffect } from "react";
import { BASE_URL } from "./Library/api";

export default function Root() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  // const [isDeleted, setIsDeleted] = useState(false);

  // console.log(localStorage);

  async function getPosts() {
    try {
      const response = await fetch(`${BASE_URL}/posts`);

      const info = await response.json();
      setPosts(info.data.posts);
      console.log(info);
      console.log(posts);
      return info;
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localToken}`,
          },
        });
        const result = await response.json();
        if (result.success) {
          setUser(result.data);
        }
      }
    }
    fetchUser();
  }, [token]);

  const myProfile = async () => {
    const localToken = localStorage.getItem("token");
    console.log(localStorage);
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localToken}`,
        },
      });
      const data = await response.json();
      setUser(data);
      console.log(result);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    myProfile;
  }, []);

  return (
    <div>
      <Navbar
        user={user}
        setUser={setUser}
        setToken={setToken}
        setPosts={setPosts}
        posts={posts}
      />
      <Outlet context={{ posts, setPosts, setToken, user }} />
    </div>
  );
}
