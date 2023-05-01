import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  function handleLogout() {
    console.log("logging out");
    localStorage.removeItem("token");
    setToken("");
    setUser({});
  }
  return (
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/posts"}>Posts</Link>
      <Link to={"/profile"}>Profile</Link>
      {user._id && (
        <>
          <span>Welcome {user.username} </span>
          <Link onClick={handleLogout} to={"/"}>
            Logout
          </Link>
        </>
      )}

      {!user._id && (
        <>
          <Link to={"/register"}>Register</Link>
          <Link to={"/login"}>Login</Link>
        </>
      )}
    </div>
  );
}
