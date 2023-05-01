import React, { useState } from "react";
import { BASE_URL } from "../Library/api";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setToken } = useOutletContext();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    if (!result.success) {
      setError(result.error.message);
      return;
    }

    setToken(result.data.token);
    localStorage.setItem("token", result.data.token);
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">username:</label>
      <input
        type="username"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}
