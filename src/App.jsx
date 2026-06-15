import "./App.css";
import AllPost from "./features/blog-public/allPost";
import { Link } from "react-router";
import { jwtDecode } from "jwt-decode";

function App() {
  const token = localStorage.getItem("token");
  let username = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.username;
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }
  return (
    <>
      <h2>Madhav's Blog</h2>
      <nav>
        <Link to={`/${username}`}>My Profile</Link>
      </nav>
      {username === null ? (
        <>
          <h3>Welcome!</h3>
        </>
      ) : (
        <>
          <h3>Welcome, {username}!</h3>
        </>
      )}
      <AllPost />
    </>
  );
}

export default App;
