import "../App.css";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import checkUser from "../config/checkUser";

export default function Navbar({ accessToken, setAccessToken }) {
  const navigate = useNavigate();
  const username = checkUser(accessToken);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://blog-backend-production-e9b5.up.railway.app/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Invalid request");
      }
      alert("Logged out successful!");
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setAccessToken(null);
    }
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
