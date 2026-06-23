import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/navbar";
import useAuth from "./config/useAuth";
import { useEffect } from "react";

function App() {
  const { setAccessToken } = useAuth();
  useEffect(() => {
    async function refresh() {
      try {
        const response = await fetch(
          "https://blog-backend-production-e9b5.up.railway.app/api/auth/refresh",
          {
            method: "POST",
            credentials: "include",
          },
        );

        if (!response.ok) return;

        const data = await response.json();
        setAccessToken(data.accessToken);
      } catch (err) {
        console.error(err);
      }
    }

    refresh();
  }, []);
  return (
    <div className="appShell">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
