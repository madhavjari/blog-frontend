import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="appShell">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
