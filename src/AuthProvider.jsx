import { useState, useEffect } from "react";
import { AuthContext } from "./config/AuthContext";
import checkUser from "./config/checkUser";
import styles from "./features/blog-public/post.module.css";

export default function AuthProvider({ children }) {
  const [accessToken, setAccessTokenState] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const setAccessToken = (token) => {
    setAccessTokenState(token);
    if (token) {
      const decodedUser = checkUser(token);
      setUsername(decodedUser);
    } else {
      setUsername(null);
    }
  };
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

        if (!response.ok) {
          setIsAuthenticating(false);
          return;
        }

        const data = await response.json();
        setAccessToken(data.accessToken);
      } catch (err) {
        console.error(err);
      } finally {
        setIsAuthenticating(false);
      }
    }

    refresh();
  }, []);
  return (
    <AuthContext.Provider
      value={{ accessToken, username, setAccessToken, isAuthenticating }}
    >
      {isAuthenticating ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
