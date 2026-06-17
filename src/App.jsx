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
    <div className="appShell">
      <header className="siteHeader">
        <Link className="siteBrand" to="/">
          Madhav&apos;s Blog
        </Link>
        <nav className="siteNav" aria-label="Primary navigation">
          {username === null ? (
            <Link className="navLink navAction" to="/login">
              Login
            </Link>
          ) : (
            <>
              <span className="welcomeText">Welcome, {username}</span>
              <Link className="navLink navAction" to={`/${username}`}>
                My Profile
              </Link>
            </>
          )}
        </nav>
      </header>
      <AllPost />
    </div>
  );
}

export default App;
