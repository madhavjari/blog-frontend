import "../App.css";
import { Link } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  let username = null;
  const navigate = useNavigate();
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.username;
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/");
  };
  return (
    <>
      <header className="siteHeader">
        <Link className="siteBrand" to="/">
          Madhav&apos;s Blog
        </Link>
        <nav className="siteNav" aria-label="Primary navigation">
          {username === null ? (
            <>
              <Link className="navLink navAction" to="/login">
                Login
              </Link>
              <Link className="navLink navAction" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="welcomeText">Welcome, {username}</span>
              <Link className="navLink navAction" to={`/${username}`}>
                My Profile
              </Link>
              <Link className="navLink navAction" onClick={handleLogout}>
                Log out
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
