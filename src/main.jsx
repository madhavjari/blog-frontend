import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import UserPost from "./features/blog-public/userPost.jsx";
import LoginForm from "./features/auth/loginForm.jsx";
import "./index.css";
import App from "./App.jsx";
import UserPost from "./features/blog-public/userPost.jsx";
import UniquePost from "./features/blog-public/uniquePost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/:username",
    element: <UserPost />,
  },
  {
    path: "/posts/:id",
    element: <UniquePost />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
