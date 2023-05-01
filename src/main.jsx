import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./root";
import Welcome from "./components/welcome";
import Posts from "./components/posts";
import Profile from "./components/profile";
import Login from "./components/login";
import Register from "./components/register";
import Post from "./components/post";
import NewPost from "./components/newpost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Welcome /> },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/posts/:postId",
        element: <Post />,
      },
      {
        path: "/newpost",
        element: <NewPost />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
