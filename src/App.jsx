import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/navbar";
import useAuth from "./config/useAuth";

function App() {
  const { username, accessToken, setAccessToken } = useAuth();
  return (
    <div className="appShell">
      <Navbar
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        username={username}
      />
      <Outlet context={{ accessToken, username }} />
    </div>
  );
}

export default App;
