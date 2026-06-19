import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import UserPost from "./features/blog-public/userPost.jsx";
import LoginForm from "./features/auth/loginForm.jsx";
import "./index.css";
import App from "./App.jsx";
import UserPost from "./features/blog-public/userPost.jsx";
import UniquePost from "./features/blog-public/uniquePost.jsx";
import SignupForm from "./features/auth/signupForm.jsx";
import AllPost from "./features/blog-public/allPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <AllPost /> },
      { path: "/:username", element: <UserPost /> },
      { path: "/posts/:id", element: <UniquePost /> },
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <SignupForm />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
